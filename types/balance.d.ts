export interface PortfolioResponse {
  data: {
    items: any[]
  }
}

export interface Holding {
  timestamp: number
  close: {
    quote: number
  }
}
