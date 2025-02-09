import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import type Candidate from '../interfaces/Candidate.interface';
import { searchGithub } from '../api/API';
import './CandidateSearch.css'; // Import the CSS file

const CandidateSearch = () => {
  const { setPotentialCandidates } = useOutletContext<{ setPotentialCandidates: React.Dispatch<React.SetStateAction<Candidate[]>> }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      console.log('Fetched data:', data); 

      const transformedData = data.map((user: any) => ({
        avatar: user.avatar_url || 'N/A',
        name: user.name || user.login || 'N/A',
        userName: user.login || 'N/A',
        location: user.location || 'N/A',
        email: user.email || 'N/A',
        html_url: user.html_url || 'N/A',
        company: user.company || 'N/A',
        bio: user.bio || 'N/A',
      }));
      console.log('Transformed data:', transformedData); 
      setCandidates(transformedData);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setPotentialCandidates(JSON.parse(storedCandidates));
    }
  }, [setPotentialCandidates]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handleAdd = () => {
    setPotentialCandidates((prev) => {
      const updatedCandidates = [...prev, candidates[currentIndex]];
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
    handleNext();
  };

  const handleRemove = () => {
    handleNext();
  };

  return (
    <>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="candidate-container">
          {candidates.length > 0 && (
            <div className="candidate-card">
              <img src={candidates[currentIndex].avatar} alt={candidates[currentIndex].name} className="avatar" />
              <h2>{candidates[currentIndex].name}</h2>
              <p>{candidates[currentIndex].location !== 'N/A' ? candidates[currentIndex].location : 'Location not available'}</p>
              <p>{candidates[currentIndex].email !== 'N/A' ? candidates[currentIndex].email : 'Email not available'}</p>
              <p>{candidates[currentIndex].company !== 'N/A' ? candidates[currentIndex].company : 'Company not available'}</p>
              <p>{candidates[currentIndex].bio !== 'N/A' ? candidates[currentIndex].bio : 'Bio not available'}</p>
              <a href={candidates[currentIndex].html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </div>
          )}
          <div className="candidate-buttons">
            <button onClick={handleAdd} className="circle-button add-button">
              <FaPlus />
            </button>
            <button onClick={handleRemove} className="circle-button remove-button">
              <FaMinus />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateSearch;