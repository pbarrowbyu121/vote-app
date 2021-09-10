import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addQuestion, addOption, getOptions, getQuestions } from "../helpers";
import optionsSlice from "../store/options-slice";
import questionsSlice from "../store/questions-slice";

function AddPoll() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [questionId, setNewQuestionId] = useState(uuidv4());
  const optionsList = useSelector((state) => state.options.options).filter(
    (option) => option.questionId === questionId
  );
  const dispatch = useDispatch();

  function submitQuestionHandler(event) {
    event.preventDefault();
    const newQuestionObj = {
      id: questionId,
      text: newQuestion,
    };
    addQuestion(newQuestionObj).then((response) =>
      getQuestions().then((response) => {
        dispatch(
          questionsSlice.actions.setQuestions({ payload: response || [] })
        );
      })
    );
    setNewQuestion("");
    setNewQuestionId(uuidv4());
  }

  function addOptionHandler(event) {
    event.preventDefault();
    addOption({ text: newOption, count: 0, questionId }).then((response) => {
      setNewOption("");
      getOptions().then((response) => {
        dispatch(optionsSlice.actions.setOptions({ payload: response || [] }));
      });
    });
  }

  return (
    <Container>
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <Form onSubmit={submitQuestionHandler}>
            <Form.Control
              placeholder="New Question"
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            {optionsList.map((option) => (
              <div key={option.id}>{option.text}</div>
            ))}
            <Row>
              <Col>
                <Form.Control
                  placeholder="New Option"
                  onChange={(event) => setNewOption(event.target.value)}
                  value={newOption}
                />
              </Col>
              <Col>
                <Button variant="primary" onClick={addOptionHandler}>
                  Add option
                </Button>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Add Question
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddPoll;
