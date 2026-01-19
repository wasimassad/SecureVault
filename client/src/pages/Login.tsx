import { useState } from "react";
export default function Login(){
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("")

   function handleLogin(){
      console.log("Email:",email);
      console.log("password:",password);
   }
   return (
      <div>
         <h1>Login</h1>

         <p>Email:</p>
         <input 
         type="email" 
         placeholder="Enter your email"  
         value={email} 
         onChange={(e)=> setEmail(e.target.value)}
         />

         <p>Password:</p>
         <input type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} 
          />

          <button onClick={handleLogin}>Login</button>

      </div>
  
);

}