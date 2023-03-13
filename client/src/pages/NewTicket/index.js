import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { ButtonContainer, Container, Form } from "./styles";

export default function NewContact() {
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const isFormValid = date && place && time && quantity && duration;

  function clearDatetime() {
    setDate("");
    setTime("");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = { date, place, time, quantity, duration };
      await api.post("/ticket", data);
      toast.success("Ticket criado com sucesso!");
      clearDatetime();
    } catch (_error) {
      toast.error("Erro ao criar ticket.");
    }
  }
  function handleDateChange(e) {
    if (
      e.target.value <= new Date().toISOString().slice(0, 10) &&
      time <= new Date().getHours()
    ) {
      clearDatetime();
      return toast.error("Data inválida.");
    }
    setDate(e.target.value);
  }
  function handleTimeChange(e) {
    if (
      e.target.value <= new Date().getHours() &&
      date <= new Date().toISOString().slice(0, 10)
    ) {
      clearDatetime();
      return toast.error("Horário inválido.");
    }
    setTime(e.target.value);
  }
  function handleQuantityChange(e) {
    if (e.target.value < 0) return setQuantity("");
    setQuantity(e.target.value);
  }

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit} noValidate>
          <Input type="date" value={date} onChange={handleDateChange} />
          <Select value={time} onChange={handleTimeChange}>
            <option value="">Horário</option>
            {Array(6)
              .fill(1)
              .map((_row, index) => (
                <option
                  key={index}
                  value={index + 13}
                  disabled={Number(duration) === 3 && index === 5}
                >
                  {index + 13}
                </option>
              ))}
          </Select>
          <Select value={place} onChange={(e) => setPlace(e.target.value)}>
            <option value="">Unidade</option>
            <option value="Tatuapé">Tatuapé</option>
            <option value="Santo Amaro">Santo Amaro</option>
            <option value="Brasília">Brasília</option>
          </Select>
          <Input
            placeholder="Quantidade de pessoas: *"
            type="tel"
            maxLength={2}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Duração</option>
            <option value={2}>2 horas</option>
            <option value={3} disabled={Number(time) === 18}>
              3 horas
            </option>
          </Select>
          <ButtonContainer>
            <Button type="submit" disabled={!isFormValid}>
              Cadastrar
            </Button>
          </ButtonContainer>
        </Form>
      </div>
    </Container>
  );
}
