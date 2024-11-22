import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const PollDetails = () => {
  const { id } = useParams();
  const poll = useSelector((state) => state.polls[id]);

  if (!poll) {
    return <p>Poll not found</p>;
  }

  return (
    <div>
      <h2>Poll Details</h2>
      <h3>{poll.question || `${poll.optionOne.text} or ${poll.optionTwo.text}`}</h3>
      <div>
        <p>Option One: {poll.optionOne.text} - Votes: {poll.optionOne.votes.length}</p>
        <p>Option Two: {poll.optionTwo.text} - Votes: {poll.optionTwo.votes.length}</p>
      </div>
    </div>
  );
};

export default PollDetails;
