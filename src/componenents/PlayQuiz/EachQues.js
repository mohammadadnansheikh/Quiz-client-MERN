import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import WantToSubmit from "./WantToSubmit";
import "./playquiz.css";
import Options from "./Options";
import QuizGuideModel from "./QuizGuideModel";

const EachQues = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const {category, questions} = props;
  const [quesNoIndex, setQuesNoIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [submission, setSubmission] = useState(false);
  const [right, setRight] = useState(0);
  const [nextQuesDisabled, setNextQuesDisabled] = useState(true);
  const submitQuizButton = () => {
    setSubmission(true);
  };
  const incrementCounter = () => {
    setNextQuesDisabled(true);
    setQuesNoIndex((prev) => prev + 1);
  };
  // console.log(questions[quesNoIndex].correctAnswer,"questions[quesNoIndex].correctAnswer");
  // console.log(questions[quesNoIndex].incorrectAnswer,"questions[quesNoIndex].incorrectAnswer")

  return (
    <React.Fragment>
      {submission ? (
        <WantToSubmit category={category} score={score} right={right} />
      ) : (
        <Container
          className="bg-dark border border-dark"
          style={{ marginTop:60, minWidth:"100%"}}
        >
          <Row className="text-white p-1" style={{ minHeight: "12vh" }}>
            <Col
              xs={12}
              md={4}
              className="bg-info rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <h3 className="">Category : {category}</h3>
            </Col>
            <Col
              xs={12}
              md={4}
              className="bg-danger rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <Button
                variant="dark"
                size="lg"
                style={{ margin: 1 }}
                onClick={() => setModalShow(true)}
              >
                Check Quiz Guide Before Start
              </Button>

              <QuizGuideModel
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Col>
            <Col
              xs={12}
              md={4}
              className="bg-info rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <h3>Current Score : {score}</h3>
            </Col>
          </Row>
          <Row className="text-white  p-1" style={{ minHeight: "8vh" }}>
            <Col
              xs={12}
              md={4}
              className="bg-secondary rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <h2>Question No {quesNoIndex + 1}</h2>
            </Col>
            <Col
              xs={12}
              md={4}
              className="bg-secondary rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <h3>Level Of Question {questions[quesNoIndex].difficulty}</h3>
            </Col>
            <Col
              xs={12}
              md={4}
              className="bg-secondary rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <h3>Type of Question {questions[quesNoIndex].typeofQues}</h3>
            </Col>
          </Row>
          <Row className="text-white bg-dark" style={{ minHeight: "40vh" }}>
            <Col className="m-5 p-5">
              <div
                className="font-weight-bolder d-flex align-items-center justify-content-center"
                style={{ fontSize: "1.5rem" }}
              >
                {" "}
                {questions[quesNoIndex].question}
              </div>
              <Options
                correct={questions[quesNoIndex].correctAnswer}
                incorrect={questions[quesNoIndex].incorrectAnswer}
                category={category}
                option={[
                  ...questions[quesNoIndex].correctAnswer,
                  ...questions[quesNoIndex].incorrectAnswer,
                ]}
                quesNoIndex={quesNoIndex}
                score={score}
                setScore={setScore}
                right={right}
                setRight={setRight}
                nextQuesDisabled={nextQuesDisabled}
                setNextQuesDisabled={setNextQuesDisabled}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center p-3">
            {
              quesNoIndex === 9 ? (
                <Button variant="success" size="lg" onClick={submitQuizButton}>
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={nextQuesDisabled}
                  onClick={incrementCounter}
                >
                  Next Question
                </Button>
              )
            }
          </div>
        </Container>
      )}
    </React.Fragment>
  );
};

export default EachQues;
