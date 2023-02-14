import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
const CreateQuiz = () => {
  //Set the Category of the Quiz
  const [category, setCategory] = useState("");
  const [submitcateg, setSubmitCateg] = useState(null);
  const [showsubmit, setShowSubmit] = useState(false);
  // For Each of Question
  const [quesNo, setQuesNo] = useState(1);
  const [typeofQues, setTypeofQues] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");
  const [optionBox, setOptionBox] = useState("");
  const [correct, setCorrect] = useState([]);
  const [incorrect, setInCorrect] = useState([]);
  const [message, setMessage] = useState("");

  const [questionObj, setQuestionObj] = useState({});

  const [quizQues, setQuizQues] = useState([]);
  const [save, setSave] = useState(false)

  const [finalSubmit, setFinalSubmit] = useState({})

  // values of each quesion

  const correctOption = () => {
    setCorrect((correct) => [...correct, optionBox]);
    // console.log(correct)
    setOptionBox("");
  };
  const incorrectOption = () => {
    setInCorrect((incorrect) => [...incorrect, optionBox]);
    setOptionBox("");
  };

  const onSubmitCategory = (e) => {
    e.preventDefault();
    setSubmitCateg(category);
  };

  const uploadQuestionHandler = ()=>{
    setQuesNo((quesNo) => quesNo + 1);
    setSave(false)
    setQuizQues((quizQues) => [...quizQues, questionObj]);
    setTypeofQues("");
    setDifficulty("");
    setQuestion("");
    setCorrect([]);
    setInCorrect([]);
    setOptionBox("");
  }

  const saveQuestionHandler = () => {
    
    setQuestionObj({ typeofQues, difficulty, question, correct, incorrect });
    setSave(true)
  };
  //console.log(ques);
 // console.log("Quiz", quizQues)

  // final submission of Quiz
  const submitFinallySubmit = async()=>{
   // setSave(false);
    try {
      
      let res = await fetch("http://localhost:5000/admin", {
        method: "POST",
        body: JSON.stringify({
          category: category,
          values : quizQues
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await res.json();
     
      console.log("STATUS")
      if (res.status === 200) {
        setMessage("Quiz created Sucessfull");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
   
  }
  const saveFinallySubmit = () => {
    
    setFinalSubmit({category, quizQues});
    setSave(true)
    console.log(finalSubmit);
  };
  useEffect(()=>{
    setTimeout(()=>{
      setMessage("")
    }, 2000)
  }, [message])
 // console.log("Quiz", finalSubmit)
  return (
    <>
       {
    message ?  <Alert variant="success" style={{marginTop:50}}>
    <Alert.Heading >{message ? <p>{message}</p> : null}</Alert.Heading>
  </Alert> : null
   }
      {submitcateg === null ? (
        <div className="container" style={{marginTop:56, minWidth:"100%", minHeight:"100%"}}>
          <div className="row">
            <div className="col">
            <Form className="w-25  border border-dark rounded p-5 mt-5" onSubmit={onSubmitCategory} style={{margin:"auto"}}>
            <Form.Group className="mb-3 text-center " controlId="formBasicName">
              <Form.Label className="display-6">Choose Category</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <div className="d-grid gap-2">
                <Button type="Submit" variant="primary" size="lg">
                  Continue
                </Button>
              </div>
            </Form.Group>
          </Form>
            </div>

          </div>
        </div>
      ) : showsubmit === false ? (
        <div className="container bg-light p-2 w-75 border border-dark rounded" style={{marginTop:90}}>
          <h4 className="mb-1 text-center text-success">
            {submitcateg} Question: {quesNo}
          </h4>
          <Form className="p-2">
            <Form.Label>Select Type </Form.Label>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              id="dropdown"
              onChange={(e) => setTypeofQues(e.target.value)}
              name="typeofQues"
            >
              <option>Select type of question</option>
              <option value="mcq">MCQ(Single Correct)</option>
              <option value="msq">MSQ(More Than One Correct Answer)</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Difficulty Level 1 to 10</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                placeholder="Choose Difficulty Between 1 to 10"
                name="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Your Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type Question Here.........."
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                Put the option and after that move item into correct or
                incorrect box
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Option Box"
                name="option box"
                value={optionBox}
                onChange={(e) => setOptionBox(e.target.value)}
              />
            </Form.Group>

            <div className="m-3">
              <Button variant="info" size="sm" onClick={correctOption}>
                Correct option
              </Button>{" "}
              <Button variant="info" size="sm" onClick={incorrectOption}>
                Incorrect option
              </Button>
            </div>

            <div className="container w-25 d-flex justify-content-end">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Correct</th>
                  </tr>
                </thead>
                <tbody>
                  {correct != null
                    ? correct.map((data, i) => {
                        return (
                          <tr>
                            {" "}
                            <td key={i}>{data}</td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </Table>

              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Incorrect</th>
                  </tr>
                </thead>
                <tbody>
                  {correct != null
                    ? incorrect.map((data, i) => {
                        return (
                          <tr>
                            {" "}
                            <td key={i}>{data}</td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </Table>
            </div>

            {quesNo <= 10 ? (
              save === false ? (
                <div className="d-grid gap-2">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={saveQuestionHandler}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={uploadQuestionHandler}
                  >
                    Upload
                  </Button>
                </div>
              )
            ) : (
              setShowSubmit(true)
            )}
          </Form>
        </div>
      ) : (
        <div className="container bg-success p-5 w-75 p-3 border border-dark" style={{marginTop:90}}>
          <Card className="text-center">
            <Card.Header className="display-6">Category {category}</Card.Header>
            <Card.Body className="text-success p-5">
              <Card.Title>Thanks For Creating Quiz Questions and Save it from here !</Card.Title>
              <Card.Text>
                For Creating More Such Quizes Once Again Visit The Create Quiz
              </Card.Text>
              {save === false ?<Button variant="primary" onClick={saveFinallySubmit}>
                Save Quiz
              </Button> :<Button variant="primary" onClick={submitFinallySubmit}>
                Submit Quiz
              </Button>}
              
            </Card.Body>
            <Card.Footer className="text-muted">👏👏👏👏👏</Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
