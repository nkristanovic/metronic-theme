import apiOrigin from './api'

export const getAllUser = (authToken) => {
  return fetch(`${apiOrigin}/users/`, {
    headers: {
      'auth-token': authToken,
    },
  }).then((res) => res.json())
}
