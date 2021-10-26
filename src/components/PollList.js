import { useSelector } from "react-redux";
import PollItem from "./PollItem";
import { Container } from "react-bootstrap";

function PollList() {
  // USE THESE FOR REDUX TOOLKIT
  const questions = useSelector((state) => state.questions.questions);
  const optionsList = useSelector((state) => state.options.options);

  // USE THESE FOR REDUX
  // const questions = useSelector((state) => state.questions);
  // const optionsList = useSelector((state) => state.options);

  return (
    <Container>
      {questions.map((question) => (
        <PollItem
          key={question.id}
          questionObj={question}
          optionsList={optionsList.filter(
            (option) => option.questionId === question.id
          )}
        />
      ))}
    </Container>
  );
}

export default PollList;
