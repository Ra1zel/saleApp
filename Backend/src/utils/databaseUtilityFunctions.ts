import {v4 as uuidv4} from 'uuid'


export const AuthenticateUser = (email: string, password: string) => {
  //TODO: This is only for testing. Will implement this later.
  if (email === 'john@example.com' && password === 'makalatete1_A') {
    return {
      success: true,
      key: uuidv4()
    }
  } else {
    return {
      success: false
    }
  }
}