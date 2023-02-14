import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EachQues from "./EachQues";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import StartModal from "./StartModal";
import { useSelector } from "react-redux";
import Login from "../login/Login";


const PlayQuiz = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState([])
  const [listcategory, setListCategory] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestion] = useState("");
  const [isOpen, setOpen] = useState(false);
 
  const InputHandler = (e)=>{
    setSearch(e.target.value);
  }
  console.log()
  useEffect(() => {
    fetch("http://localhost:5000/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setListCategory(data);
      });
  }, []);
  const openQuizHandlerPerId = (id, categ, val) => {
   // setQuizOpen(true);
    setModalShow(true);
    setQuizId(id);
    setCategory(categ);
    setQuestion(val);
  };

  return (
    <>
    { isLoggedIn ?
    <>
      {isOpen === false ? (
        <Container
          className="bg-dark border border-dark"
          style={{ marginTop:56, minWidth:"100%" }}
        >

          <Row className="text-white p-1" style={{ minHeight: "12vh" }}>
            <Col
              xs={12}
              md={12}
              className="bg-secondary rounded border border-dark d-flex align-items-center justify-content-center"
            >
              <Form className="d-flex" style={{ minHeight: "5vh", minWidth:"350px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={InputHandler}
                />
                <Button variant="primary">Search</Button>
              </Form>
            </Col>
          </Row>

          <div className="row gy-3 mt-3">
            {listcategory.slice(0, 16).map((val) => {
              return (
                <div key={val._id} className="col-sm-6 col-md-4 col-lg-3">
                  <Card className="bg-white col text-center">
                    <Card.Body>
                      <Card.Title style={{ fontSize: "1.8rem" }}>
                        {val.category}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

              

                      <Button
                        variant="dark"
                        onClick={() =>
                          openQuizHandlerPerId(
                            val._id,
                            val.category,
                            val.values
                          )
                        }
                      >
                        Start Quiz 
                      </Button>

                      <StartModal
                        show={modalShow}
                        setModalShow = {setModalShow}
                        isOpen= {isOpen}
                        setOpen = {setOpen} 
                      />
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      ) : (
        <EachQues id={quizId} category={category} questions={questions}/>
      )}
      </> : <Login/>
      }
    </>
  );
};

export default PlayQuiz;
