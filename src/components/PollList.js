import { useDispatch, useSelector } from "react-redux";
import PollItem from "./PollItem";
import { Container } from "react-bootstrap";

function PollList() {
  const state = useSelector((state) => state);
  return (
    <Container>
      {state.questions.map((poll) => (
        <PollItem key={poll.id} questionObj={poll} />
      ))}
    </Container>
  );
}

export default PollList;
