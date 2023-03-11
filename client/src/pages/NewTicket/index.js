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
  const isFormValid = datetime && place && time;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/ticket", { datetime, place, time });
      toast.success("Ticket criado com sucesso!");
    } catch (_error) {
      toast.error("Erro ao criar ticket.")
    }
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
              onChange={(e) => setDatetime(e.target.value)}
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
