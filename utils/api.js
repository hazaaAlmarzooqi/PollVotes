import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA';

// get initial data (users and polls)
export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, polls]) => ({
    users,
    polls,
  }));
}

// Save new poll
export function savePoll(poll) {
  return _saveQuestion(poll);
}

// Save poll vote
export function savePollAnswer({ authedUser, pollId, answer }) {
  return _saveQuestionAnswer({
    authedUser,
    qid: pollId,
    answer,
  });
}
