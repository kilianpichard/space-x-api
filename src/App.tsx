import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
// @ts-ignore
import logo from './assets/spacex.png';
import Launches from './components/Launches';
import Capsules from './components/Capsules';

const Header = styled.div`
  background-color: #282c34;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Logo = styled.img`
  height: 40px;
  pointer-events: none;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1em;
  text-align: center;
  color: white;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: lighter;
`;

const App = () => {
  const [page, setPage] = React.useState('launches');

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <Title>SpaceX {page === 'launches' ? 'Launches' : 'Capsules'}</Title>
        <nav>
          <Button onClick={() => setPage('launches')}>Launches</Button>
          <Button onClick={() => setPage('capsules')}>Capsules</Button>
        </nav>
      </Header>

      <div>
        {page === 'launches' && <Launches />}
        {page === 'capsules' && <Capsules />}
      </div>
    </Container>
  );
};

export default App;
