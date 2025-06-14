import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9090/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful! Redirecting to home...');
                setTimeout(() => navigate('/'), 2000); // 2 second delay
            }
            else {
                alert(data.message || 'Signup failed');
                setName('')
                setEmail('')
                setPassword('')

            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Something went wrong. Please try again later.');
        }
    };




    return <>


        <form onSubmit={handleSignup}>
            <Link to='/'>
                <button> Home</button>
            </Link>
            <div>
                <label>Name</label>
                <input placeholder='Enter your name'
                    required
                    type='text'
                    value={name}
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input placeholder='Enter your email'
                    type='text'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <label>Password</label>
                <input placeholder='Enter your password'
                    type='password'
                    required
                    value={password}
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div>

                <button id="signup" type="submit">Signup</button>



            </div>

            <div className="have">
                <p>Already have an account?</p>
                <Link to="/login">
                    <button type="button">Login</button>
                </Link>
            </div>
        </form>


    </>
        ;
}
