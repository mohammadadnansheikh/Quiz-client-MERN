import React from 'react'




const Dashboard = (props) => {

  const {name, email} = props.detail

  return (
    <div>
       <div className="container w-75 mt-5 bg-success">
           <h1>Welcome to your Dashboard</h1>
            <h1>{name}</h1>
            <h3>{email}</h3>
       </div>
    </div>
  )
}

export default Dashboard
