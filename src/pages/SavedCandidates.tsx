import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';
import type Candidate from '../interfaces/Candidate.interface';
import './CandidateSearch.css'; // Import the CSS file

const SavedCandidates = () => {
  const { potentialCandidates, setPotentialCandidates } = useOutletContext<{ potentialCandidates: Candidate[], setPotentialCandidates: React.Dispatch<React.SetStateAction<Candidate[]>> }>();

  const handleRemove = (index: number) => {
    const updatedCandidates = potentialCandidates.filter((_, i) => i !== index);
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {potentialCandidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.avatar} alt={candidate.name} /></td>
              <td>{candidate.name}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button onClick={() => handleRemove(index)} className="circle-button remove-button">
                  <FaMinus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;