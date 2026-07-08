import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const { handleRegister } = useAuth()
    function handleSubmit(e) {
        e.preventDefault()
        handleRegister(username, email, password)
            .then((res) => {
                console.log(res)
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
