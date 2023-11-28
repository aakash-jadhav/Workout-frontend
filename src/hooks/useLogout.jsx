import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutContext()

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user")

    //dispatch logout action
    dispatch({ type: "LOGOUT" })
    workoutDispatch({ type: "SET_WORKOUT", payload: null })
  }

  return { logout }
}
