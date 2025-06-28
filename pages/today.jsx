import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { listTodayHabits, markAsDone, unmarkAsDone } from "../src/services/API";
import AuthContext from "../src/contexts/AuthContext";

dayjs.locale('pt-br');

export default function AddToday() {
  const [habitsToday, setHabitsToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      loadTodayHabits();
    }
  }, [token]);

  function loadTodayHabits() {
    setLoading(true);
    listTodayHabits()
      .then((res) => setHabitsToday(res.data))
      .catch(() => alert("Erro ao carregar hábitos de hoje"))
      .finally(() => setLoading(false));
  }

  function toggleHabit(habit) {
    const action = habit.done ? unmarkAsDone : markAsDone;

    action(habit.id)
      .then(() => loadTodayHabits())
      .catch(() => alert("Erro ao atualizar hábito"));
  }

  const hoje = dayjs().format('dddd, DD/MM');
  const tituloFormatado = hoje.charAt(0).toUpperCase() + hoje.slice(1);

  const total = habitsToday.length;
  const feitos = habitsToday.filter(h => h.done).length;

  return (
    <Container>
      <HeaderToday>
        <Title>{tituloFormatado}</Title>
        <SubTitle>
          {total > 0
            ? `${feitos} de ${total} hábitos concluídos`
            : "Nenhum hábito para hoje"}
        </SubTitle>
      </HeaderToday>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        habitsToday.map((habit) => (
          <HabitBox key={habit.id} $done={habit.done}>
            <HabitInfo>
              <strong>{habit.name}</strong>
              <p>Sequência atual: <SpanHighlight $done={habit.done}>{habit.currentSequence} dias</SpanHighlight></p>
              <p>Seu recorde: <SpanHighlight $done={habit.done}>{habit.highestSequence} dias</SpanHighlight></p>
            </HabitInfo>
            <CheckButton
              $done={habit.done}
              onClick={() => toggleHabit(habit)}
            >
              ✔
            </CheckButton>
          </HabitBox>
        ))
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const HeaderToday = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #126ba5;
  font-size: 24px;
  text-transform: capitalize;
`;

const SubTitle = styled.p`
  color: #bababa;
  font-size: 16px;
`;

const HabitBox = styled.div`
  background: white;
  border-radius: 5px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HabitInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SpanHighlight = styled.span`
  color: ${({ $done }) => ($done ? "#8FC549" : "#666")};
  font-weight: bold;
`;

const CheckButton = styled.button`
  width: 69px;
  height: 69px;
  border: none;
  border-radius: 5px;
  background-color: ${({ $done }) => ($done ? "#8FC549" : "#EBEBEB")};
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
