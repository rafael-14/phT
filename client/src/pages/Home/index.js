import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "styled-components";
import api from "../../api";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";
import { Container, Header, TableContainer, Pagination } from "./styles";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [count, setCount] = useState(0);
  const { colors } = useTheme();
  const [page] = useSearchParams();

  useEffect(() => {
    api
      .get("/tickets", {
        params: {
          page: page.get("page") || 1,
        },
      })
      .then(({ data }) => {
        setTickets(data.tickets);
        setCount(Number(data.count));
      });
  }, [page]);

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
              <TableHead> Valor </TableHead>
            </tr>
          </thead>
          <tbody>
            {tickets.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? colors.primary.lighter
                      : colors.background,
                }}
              >
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
                <TableRow>
                  {Number(row.valor).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableRow>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </Container>
      {count > 1 && (
        <Pagination>
          {page.get("page") > 1 && (
            <a href={`?page=${Number(page.get("page")) - 1}`}>&laquo;</a>
          )}
          {Array(count)
            .fill(1)
            .map((_row, index) => (
              <div key={index}>
                <a
                  href={`?page=${index + 1}`}
                  className={
                    Number(page.get("page")) === index + 1 ||
                    (!page.get("page") && !index)
                      ? "active"
                      : "inactive"
                  }
                >
                  {index + 1}
                </a>
              </div>
            ))}
          {page.get("page") < count && (
            <a href={`?page=${Number(page.get("page")) + 1}`}>&raquo;</a>
          )}
        </Pagination>
      )}
    </>
  );
}
