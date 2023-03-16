import api from "./api";

class SalesReportService {
  async listSalesReport(initialDate, finalDate) {
    const response = await api.get("/sales_report", {
      params: {
        initialDate,
        finalDate,
      },
    });
    return response.data;
  }
}

export default new SalesReportService();
