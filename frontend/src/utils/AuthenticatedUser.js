// src/utils/AuthenticatedUser.js
const token = localStorage.getItem('token');

if (token) {
  fetch('http://127.0.0.1:8000/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => console.log(data));
} else {
  console.log('❌ No token found, please log in.');
}
