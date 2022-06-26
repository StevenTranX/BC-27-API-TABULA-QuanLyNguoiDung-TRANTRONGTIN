init();

function init() {
  axios({
    url: 'https://62b579ecda3017eabb1b8353.mockapi.io/api/users',
    method: 'GET',
  }).then(function (result) {
    console.log(result.data);
    const users = result.data;
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      users[i] = new User(
        user.id,
        user.username,
        user.fullName,
        user.password,
        user.email,
        user.userType,
        user.language,
        user.description,
        user.image
      );
      console.log(user.userType);
    }
    // typeOfUser(users);
    display(users);
  });
}

function display(users) {
  let html = '';
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.userType === 'GV') {
      html += `
    <div class="cards-row animate__animated animate__fadeIn wow">
    <div class="cards-col">
      <div class="col-top">
        <img src="./images/${user.image}" style = "" /> 
      </div>
      <div class="col-bottom">
        <header class="bottom-title">
          <h6>${user.language}</h6>
          <h3>${user.fullName}</h3> 
        </header>
        <div class="bottom-content">
          <p>${user.description}</p> 
        </div>
      </div>
    </div>
  </div>
    `;
    } else continue;
  }
  document.querySelector('.cards-wrapper').innerHTML = html;
}
