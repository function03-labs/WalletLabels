export default function processPortfolioResponse(portfolioResponse) {
  // Extracting the items from the portfolio response
  const { items } = portfolioResponse.data

  // Creating an object to store the portfolio value for each day
  const portfolioValueByDay = {}
  // Looping through each item in the portfolio
  items.forEach((item) => {
    // Extracting the holdings for the item
    const { holdings } = item

    // Looping through each holding for the item
    holdings.forEach((holding) => {
      // Extracting the timestamp and quote for the holding
      const { timestamp, quote } = holding

      // Calculating the total value for the holding
      const totalValue = holding.close.quote

      // Adding the total value to the portfolio value for the corresponding day
      if (portfolioValueByDay[timestamp]) {
        portfolioValueByDay[timestamp] += totalValue
      } else {
        portfolioValueByDay[timestamp] = totalValue
      }
    })
  })

  // Converting the portfolioValueByDay object into an array of day and total_value pairs
  const portfolioValueByDayArray = Object.keys(portfolioValueByDay).map(
    (day) => [day, portfolioValueByDay[day]]
  )

  // Sorting the array by day in ascending order
  portfolioValueByDayArray.sort((a, b) => a[0] - b[0])

  // Returning the last 30 days of portfolio value
  return portfolioValueByDayArray
}
