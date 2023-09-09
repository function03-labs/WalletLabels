// import statements
import { Alchemy, Network } from "alchemy-sdk"

// Initialize Alchemy
const alchemyConfig = {
  apiKey: "Uu_2xPZa0lpg_tp3BrF5CDAysgnzCnWA", // Your Alchemy API key
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(alchemyConfig)

// Function to fetch and aggregate daily transactions
export async function fetchAndAggregateDailyTransactions(address) {
  try {
    // Define the date range for fetching transactions (e.g., for today)
    const currentDate = new Date()
    currentDate.setUTCHours(0, 0, 0, 0) // Set to the start of the day (UTC)
    const fromDate = Math.floor(currentDate.getTime() / 1000) // Convert to UNIX timestamp

    // Fetch asset transfers
    const response = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: "0x0000000000000000000000000000000000000000",
      toAddress: address,
      excludeZeroValue: true,
      category: ["external", "erc20"],
      withMetadata: true, // Retrieve timestamp metadata
    })

    // Filter transactions within the desired date range (today)
    const dailyTransactions = response.transfers.filter(tx => {
      const txTimestamp = Number(tx.metadata?.blockTimestamp) || (0 as number)
      return txTimestamp >= fromDate
    })

    // Aggregate incoming and outgoing transactions
    const aggregatedTransactions = dailyTransactions.reduce(
      (result, tx) => {
        const isIncoming = tx.to === address
        const amount = isIncoming ? 1 : -1 // Positive for incoming, negative for outgoing

        result.total += amount
        if (isIncoming) {
          result.incoming.push(tx)
        } else {
          result.outgoing.push(tx)
        }

        return result
      },
      { total: 0, incoming: [], outgoing: [] }
    )

    return aggregatedTransactions
  } catch (error) {
    console.error("Error fetching and aggregating transactions:", error)
    throw error
  }
}

export default fetchAndAggregateDailyTransactions
