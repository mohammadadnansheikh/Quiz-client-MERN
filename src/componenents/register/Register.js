import React, { useEffect, useState } from "react";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const userInfo = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(userInfo);
  const [message, setMessage] = useState("");
  const [errmessage, setErrMessage] = useState("");
  const [errorType, setErrorType] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendRequest= async()=>{
      const res = await axios.post('http://localhost:5000/register', {
        name:user.name,
        email:user.email,
        password:user.password,
      }).catch((errRes)=>{
        console.log(errRes.response.data.message)
        setErrorType(true);
        setErrMessage(errRes.response.data.message)
    })
    
    
     if(res){
      await res.data;
      setUser({});
      setMessage("Registered Successfully")
      navigate("/login");
     }
    
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
  //  console.log("USER",user)
    await sendRequest();    
    
    // try {
    //   let res = await fetch("http://localhost:5000/register", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: user.name,
    //       email: user.email,
    //       password: user.password,
    //     }),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   detail = await res.json();

    //   if (res.status === 200) {
    //     setUser({});
    //     setMessage(detail.msg);
    //     navigate("/login");
    //   } else {
    //     setErrorType(true);
    //     setErrMessage(detail.msg);
    //   }
    // } catch (err) {
    //   console.log(err); 
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setErrMessage("")
    }, 2000);
  }, [message, errmessage]);

  return (
    <>
      {errorType ? (
        errmessage ? (
          <Alert variant="danger" style={{marginTop:56}}>
            <Alert.Heading>
              {errmessage ? <p>{errmessage}</p> : null}
            </Alert.Heading>
          </Alert>
        ) : null
      ) : message ? (
        <Alert variant="success" style={{marginTop:56}}>
          <Alert.Heading>{message ? <p>{message}</p> : null}</Alert.Heading>
        </Alert>
      ) : null}

      <div className="container bg-light w-50 p-5 border border-success rounded" style={{marginTop:90}}>
        <h3>Register Yourself</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInput}
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
            
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
