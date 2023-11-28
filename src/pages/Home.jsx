import React from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
export default function Home() {
  const { workouts, dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  //console.log(import.meta.env.REACT_APP_BASEURL)
  React.useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASEURL}api/workout`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        const json = await response.json()
        // console.log(json.workouts)
        if (response.ok) {
          dispatch({ type: "SET_WORKOUT", payload: json.workouts })
        }
      } catch (e) {
        console.log("Error Occured while fetching workouts", e)
      }
    }
    if (user) fetchWorkout()
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  )
}
