const { fetchAndAggregateDailyTransactions } = require("./useEthTxs");

describe("fetchAndAggregateDailyTransactions", () => {
    it("should fetch and aggregate daily transactions", async () => {
        const address = "0x1234567890123456789012345678901234567890";
        const result = await fetchAndAggregateDailyTransactions(address);
        expect(result).toBeDefined();
        // Add more assertions as needed
    });
});