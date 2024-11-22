import React from 'react';
import { useSelector } from 'react-redux';
import BackToHomeButton from './BackToHomeButton';
import '../App.css';

const Leaderboard = () => {
  const users = useSelector((state) => state.users);

  // Calculate score for each user (questions created + answers submitted)
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questionsCreated: user.questions.length,
      answersSubmitted: Object.keys(user.answers).length,
      score: user.questions.length + Object.keys(user.answers).length,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {/* Flexbox container for leaderboard cards */}
      <div className="leaderboard">
        {leaderboardData.map((user) => (
          <div key={user.id} className="leaderboard-card">
            <img src={user.avatarURL || 'https://via.placeholder.com/50'} alt={`${user.name}'s avatar`} className="leaderboard-avatar" />
            <p>{user.name}</p>
            <p>Questions Created: {user.questionsCreated}</p>
            <p>Answers Submitted: {user.answersSubmitted}</p>
            <p>Total Score: {user.score}</p>
          </div>
        ))}
      </div>

      {/* Centered Back to Home Button */}
      <div className="back-to-home-container">
        <BackToHomeButton />
      </div>
    </div>
  );
};

export default Leaderboard;
