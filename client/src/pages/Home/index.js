import { Link } from "react-router-dom";
import { Container, Header, TableContainer } from "./styles";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";

export default function Home() {
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
            <tr>
              <TableRow>1</TableRow>
              <TableRow>DD/MM/AAAA - HH:MM</TableRow>
              <TableRow>MG-1</TableRow>
              <TableRow>X</TableRow>
              <TableRow>3hrs</TableRow>
            </tr>
          </tbody>
        </TableContainer>
      </Container>
    </>
  );
}
