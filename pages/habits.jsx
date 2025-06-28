import { useContext, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import HabitsContext from "../src/contexts/HabitsContext";
import AuthContext from "../src/contexts/AuthContext";
import { listHabit, newHabit } from "../src/services/API";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Habits() {
  const { habits, setHabits } = useContext(HabitsContext);
  const { token } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", days: [] });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (token) {
      fetchHabits();
    }
  }, [token]);

  function fetchHabits() {
    setLoading(true);
    listHabit()
      .then((response) => setHabits(response.data))
      .catch(() => alert("Erro ao carregar hábitos."))
      .finally(() => setLoading(false));
  }

  function toggleDay(clickedDay) {
    if (saving) return;

    setFormData(prevForm => {
      const days = prevForm.days.includes(clickedDay)
        ? prevForm.days.filter(day => day !== clickedDay)
        : [...prevForm.days, clickedDay];

      return { ...prevForm, days };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nameIsEmpty = !formData.name.trim();
    const noDaySelected = formData.days.length === 0;

    if (nameIsEmpty) return alert("Digite o nome do hábito.");
    if (noDaySelected) return alert("Selecione pelo menos um dia.");

    setSaving(true);

    newHabit(formData)
      .then(() => {
        setFormData({ name: "", days: [] });
        setShowForm(false);
        fetchHabits();
      })
      .catch(() => alert("Erro ao salvar hábito."))
      .finally(() => setSaving(false));
  }

  function handleCancel() {
    setShowForm(false);
  }

  return (
    <Container>
      <Header>
        <Title>Meus hábitos</Title>
        <AddButton onClick={() => setShowForm((prev) => !prev)}>
          <AddIcon />
        </AddButton>
      </Header>

      {showForm && (
        <FormContainer onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="nome do hábito"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={saving}
          />

          <DaysContainer>
            {weekdays.map((dayLabel, index) => (
              <DayButton
                key={index}
                type="button"
                selected={formData.days.includes(index)}
                onClick={() => toggleDay(index)}
                disabled={saving}
              >
                {dayLabel}
              </DayButton>
            ))}
          </DaysContainer>

          <Buttons>
            <Cancel type="button" onClick={handleCancel} disabled={saving}>
              Cancelar
            </Cancel>

            <Save type="submit" disabled={saving}>
              {saving ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="50"
                    color="#ededed"
                    ariaLabel="three-dots-loading"
                  />
                </span>
              ) : (
                "Salvar"
              )}
            </Save>
          </Buttons>
        </FormContainer>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : habits.length === 0 ? (
        <Message>
          Você não tem nenhum hábito cadastrado ainda.
          Adicione um hábito para começar a trackear!
        </Message>
      ) : (
        habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))
      )}
    </Container>
  );
}

// Habit Item Component (sem botão de deletar)
function HabitItem({ habit }) {
  return (
    <HabitBox>
      <strong>{habit.name}</strong>
      <DaysList>
        {habit.days.map((dayIndex) => (
          <Day key={dayIndex}>{weekdays[dayIndex]}</Day>
        ))}
      </DaysList>
    </HabitBox>
  );
}

// Styled Components
const Container = styled.div`
  padding: 20px;
  padding-bottom: 70px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 22px;
  color: #126BA5;
`;

const AddButton = styled.button`
  background-color: #52b6ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.form`
  background: white;
  padding: 16px;
  border-radius: 5px;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DaysContainer = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 4px;
`;

const DayButton = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ selected }) => (selected ? "#cfcfcf" : "white")};
  border: 1px solid #d5d5d5;
  color: #dbdbdb;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Cancel = styled.button`
  background: none;
  border: none;
  color: #52b6ff;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Save = styled.button`
  background-color: #52B6FF;
  color: white;
  width: 80px;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #666;
`;

const HabitBox = styled.div`
  background: white;
  border-radius: 5px;
  padding: 16px;
  margin-top: 10px;
`;

const DaysList = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const Day = styled.span`
  font-size: 14px;
  padding: 4px 8px;
  background: #ebebeb;
  border-radius: 5px;
`;
