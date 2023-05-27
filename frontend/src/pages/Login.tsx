import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    }, [])




    const authenticateUser = async () => {
        if ((name.length == 0 && !login) || password.length === 0 || email.length === 0) {
            window.alert("Please enter valid details");
            return;
        }

        const url = 'http://localhost:2000/' + (login ? 'login' : 'register');

        var data = {
            email: email,
            password: password,
            name: name
        }

        const result = await axios.post(url, data);

        // if it register then means go to login

        if (!login) {
            setLogin(true);
        }
        else {
            localStorage.setItem('token', result.data.token);
            navigate('/home');
        }

        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='w-full h-full flex justify-center mt-10'>
            <div className='flex flex-col gap-5 bg-blue-100 p-3'>
                {
                    !login && <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded-lg text-lg' type="text" placeholder='Enter the name' />
                }
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-lg text-lg' type="text" placeholder='Enter the email address' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-lg text-lg' type="text" placeholder='Enter the password' />
                <button onClick={authenticateUser} className='w-full bg-red-100 p-2 rounded-md'>
                    {!login && "Register"}
                    {login && "Login"}

                </button>
                <div className='flex justify-around'>
                    <p>Don't have accound? <strong className='cursor-pointer' onClick={() => setLogin((value) => value = !value)}>
                        {login && "Register"}
                        {!login && "Login"}
                    </strong> </p>
                </div>
            </div>
        </div>
    )
}

export default Login