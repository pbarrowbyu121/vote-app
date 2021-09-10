const port = "8000";
const questionsEndpoint = `http://localhost:${port}/questions`;
const optionsEndpoint = `http://localhost:${port}/options`;

export function getQuestions() {
  const response = fetch(questionsEndpoint).then((response) => response.json());
  return response;
}

export function getOptions() {
  const response = fetch(optionsEndpoint).then((response) => response.json());
  return response;
}

export function voteOption(editedOption) {
  const votedPromise = fetch(optionsEndpoint + `/${editedOption.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedOption),
  });
  return votedPromise;
}

export function addQuestion(newQuestion) {
  const newQuestionPromise = fetch(questionsEndpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });
  return newQuestionPromise;
}

export function addOption(newOption) {
  const newOptionPromise = fetch(optionsEndpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newOption),
  });
  return newOptionPromise;
}
