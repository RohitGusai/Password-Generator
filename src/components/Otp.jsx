import React, { useEffect, useRef,useState } from "react";
import "./tp.css";

const Otp = ({ length = 6 , loginsuccess}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);
  

  useEffect(()=>{
    if(inputRef.current[0])
    {
        console.log("what is in that",inputRef);
        inputRef.current[0].focus();
    }
        
  },[])

  

  

  const handleChanges = (index,e)=>
  {
    const value = e.target.value;
    // console.log(value);
    const newOTP = [...otp];
    // console.log("changing by user", index);
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);
    if(value && index < length - 1)
    {
        inputRef.current[index+1].focus();
    }
    const combineOtp = newOTP.join("");
    console.log("combine otp", combineOtp);
    loginsuccess(combineOtp);
    
    // index++;
  }

  const handleClick = (index) =>
  {
    // console.log("clicked by user", index);
    const input  = inputRef.current[index];
    if(input)
    {
        input.setSelectionRange(1,1);
    }
    
  }

  const handlekey = (index,e)=> {
    
    if(!otp[index] && e.key === "Backspace" && index > 0 )
    {
        // console.log("what is in that",otp[index])
        inputRef.current[index - 1].focus();
    }
  }
  return (
    <div className="otp-container">
      <h1>OTP has been sent to your number</h1>

      <div className="otp-box-wrapper">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            // maxLength="1"
            ref={(el)=>inputRef.current[index] = el}
            className="otp-input"
            value={data}
            onChange={(e)=>handleChanges(index,e)}
            onClick={()=>handleClick(index)}
            onKeyDown={(e)=>handlekey(index,e)}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
