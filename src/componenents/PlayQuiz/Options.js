import React, { useState, useEffect, useRef } from "react";

const Options = (props) => {
  let { correct, incorrect, category, option , quesNoIndex, score, setScore, right, setRight, nextQuesDisabled, setNextQuesDisabled} = props;
  const colorRef = useRef(0);
  const [rightAns, setRightAns] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(()=>{
   setAttempted(false)
   setDisabled(false)
    console.log(quesNoIndex)
    console.log(incorrect, correct)
  },[quesNoIndex])
  const checkAnswer = (e) => {
    setNextQuesDisabled(false)
    setDisabled(true)
    setAttempted(true)
    if (e.target.innerHTML === correct[0]) {
     setRight((right)=>right+1);
      setRightAns(true)
      setScore((score)=>score+1)
    } else {
      setScore((score)=>score-1)
      setRightAns(false)
    }
  };
  console.log(score, "Score");
 // console.log("OP", correct, incorrect, option);
  return (
    <div> 
{/* style={{pointerEvents:disabled?"none":"auto",}} */}
      {option &&
        option.map((opt, i = 0) => {
          return (
            <div
              key={category+i}
              id={category + i}
              ref={colorRef}
              className="d-flex align-items-center justify-content-center rounded-pill"
              onClick={checkAnswer}
              style={{
                background: "blue",
                fontSize: "1.2rem",
                marginBottom: ".2rem",
                width: "auto",
                cursor: disabled ? "not-allowed":"pointer",
                pointerEvents:disabled ? "none":"initial"
              }}
            >
              {opt}
            </div>
          );
        })}

<div className="mt-5">
        { attempted === true ? rightAns ? <div 
        className="bg-success d-flex align-items-center justify-content-center rounded" 
        style={{minHeight:"40px", fontSize: "1.2rem"}}>Your answer is correct :{correct[0]}</div>
        :<div className="bg-danger d-flex align-items-center justify-content-center rounded" style={{minHeight:"40px", fontSize: "1.2rem"}}>
          Your answer is incorrect. Correct answer is : {correct[0]}</div>:""}
</div>

    </div>
  );
};

export default Options;
