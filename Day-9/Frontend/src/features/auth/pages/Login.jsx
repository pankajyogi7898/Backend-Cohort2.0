import { useState } from 'react'
import { Link } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const { handleLogin } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        handleLogin(username, password)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setUserName(e.target.value) }}
                        type="text"
                        name="username"
                        placeholder='Enter Username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name="password"
                        placeholder='Enter Password' />
                    <input type="submit" value="Login" />
                </form>
                <p className="form-footer">
                    Don't have an Account <span> <Link to="/register"> Register</Link></span>
                </p>
            </div>
        </main>
    )
}

export default Login
