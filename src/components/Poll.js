import { Dropdown, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Poll() {
  const [selectedOption, setSelectedOption] = useState({
    text: "Select",
    id: 0,
  });
  const dispatch = useDispatch();
  const voteHandler = (id) => {
    dispatch({ type: "option" + selectedOption.id });
  };

  const poll = useSelector((state) => state);
  return (
    <Card style={{ width: "50%" }}>
      <Card.Body>
        <div>The question will go here?</div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedOption.text}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {poll.options.map((option) => (
              <Dropdown.Item
                key={option.id}
                onClick={() => setSelectedOption(option)}
              >
                {option.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={voteHandler}>
          Vote
        </Button>
        <div>
          <div>Results:</div>
          {poll.options.map((option) => (
            <div key={option.id}>
              {option.text}: {option.count}
            </div>
          ))}
          <div>Total: {poll.totalVotes}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Poll;
