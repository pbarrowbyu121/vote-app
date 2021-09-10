import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

function PollItem({ questionObj }) {
  const [selectedOption, setSelectedOption] = useState("select");
  const [newOptionText, setNewOptionText] = useState("");
  const dispatch = useDispatch();

  const nextId =
    questionObj.options.reduce((prev, curr) =>
      prev.id > curr.id ? prev.id : curr.id
    ) + 1;

  const totalVotes = questionObj.options.reduce(
    (prev, curr) => prev + curr.count,
    0
  );
  const voteHandler = (e) => {
    e.preventDefault();
    if (selectedOption === "add-option") {
      dispatch({
        type: "add-option",
        newOption: { id: nextId, text: newOptionText, count: 1 },
        questionId: questionObj.id,
      });
      setSelectedOption("select");
      setNewOptionText("");
    } else {
      dispatch({
        type: "vote",
        questionId: questionObj.id,
        optionId: selectedOption,
      });
    }
  };

  const addOptionChange = (event) => {
    setNewOptionText(event.target.value);
  };

  return (
    <Card style={{ width: "50%" }}>
      <Card.Body>
        <Row>
          <Col>
            <div>{questionObj.question}</div>
            <Form onSubmit={voteHandler}>
              <Form.Control
                value={selectedOption}
                as="select"
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              >
                <option value={"select"}>Select</option>
                {questionObj.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
                <option value={"add-option"}>Add option</option>
              </Form.Control>
              <Form.Control
                placeholder="New Option"
                disabled={selectedOption !== "add-option"}
                onChange={addOptionChange}
                value={newOptionText}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={selectedOption === "select"}
              >
                Vote
              </Button>
            </Form>
          </Col>
          <Col>
            <div>Results:</div>
            {questionObj.options.map((option) => (
              <Row key={option.id}>
                <Col>{option.text}:</Col>
                <Col>{option.count}</Col>
              </Row>
            ))}
            <Row>
              <Col>Total:</Col>
              <Col>{totalVotes}</Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PollItem;
