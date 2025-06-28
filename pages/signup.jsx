import { useState } from "react";
import styled from "styled-components";
import logo from '../src/assets/logo.svg';
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function createAccount(e) {
    e.preventDefault();
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const body = { name, email, image, password };

    axios.post(URL, body)
      .then(() => alert("Cadastro realizado!"))
      .catch(err => console.log(err.response?.data || err.message));
  }

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <form onSubmit={createAccount}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL da imagem"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <StyledLink to="/">Já tem conta? Faça login</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }

  input, button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;
