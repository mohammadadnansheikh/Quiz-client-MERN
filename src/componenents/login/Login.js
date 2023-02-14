import React, { useState, useEffect} from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/userSlice";



const userLoginInfo = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(userLoginInfo);
  const [message, setMessage] = useState("");
  

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendRequest = async() =>{
      const res = await axios.post("http://localhost:5000/login", {
        email : user.email,
        password : user.password
      }).catch((errRes)=>{
        console.log(errRes.response.data.message)
        setMessage(errRes.response.data.message)
      })

    
        const data = await res.data;
        setUser({});
        return data;
      
  }

  const handleSubmit =  (e) => {
    
    e.preventDefault();
    sendRequest().then(()=>dispatch(authActions.login())).then(()=> navigate('/user'))
    // console.log("start");
    // try {
      

    //   let res = await fetch("http://localhost:5000/login", {
    //     method: "POST",
        
    //     body: JSON.stringify({
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
    //     setIsNavigate(true);
    //   } else if(res.status === 400){
    //     setMessage(detail.message);
    //   }else{
    //     setMessage(detail.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // alert("end");
  };

  console.log(message)
  useEffect(()=>{
    setTimeout(()=>{
      setMessage("")
    }, 2000)
  }, [message])

  return (
    <>

   {
    message ?  <Alert variant="danger" style={{marginTop:56}}>
    <Alert.Heading >{message ? <p>{message}</p> : null}</Alert.Heading>
  </Alert> : null
   }
      

      <div className="container bg-light w-50 p-5 border border-success" style={{marginTop:90}}>
        <h3>Login Here</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Password"
              name="password"
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
export default Login;
