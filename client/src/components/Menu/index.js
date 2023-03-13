import { Link, useLocation } from "react-router-dom";
import { Header } from "./styles";

export default function Menu() {
  const { pathname } = useLocation();
  console.log(pathname === "/" ? "active" : "inactive");

  return (
    <Header>
      <Link to="/" className={pathname === "/" ? "active" : "inactive"}>
        Home
      </Link>
      <Link
        to="/new_ticket"
        className={pathname === "/new_ticket" ? "active" : "inactive"}
      >
        Novo ticket
      </Link>
      <Link
        to="/sales_report"
        className={pathname === "/sales_report" ? "active" : "inactive"}
      >
        Relatório de vendas
      </Link>
    </Header>
  );
}
