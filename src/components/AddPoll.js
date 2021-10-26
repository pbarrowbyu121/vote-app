import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addQuestion, addOption, getOptions, getQuestions } from "../helpers";

// USE THESE FOR REDUX TOOLKIT
import optionsSlice from "../store/options-slice";
import questionsSlice from "../store/questions-slice";

function AddPoll() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [questionId, setNewQuestionId] = useState(uuidv4());

  // USE THIS FOR REDUX TOOLKIT
  const optionsList = useSelector((state) => state.options.options).filter(
    (option) => option.questionId === questionId
  );

  // USE THIS FOR REDUX
  // const optionsList = useSelector((state) => state.options).filter(
  //   (option) => option.questionId === questionId
  // );
  const dispatch = useDispatch();

  function submitQuestionHandler(event) {
    event.preventDefault();
    const newQuestionObj = {
      id: questionId,
      text: newQuestion,
    };
    addQuestion(newQuestionObj).then(
      (response) =>
        // USE THIS FOR REDUX TOOLKIT
        getQuestions().then((response) => {
          dispatch(questionsSlice.actions.setQuestions(response || []));
        })
      // USE THIS FOR REDUX
      // getQuestions().then((response) => {
      //   dispatch({ type: "setQuestions", questions: response });
      // })
    );
    setNewQuestion("");
    setNewQuestionId(uuidv4());
  }

  function addOptionHandler(event) {
    event.preventDefault();
    // USE THIS FOR REDUX TOOLKIT
    addOption({ text: newOption, count: 0, questionId }).then((response) => {
      setNewOption("");
      getOptions().then((response) => {
        dispatch(optionsSlice.actions.setOptions(response || []));
      });
    });

    // USE THIS FOR REDUX
    // addOption({ text: newOption, count: 0, questionId }).then((response) => {
    //   setNewOption("");
    //   getOptions().then((response) => {
    //     dispatch({ type: "setOptions", options: response });
    //   });
    // });
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
