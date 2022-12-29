import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Users from "./Users";
import Projects from "./Projects";


export const App = () => {
  return (
    <Container className="app" >
      <Box data-testid="app-box" m={2}>
            <Users/>
          <Projects/>
      </Box>
    </Container>
  );
};

export default App;
