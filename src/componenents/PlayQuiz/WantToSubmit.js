import React from 'react'

const WantToSubmit = (props) => {
  const {category, score , right} = props
  return (
    <div style={{marginTop:90, minHeight:400}}className="container bg-success" >
        <h1 className='d-flex justify-content-center'>Category {category}</h1> 
        <h2 className='d-flex justify-content-center'>Score : {score}</h2>
        <h2 className='d-flex justify-content-center'>Right Answered : {right}</h2>
        <h2 className='d-flex justify-content-center'>Wrong Answered : {10-right}</h2>
    </div>
  )
}

export default WantToSubmit
