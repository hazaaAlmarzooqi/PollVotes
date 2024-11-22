
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLL = 'ADD_POLL';
export const VOTE_POLL = 'VOTE_POLL';

export const receivePolls = (polls) => ({
  type: RECEIVE_POLLS,
  polls,
});

export const fetchPolls = () => {
  return (dispatch) => {
    const savedPolls = JSON.parse(localStorage.getItem('polls')) || {};
    dispatch(receivePolls(savedPolls));
  };
};

export const addPoll = (poll) => {
  return (dispatch) => {
    return _saveQuestion(poll).then((newPoll) => {
      // Ensure newPoll structure includes optionOne and optionTwo with votes arrays
      if (!newPoll.optionOne.votes) newPoll.optionOne.votes = [];
      if (!newPoll.optionTwo.votes) newPoll.optionTwo.votes = [];

      dispatch({
        type: ADD_POLL,
        poll: newPoll,
      });
    });
  };
};

export const votePoll = ({ authedUser, pollId, answer }) => {
  return (dispatch) => {
    // Simulate backend save (localStorage or other)
    return _saveQuestionAnswer({ authedUser, qid: pollId, answer }).then(() => {
      dispatch({
        type: VOTE_POLL,
        pollId,
        authedUser,
        answer,
      });
    });
  };
};