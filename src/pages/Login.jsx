import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Log in</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Login in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
