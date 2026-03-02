import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {login,isAuthenticated} from './services/auth'
import './Login.css'

export default function Login(){
    const navigate =useNavigate()

    const [identifier,setIdentifier]=useState('');
    const [password,setPassword]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [error,setError]= useState('')

    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/dashboard')
        }
    },[navigate])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("")
        try {
            await login(identifier,password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message)
        }
    };
    return (
        <div className="login-container">
            <form  onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                {error && <p className="error">{error}</p>}

                <input
                type="text"
                placeholder="Email or Phone Number"
                value={identifier}
                onChange={(e)=> setIdentifier(e.target.value)}
                required
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />

                <button  className="login-btn" type="submit">Login</button>
            </form>
        </div>
    )
}