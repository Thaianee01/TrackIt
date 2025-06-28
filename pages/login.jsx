import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../src/services/API";
import { setAuthToken } from "../src/services/API";

import UserContext from "../src/contexts/UserContext";
import AuthContext from "../src/contexts/AuthContext";

import { ThreeDots } from 'react-loader-spinner';
import styled from "styled-components";
import logo from '../src/assets/logo.svg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    login({ email, password })
      .then((res) => {
        setUser(res.data);
        setToken(res.data.token);
        setAuthToken(res.data.token);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/habitos");
      })

      .catch((err) => {
        let message = "Erro ao fazer login";
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
        setError(message);
        console.error("Erro no login:", err);
      })

      .finally(() => setLoading(false));
  }

  function goToSignUp() {
    navigate("/cadastro");
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <img src={logo} alt="Logo" />

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          disabled={loading}
        />

        {error && <Error>{error}</Error>}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="40"
              color="#ededed"
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Entrar"
          )}
        </Button>

        <LinkText>
          <LinkButton type="button" onClick={goToSignUp} disabled={loading}>
            Não tem uma conta? Cadastre-se!
          </LinkButton>
        </LinkText>
      </Form>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #52B6FF;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #6fa8dc;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

const LinkText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;


