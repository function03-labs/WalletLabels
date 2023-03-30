import axios from "axios"

import processPortfolioResponse from "./BalanceHistory"

export default async function getHistory(addresses: string[]) {
  const api = process.env.COVALENT_API
  const mapping: { [address: string]: any } = {}

  const fetchHistory = async (
    address: string,
    retryCount = 0
  ): Promise<any> => {
    try {
      const endpoint = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/portfolio_v2/?key=${api}`
      // add timeout to avoid hanging
      const response = await axios.get(endpoint, { timeout: 1000 })
      const data = response.data ? response.data : null
      if (data.error || !data) {
        return []
      }
      const history = processPortfolioResponse(data)
      // console.log(history.length, " succeeded for ", address)
      return history
    } catch (error) {
      if (retryCount <= 5) {
        const delay = 3000 * Math.pow(2, retryCount)
        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchHistory(address, retryCount + 1)
      } else {
        // console.log("failed for ", address)
        return []
      }
    }
  }

  const promises = addresses.map(async (address) => {
    if (mapping[address]) {
      return mapping[address]
    } else {
      const history = await fetchHistory(address)
      mapping[address] = history
      return history
    }
  })

  const histories = await Promise.all(promises)
  return histories.reduce((acc, history, index) => {
    acc[addresses[index]] = history
    return acc
  }, {})
}
