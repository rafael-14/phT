import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";
import SubTotalRow from "../../components/SubTotalRow";
import { Container, DateContainer, TableContainer } from "./styles";
import api from "../../api";

export default function SalesReport() {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [salesReport, setSalesReport] = useState([]);

  function getTotal(place, field = "valor_total") {
    const totals = place
      ? salesReport.filter((row) => row.unidade === place)
      : salesReport;
    const total = totals.reduce((accumulator, array) => {
      return accumulator + Number(array[field]);
    }, 0);
    return total;
  }

  useEffect(() => {
    api
      .get("/sales_report", {
        params: {
          initialDate,
          finalDate,
        },
      })
      .then(({ data }) => setSalesReport(data));
  }, [initialDate, finalDate]);

  return (
    <>
      <Container>
        <div>
          <PageHeader title="Relatório de Vendas" />
          <DateContainer>
            <Input
              style={{ marginInlineEnd: "16px" }}
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
            <Input
              type="date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </DateContainer>
        </div>
      </Container>
      {salesReport.length && (
        <TableContainer>
          <thead>
            <tr>
              <TableHead>Unidade</TableHead>
              <TableHead>Receita</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Público</TableHead>
            </tr>
          </thead>
          <tbody>
            {salesReport.map((row, index, array) => (
              <React.Fragment key={index}>
                <tr>
                  <TableRow>{row.unidade}</TableRow>
                  <TableRow>
                    {Number(row.valor_total).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableRow>
                  <TableRow>{row.duracao} Horas</TableRow>
                  <TableRow>{row.publico}</TableRow>
                </tr>
                {array[index + 1]?.unidade !== row.unidade && (
                  <tr>
                    <SubTotalRow>Subtotal</SubTotalRow>
                    <SubTotalRow>
                      {Number(getTotal(row.unidade)).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </SubTotalRow>
                    <SubTotalRow />
                    <SubTotalRow>
                      {getTotal(row.unidade, "publico")}
                    </SubTotalRow>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <SubTotalRow>TOTAL</SubTotalRow>
              <SubTotalRow>
                {Number(getTotal()).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </SubTotalRow>
              <SubTotalRow />
              <SubTotalRow>{getTotal(null, "publico")}</SubTotalRow>
            </tr>
          </tbody>
        </TableContainer>
      )}
    </>
  );
}
