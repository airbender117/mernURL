import { useState } from 'react'
import {Link,useNavigate } from 'react-router-dom'
export default function Login() {
   
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin=async (e)=>{
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:9090/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json()
            console.log(data)


            if (response.ok){
                alert("Logged In successfully");
                navigate('/dashboard')
            }
        } catch (error) {
            
        }
        console.log(email,password)
       

    }



    return <>
        
        
<form onSubmit={handleLogin}>
    <div>
    <Link to='/'>
    <button> Home</button>
    </Link>
    </div>
        <div>
            <label>Email</label>
            <input placeholder='Enter your email' 
            type='text' 
            required 
            name='email' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div>
            <label>Password</label>
            <input placeholder='Enter your password' 
            type='password' 
            required 
            value={password}
            name='password' 
            onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
         <div className="forgot">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <p><a href="#">Forget Password?</a></p>
          </div>
        <div>
            
               <button id="login" type="submit">Login</button>
            


        </div>
         
          <div className="new">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button type="button">Sign up</button>
            </Link>
            </div>
        </form>


    </>
        ;
}
