// src/components/Layout.jsx
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UserContext from "../src/contexts/UserContext";

export default function Layout({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <PageContainer>
      <Header>
        <Logo>TrackIt</Logo>
        <UserImage src={user?.image} alt="User Avatar" />
      </Header>

      <ContentWrapper>{children}</ContentWrapper>

      <Footer>
        <FooterButton $isActive={currentPath === "/habitos"} onClick={() => navigate("/habitos")}>
          <CalendarMonthIcon fontSize="small" />
          Hábitos
        </FooterButton>
        <FooterButton $isActive={currentPath === "/hoje"} onClick={() => navigate("/hoje")}>
          <EventAvailableIcon fontSize="small" />
          Hoje
        </FooterButton>
      </Footer>
    </PageContainer>
  );
}

// Styled Components

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  height: 70px;
  background-color: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.h1`
  color: white;
  font-family: 'Playball', cursive;
  font-size: 38px;
  font-weight: 400;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContentWrapper = styled.main`
  flex: 1;
  box-sizing: border-box;
`;

const Footer = styled.footer`
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterButton = styled.button`
  all: unset;
  flex: 1;
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#D4D4D4')};
  background-color: ${({ $isActive }) => ($isActive ? '#52B6FF' : 'transparent')};
`;
