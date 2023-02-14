import React from "react";
import pic from '../../images/picquizhome.png'
import givetest from '../../images/givetest.jpg'
import admin from '../../images/admin.jpg'
import "./homepage.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container style={{marginTop:56, minWidth:"100%"}} className="bg-success p-5">
     
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
      <Col xs={12} md={5}>
       <h3 className="text-center text-white">You Can Participate in Quiz</h3>
        <img src={pic} alt="" className="img"/>
        
      </Col>
      <Col xs={12} md={7}>
      <h3 className="text-center text-white">Hey Buddy Welcome!</h3>
         <CardGroup>
      <Card className="m-1">
        <Card.Img variant="top" src={admin} />
        <Card.Body>
          <Card.Title>Want to Take Quiz</Card.Title>
          <Card.Text>
            Here You Can Create Quiz, You can share the link with candidate.
            A candidate can give the quiz from the given link. This
             is great experience as admin to create quiz.

          </Card.Text>
           <Button variant="success" size="sm" onClick={()=>navigate('createquiz')}>
             Visit Admin Page
          </Button>
          
        </Card.Body>
       
      </Card>
      <Card className="m-1">
        <Card.Img variant="top" src={givetest} />
        <Card.Body>
          <Card.Title>Hi Welcome</Card.Title>
          <Card.Text>
              This is the place where you can know your skillset by giving test now various category.
      
          </Card.Text>
          <Button variant="success" size="sm" onClick={()=>navigate('playquiz')}>
             Go to Quiz Section
        </Button>
        </Card.Body>
        
      </Card>
    </CardGroup>


      </Col>
    </Row>
  </Container>
  </>
  );
};

export default Homepage;
