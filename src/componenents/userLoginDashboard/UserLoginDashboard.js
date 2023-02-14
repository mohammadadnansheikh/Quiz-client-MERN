import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
axios.defaults.withCredentials = true;
let firstRender = true
const UserLoginDashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState();
    const passHomeHandler = ()=>{
        navigate('/')
    }
    const refreshToken = async()=>{
        const res = await axios.get("http://localhost:5000/refresh",{
            withCredentials:true
        }).catch(err=>console.log(err))
        const data =  await res.data;
        return data;
    }
    const sendRequest = async()=>{
        const res = await axios.get("http://localhost:5000/user", {
            withCredentials : true
        }).catch((err)=>{
            console.log(err)
        })
       // console.log(res)
        const data = await res.data;
        return data;
    }
    useEffect(()=>{
        if(firstRender){
            firstRender = false;
            sendRequest()
            .then((data)=>setUser(data.user))
        }
        let interval = setInterval(()=>{
            refreshToken().then((data)=>setUser(data.user))
        },1000*28)
       // cleanup
       return ()=>clearInterval(interval)
    }, [])
  return (
    <div style={{marginTop:56}}>
        <h1>Logged In</h1>
        {user && user.name}
        Go to home page
        <button onClick={passHomeHandler}>Visit Home Page</button>
    </div>
  )
}

export default UserLoginDashboard
