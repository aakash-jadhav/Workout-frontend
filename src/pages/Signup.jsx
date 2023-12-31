import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
useSignup
function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, error, isLoading } = useSignup()

  async function handleSubmit(e) {
    e.preventDefault()
    await signup(email, password)
  }
  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign up</h3>
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
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup
