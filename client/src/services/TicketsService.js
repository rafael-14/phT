import api from "./api";

class TicketsService {
  async listTickets(page) {
    const response = await api.get("/tickets", {
      params: {
        page: page,
      },
    });
    return response.data;
  }

  async createTicket(data) {
    await api.post("/ticket", data);
  }
}

export default new TicketsService();
