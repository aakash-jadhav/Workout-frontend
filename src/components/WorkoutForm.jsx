import React from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext()
  const [title, setTitle] = React.useState("")
  const [load, setLoad] = React.useState("")
  const [reps, setReps] = React.useState("")
  const [error, setError] = React.useState(null)
  const [emptyFields, setEmptyFields] = React.useState([])

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError("You must be logged in")
      return
    }
    const workout = { title, load, reps }

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}api/workout`,
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    )

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("")
      setLoad("")
      setReps("")
      setEmptyFields([])
      setError(null)
      console.log("New workout added", json)
      dispatch({ type: "CREATE_WORKOUT", payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <i>Add a new Workout</i>

      <label htmlFor="title">Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="load">Load (kg) </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Reps </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
