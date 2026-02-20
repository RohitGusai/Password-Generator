import React from 'react'
import {useState} from "react"
import Otp from "./Otp"

const Number = () => {
    const [number,setnumber] = useState("");
    const [toggle,settoggle] = useState(false);

    const handleChanges = (e) =>
    {
        const values = e.target.value;
        setnumber(values);

        const regex = /[^0-9]/g;
        
        if(number.length < 10 ||regex.test(values))
        {
            console.log("valid number")
            return;
           
        }
        settoggle(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        


    }
    const handlesucess = (login) =>
    {
        console.log("login successfull",login);
    }
  return (
    <div>
        {!toggle ? (
            <form onSubmit={handleSubmit}>
            <input type="text" name="Number" value={number} onChange={handleChanges} placeholder='Enter the Number'/>
            <button type="submit">Submit</button>
        </form>
        ):
        <Otp length={4} loginsuccess={handlesucess}/>
        }
    </div>
  )
}

export default Number