import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { votePoll, fetchPolls } from '../actions/polls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Poll = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch poll data from Redux store
  const poll = useSelector((state) => state.polls[id]);
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    // Dispatch fetchPolls if polls are not loaded
    if (!poll) {
      dispatch(fetchPolls()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, poll]);

  // Display loading or error message if poll is undefined
  if (loading) return <p>Loading...</p>;
  if (!poll || !poll.optionOne || !poll.optionTwo) {
    return <p>Poll not found or is incomplete.</p>;
  }

  const handleVote = (option) => {
    dispatch(votePoll({ authedUser, pollId: id, answer: option }))
      .then(() => {
        toast.success("Thank you for voting!", {
          className: "custom-toast",
        });
        setTimeout(() => navigate('/dashboard'), 1500);
      })
      .catch(() => {
        toast.error("There was an error submitting your vote.");
      });
  };

  return (
    <div className="poll-container">
      <ToastContainer position="top-center" autoClose={1500} />
      <h2>{poll.question}</h2>
      <div>
        <button onClick={() => handleVote('optionOne')}>{poll.optionOne?.text || "Option One"}</button>
        <button onClick={() => handleVote('optionTwo')}>{poll.optionTwo?.text || "Option Two"}</button>
      </div>
    </div>
  );
};

export default Poll;