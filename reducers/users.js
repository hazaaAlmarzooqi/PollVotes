import { RECEIVE_USERS } from '../actions/users';
import { ADD_POLL, VOTE_POLL } from '../actions/polls';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case ADD_POLL:
      const { poll } = action;
      const { author } = poll;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([poll.id]),
        },
      };

    case VOTE_POLL:
      const { authedUser, pollId, answer } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [pollId]: answer,
          },
        },
      };

    default:
      return state;
  }
}
