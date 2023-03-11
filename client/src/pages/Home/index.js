import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";
import { Container, Header, TableContainer } from "./styles";

export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets").then(({ data }) => setTickets(data));
  }, []);

  console.log(tickets);

  return (
    <>
      <Header>
        <Link to="/sales_report">Relatório de vendas</Link>
        <Link to="/new_ticket">Novo ticket</Link>
      </Header>
      <Container>
        <TableContainer>
          <thead>
            <tr>
              <TableHead> Ticket n.º </TableHead>
              <TableHead> Data - Horário </TableHead>
              <TableHead> Unidade </TableHead>
              <TableHead> Quantidade de Pessoas </TableHead>
              <TableHead> Duração </TableHead>
            </tr>
          </thead>
          <tbody>
            {tickets.map((row) => (
              <tr key={row.id}>
                <TableRow>{row.id}</TableRow>
                <TableRow>
                  {new Date(row.data).toLocaleString("pt-br", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableRow>
                <TableRow>{row.unidade}</TableRow>
                <TableRow>{row.quantidade}</TableRow>
                <TableRow>{row.duracao} Horas</TableRow>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </Container>
    </>
  );
}
