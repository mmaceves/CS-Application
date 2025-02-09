import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import type Candidate from './interfaces/Candidate.interface';

const App = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ potentialCandidates, setPotentialCandidates }} />
      </main>
    </>
  );
};

export default App;