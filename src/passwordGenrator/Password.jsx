import React, { useEffect, useState } from "react";

const Password = () => {
  const [randomPassword, setRandomPassword] = useState("");
  const [range, setRange] = useState(8); 
const [copied,setcopied] = useState(false);


  const [choice, setChoice] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });



  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setChoice({ ...choice, [name]: checked });
  };

  const handlePassword = () => {
    let char = "";

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbols = "!@#$%^&*()_+";

    if (choice.uppercase) char += uppercase;
    if (choice.lowercase) char += lowercase;
    if (choice.numbers) char += number;
    if (choice.symbols) char += symbols;

    if (char.length === 0) {
      char+= uppercase + lowercase + symbols + number
    }

    let result = "";
    for (let i = 0; i < range; i++) {
      const random = Math.floor(Math.random() * char.length);
      result += char[random];
    }

    setRandomPassword(result);
    
  };

useEffect(()=>
{
    handlePassword();
},[range,choice])

  const getStrength = () => {
  if (range <= 5) return { text: "Weak", color: "bg-red-500" };
  if (range <= 8) return { text: "Medium", color: "bg-yellow-500" };
  return { text: "Strong", color: "bg-green-600" };
};

const strength = getStrength();


  return (
    
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 md:px-8">
      {copied && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
    Password copied!
  </div>
)}
      
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 space-y-6 text-white">

      
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
              Password Generator
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Generate secure passwords instantly
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center gap-3">

          
          <h2
            className="flex-1 min-h-[50px] flex items-center justify-between px-4 bg-gray-900 text-green-400 text-lg font-mono rounded-lg overflow-x-auto"
          >
            {randomPassword || "Your Password is !!!"}
            <p className={`${strength.color} items-center px-2 py-2 text-sm rounded-lg text-white`}>{strength.text} </p>          
          </h2>

          <button
            onClick={() => {navigator.clipboard.writeText(randomPassword);
                setcopied(true);
                setTimeout(() => 
                setcopied(false)
            , 2000);}
        }
            className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 text-sm font-medium rounded-lg"
          >
            Copy
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-gray-300">
              <span>Password range</span>
            <span className="font-semibold">{range}</span>
          </div>

          <input
            type="range"
            min="2"
            max="20"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full accent-green-600 cursor-pointer"
          />
        </div>

         <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-300 tracking-wide">
            Character Types
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 
            {["uppercase", "lowercase", "numbers", "symbols"].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={type}
                  id={type}
                  onChange={handleCheckbox}
                  className="w-4 h-4 accent-green-600 cursor-pointer"
                />
                <label
                  htmlFor={type}
                  className="text-sm text-gray-200 cursor-pointer select-none capitalize"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

         {/* <button
          onClick={() => handlePassword(range)}
          className="cursor-pointer w-full py-3 bg-green-600 hover:bg-green-700 transition duration-200 font-semibold rounded-lg"
        >
          Generate Password
        </button> */}

      </div>
    </div>
  );
};

export default Password;
