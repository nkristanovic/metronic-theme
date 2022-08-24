import apiOrigin from './api'

export const loginUser = (user) => {
  return fetch(`${apiOrigin}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}
