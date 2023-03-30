//create a component to find last transaction in a wallet
//

export default async function findLastTx(
  address: string
): Promise<{ timestamp: number; txHash: string } | string> {
  const api = process.env.NEXT_PUBLIC_COVALENT2_API
  console.log("api", process.env)
  const endpoint = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/transactions_v3/?key=${api}`

  let retries = 2
  while (retries > 0) {
    try {
      const response = await fetch(endpoint)
      if (response.status === 200) {
        const data = await response.json()
        const lastTx = data.data.items[0]
        // update ref with last tx
        return { timestamp: lastTx.block_signed_at, txHash: lastTx.tx_hash }
      } else {
        throw new Error(`API returned status code ${response.status}`)
      }
    } catch (error) {
      console.log(
        `Error occurred while fetching data for address ${address}: ${error}`
      )
      retries--
      if (retries === 0) {
        return `Failed to fetch data for address ${address}: ${error}`
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for 1 sec before retrying
    }
  }
}
