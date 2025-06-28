import { useState } from "react";
import styled from "styled-components";

export default function AddHabit({ onSubmit }) {
  const [habit, setHabit] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!habit) return alert("Digite o nome do hábito");
    onSubmit(habit);
    setHabit("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        value={habit} 
        onChange={(e) => setHabit(e.target.value)} 
        placeholder="Digite o hábito"
      />
      <Button type="submit">Adicionar</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #52b6ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
