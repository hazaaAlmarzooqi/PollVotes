import { RECEIVE_POLLS, ADD_POLL, VOTE_POLL } from '../actions/polls';

const polls = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };

    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };

    case VOTE_POLL:
      const { pollId, authedUser, answer } = action;
      const poll = state[pollId];

      // Make sure poll and answer fields exist in the state before updating
      if (!poll || !poll[answer]) {
        return state;
      }

      return {
        ...state,
        [pollId]: {
          ...poll,
          [answer]: {
            ...poll[answer],
            votes: poll[answer].votes.concat([authedUser]),
          },
        },
      };

    default:
      return state;
  }
};

export default polls;