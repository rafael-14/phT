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
  const [datetime, setDatetime] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const isFormValid = datetime && place && time && quantity;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = { datetime, place, time, quantity };
      await api.post("/ticket", data);
      toast.success("Ticket criado com sucesso!");
      setDatetime("");
    } catch (_error) {
      toast.error("Erro ao criar ticket.");
    }
  }
  function handleDatetimeChange(e) {
    if (e.target.value < new Date().toISOString()) {
      setDatetime("");
      return toast.error("Data inválida.");
    }
    setDatetime(e.target.value);
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
            <Input
              type="datetime-local"
              value={datetime}
              onChange={handleDatetimeChange}
            />
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
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Duração</option>
              <option value={2}>2 horas</option>
              <option value={3}>3 horas</option>
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
