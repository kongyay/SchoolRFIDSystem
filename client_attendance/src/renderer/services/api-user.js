import {
  API
} from './API'

export default {
  async getAuth (username, password) {
    try {
      const user = await API.get(`/users/auth?username=${username}&password=${password}`)

      return user.data
    } catch (error) {
      console.log(error)
      return (null)
    }
  }
}
