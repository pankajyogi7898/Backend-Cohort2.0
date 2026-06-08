import { useState } from 'react'
import { Link } from 'react-router'
import axios from "axios"

const Register = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:3000/api/auth/register", {
            username,
            email,
            password
        }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input onInput={(e) => { setUserName(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input onInput={(e) => { setEmail(e.target.value) }}
                        type="text"
                        name='email'
                        placeholder='******@gmail.com' />
                    <input onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <input
                        type="submit"
                        value="Register" />
                </form>

                <p className="form-footer">
                    Already have an account? <span><Link to="/login"> Login</Link></span>
                </p>

            </div>
        </main>
    )
}

export default Register
