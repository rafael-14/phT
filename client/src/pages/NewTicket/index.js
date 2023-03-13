import { useState } from "react";
import api from "../../api";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import { ButtonContainer, Container, Form } from "./styles";
import { toast } from "react-toastify";

export default function NewContact() {
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const isFormValid = date && place && time && quantity && duration;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = { date, place, time, quantity, duration };
      await api.post("/ticket", data);
      toast.success("Ticket criado com sucesso!");
      setDate("");
      setTime("");
    } catch (_error) {
      toast.error("Erro ao criar ticket.");
    }
  }
  function handleDatetimeChange(e) {
    if (e.target.value < new Date().toISOString()) {
      setDate("");
      return toast.error("Data inválida.");
    }
    setDate(e.target.value);
  }
  function handleQuantityChange(e) {
    if (e.target.value < 0) return setQuantity("");
    setQuantity(e.target.value);
  }

  return (
    <Container>
      <div>
        <PageHeader title="Novo Ticket" />
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Input type="date" value={date} onChange={handleDatetimeChange} />
          </FormGroup>
          <FormGroup>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Horário</option>
              {Array(6)
                .fill(1)
                .map((_row, index) => (
                  <option
                    value={index + 13}
                    disabled={Number(duration) === 3 && index === 5}
                  >
                    {index + 13}
                  </option>
                ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select value={place} onChange={(e) => setPlace(e.target.value)}>
              <option value="">Unidade</option>
              <option value="Tatuapé">Tatuapé</option>
              <option value="Santo Amaro">Santo Amaro</option>
              <option value="Brasília">Brasília</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Quantidade de pessoas: *"
              type="tel"
              maxLength={2}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </FormGroup>
          <FormGroup>
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
          </FormGroup>

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
