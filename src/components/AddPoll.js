import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function AddPoll() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  //   let newOptions = [];
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function submitQuestionHandler(event) {
    event.preventDefault();
    const nextId =
      state.questions.reduce(
        (prev, curr) => (prev.id > curr.id ? prev.id : curr.id),
        0
      ) + 1;
    const newQuestionObj = {
      id: nextId,
      question: newQuestion,
      options: answerOptions,
    };
    dispatch({
      type: "add-question",
      newQuestion: newQuestionObj,
    });
    setNewQuestion("");
    setAnswerOptions([]);
  }

  function addOptionHandler(event) {
    event.preventDefault();
    setAnswerOptions([
      ...answerOptions,
      { id: answerOptions.length + 1, text: newOption, count: 0 },
    ]);
    setNewOption("");
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
            {answerOptions.map((option) => (
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
