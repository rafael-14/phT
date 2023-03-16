import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import SubTotalRow from "../../components/SubTotalRow";
import TableHead from "../../components/TableHead";
import TableRow from "../../components/TableRow";
import useLoader from "../../hooks/useLoader";
import SalesReportService from "../../services/SalesReportService";
import { Container, DateContainer, TableContainer } from "./styles";

export default function SalesReport() {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [salesReport, setSalesReport] = useState([]);
  const { Loader, isLoading, setIsLoading } = useLoader();

  function getTotal(place, field = "valor_total") {
    const totals = place
      ? salesReport.filter((row) => row.unidade === place)
      : salesReport;
    const total = totals.reduce((accumulator, array) => {
      return accumulator + Number(array[field]);
    }, 0);
    return total;
  }

  function handleChangeInitialDate(e) {
    if (e.target.value > finalDate && finalDate !== "")
      return toast.error("Data inicial inválida.");
    setInitialDate(e.target.value);
  }
  function handleChangeFinalDate(e) {
    if (e.target.value < initialDate && initialDate !== "")
      return toast.error("Data final inválida.");
    setFinalDate(e.target.value);
  }

  useEffect(() => {
    async function loadSalesReport() {
      try {
        setIsLoading(true);
        const salesReportList = await SalesReportService.listSalesReport(
          initialDate,
          finalDate
        );
        setSalesReport(salesReportList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSalesReport();
  }, [initialDate, finalDate]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Container>
        <div>
          <DateContainer>
            <Input
              style={{ marginInlineEnd: "16px" }}
              type="date"
              value={initialDate}
              onChange={handleChangeInitialDate}
            />
            <Input
              type="date"
              value={finalDate}
              onChange={handleChangeFinalDate}
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
