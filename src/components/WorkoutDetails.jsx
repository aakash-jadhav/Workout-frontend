/* eslint-disable react/prop-types */
import { useWorkoutContext } from "../hooks/useWorkoutContext"
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    if (!user) return
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}api/workout/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json })
    }
  }
  return (
    <div className="workout-details">
      <h4> {workout.title} </h4>
      <p>
        <b>Load (kg): </b>
        {workout.load}
      </p>
      <p>
        <b>Reps: </b>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  )
}
