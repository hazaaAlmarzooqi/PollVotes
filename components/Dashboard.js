import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackToHomeButton from './BackToHomeButton';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('unanswered');
  const polls = useSelector((state) => state.polls);
  const authedUser = useSelector((state) => state.authedUser);
  const user = useSelector((state) => state.users[authedUser]);
  const users = useSelector((state) => state.users);

  const answeredPolls = Object.values(polls).filter((poll) =>
    Object.keys(user.answers).includes(poll.id)
  );
  const unansweredPolls = Object.values(polls).filter(
    (poll) => !Object.keys(user.answers).includes(poll.id)
  );

  const displayedPolls = activeTab === 'unanswered' ? unansweredPolls : answeredPolls;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Tabs for Answered and Unanswered */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'unanswered' ? 'active' : ''}`}
          onClick={() => setActiveTab('unanswered')}
        >
          Unanswered
        </button>
        <button
          className={`tab ${activeTab === 'answered' ? 'active' : ''}`}
          onClick={() => setActiveTab('answered')}
        >
          Answered
        </button>
      </div>

      {/* Flexbox container for poll cards */}
      <div className="dashboard">
        {displayedPolls.length > 0 ? (
          displayedPolls.map((poll) => {
            const isAnswered = Object.keys(user.answers).includes(poll.id);
            const author = users[poll.author];
            const userAnswer = user.answers[poll.id]; // Get user's answers

            // Only attempt to get the text if userAnswer and poll[userAnswer] exist
            const userChoice = userAnswer && poll[userAnswer] ? poll[userAnswer].text : "Unknown";

            return (
              <div
                key={poll.id}
                className={`poll-card ${isAnswered ? 'answered' : ''}`}
              >
                <h3>{poll.question}</h3>
                <p>The poll is Created by: {author ? author.name : 'Anonymous'}</p>
                
                {isAnswered ? (
                  <p className="answered-text">
                    You voted: <strong>{userChoice}</strong>
                  </p>
                ) : (
                  <Link to={`/poll/${poll.id}`}>
                    <button>View Poll</button>
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <p>No polls available in this category.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="back-to-home-container">
        <BackToHomeButton />
      </div>
    </div>
  );
};

export default Dashboard;