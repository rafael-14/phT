import { useState } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";
import { Container, DateContainer, TableContainer } from "./styles";

export default function SalesReport() {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  return (
    <>
      <Container>
        <div>
          <PageHeader title="Relatório de Vendas" />
          <DateContainer>
            <Input
              style={{ marginInlineEnd: "16px" }}
              type="datetime-local"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
            <Input
              type="datetime-local"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </DateContainer>
        </div>
      </Container>
      <TableContainer>
        <thead>
          <tr>
            <TableHead>Unidade</TableHead>
            <TableHead>Ingressos</TableHead>
            <TableHead>Público</TableHead>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableRow>Santo Amaro</TableRow>
            <TableRow>2h: X - 3h: Y</TableRow>
            <TableRow>99</TableRow>
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
