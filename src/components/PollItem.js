import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Chart from "react-google-charts";
import { voteOption, getOptions, addOption } from "../helpers";
import optionsSlice from "../store/options-slice";

function PollItem({ questionObj, optionsList }) {
  const [selectedOption, setSelectedOption] = useState("select");
  const [newOptionText, setNewOptionText] = useState("");
  const dispatch = useDispatch();

  const totalVotes = optionsList.reduce((prev, curr) => prev + curr.count, 0);

  function addOptionHandler() {
    addOption({
      text: newOptionText,
      count: 1,
      questionId: questionObj.id,
    }).then((response) => {
      getOptions().then((response) => {
        dispatch(optionsSlice.actions.setOptions({ payload: response || [] }));
      });
    });
  }

  const voteHandler = (e) => {
    e.preventDefault();
    if (selectedOption === "add-option") {
      addOptionHandler();
    } else {
      let editedOption = {
        ...optionsList.find((option) => option.id === +selectedOption),
      };
      editedOption = { ...editedOption, count: +editedOption.count + 1 };
      voteOption(editedOption).then((res) =>
        getOptions().then((response) => {
          dispatch(
            optionsSlice.actions.setOptions({ payload: response || [] })
          );
        })
      );
    }
    setSelectedOption("select");
  };

  const addOptionChange = (event) => {
    setNewOptionText(event.target.value);
  };

  const dataForChart = () => {
    let data = [["Response", "Votes"]];
    optionsList.forEach((option) => {
      data.push([option.text, option.count]);
    });
    return data;
  };
  const chartData = dataForChart();

  return (
    <Card style={{ width: "90%" }}>
      <Card.Body>
        <Row>
          <Col>
            <div>{questionObj.text}</div>
            <Form onSubmit={voteHandler}>
              <Form.Control
                value={selectedOption}
                as="select"
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              >
                <option value={"select"}>Select</option>
                {optionsList.map((option) => (
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
            {optionsList.map((option) => (
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
          {totalVotes > 0 && (
            <Col>
              <Chart
                width={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                  title: questionObj.text,
                  chartArea: {
                    height: "200px",
                  },
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PollItem;
