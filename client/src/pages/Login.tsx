import { useState } from "react";
import "./Login.css";
export default function Login(){
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[error, setError] =useState("");
   const[loading, setLoading] =useState(false);


   function handleLogin(){

      if (!email || !password) {
         setError("Email and password are required");
         return;
      }
      
      setError("");
      setLoading(true);
      setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      setLoading(false);
      }, 1000);
   }  

   return (
         <div className="login-container">
             <form className="login-card" onSubmit={handleLogin}>
               <h2>Login</h2>
               
               {error && <p className="error">{error}</p>}

               <label>Email:</label>
               <input 
               type="email" 
               placeholder="Enter your email"  
               value={email} 
               onChange={(e)=> setEmail(e.target.value)}
               />

               <label>Password:</label>
               <input 
               type="password"
               placeholder="Enter your Password"
               value={password}
               onChange={(e)=> setPassword(e.target.value)} 
               />

               <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
               </button>
            </form>
         </div>

   );

}