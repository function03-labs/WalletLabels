import { PortfolioResponse, Holding } from "@/types/balance";

export default function processPortfolioResponse(
  portfolioResponse: PortfolioResponse
) {
  const { items } = portfolioResponse.data;

  const portfolioValueByDay: { [key: number]: number } = {};
  items.forEach((item) => {
    const { holdings } = item;

    holdings.forEach((holding: Holding) => {
      const { timestamp } = holding;

      const totalValue = holding.close.quote;

      if (portfolioValueByDay[timestamp]) {
        portfolioValueByDay[timestamp] += totalValue;
      } else {
        portfolioValueByDay[timestamp] = totalValue;
      }
    });
  });

  const portfolioValueByDayArray = Object.keys(portfolioValueByDay).map(
    (day) => [Number(day), portfolioValueByDay[Number(day)]]
  );

  return portfolioValueByDayArray.sort((a, b) => a[0] - b[0]);
}
