const baseUrl = 'https://62b579ecda3017eabb1b8353.mockapi.io/api/users';

function apiGetUsers() {
  return axios({
    url: baseUrl,
    method: 'GET',
  });
}
function apiAddUsers(user) {
  return axios({
    url: baseUrl,
    data: user,
    method: 'POST',
  });
}
function apiDeleteUsers(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    data: userId,
    method: 'DELETE',
  });
}
function apiGetUsersDetail (userId) {
  return axios ({
    url : `${baseUrl}/${userId}`, 
    // data : userId,
    method : 'GET',
  })
}
function apiUpdateUsers (user) {
  return axios ({
    url : `${baseUrl}/${user.id}`, 
    data : user,
    method : 'PUT',
  })
}
