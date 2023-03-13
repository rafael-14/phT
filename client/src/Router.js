import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewTicket from "./pages/NewTicket";
import SalesReport from "./pages/SalesReport";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/new_ticket" element={<NewTicket />} />
      <Route exact path="/sales_report" element={<SalesReport />} />
    </Routes>
  );
}
