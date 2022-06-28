init();

function init() {
  apiGetUsers().then((result) => {
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

    html += `
   <tr>
   <td>${i + 1}</td>
   <td>${user.username}</td>
   <td>${user.password}</td>
   <td>${user.fullName}</td>
   <td>${user.email}</td>
   <td>${user.language}</td>
   <td>${user.userType}</td>
   <td>
   <button class = "btn btn-primary" 
   data-toggle="modal"
   data-target="#myModal"
   data-type = "update" 
   data-id ="${user.id}"
   > Cập nhật </button>
   <button class = "btn btn-danger" 
   data-type = "delete" 
   data-id ="${user.id}"
   >Xóa </button>
   </td>
   </tr>
    `;
  }
  document.querySelector('#tblDanhSachNguoiDung').innerHTML = html;
}

document
  .querySelector('#btnThemNguoiDung')
  .addEventListener('click', showAddModal);

  function showAddModal() {
  document.querySelector('.modal-title').innerHTML = 'Thêm người dùng';
  document.querySelector('.modal-footer').innerHTML = `
  <button class = "btn btn-success" data-type = "add"  >Thêm</button>
  <button class = "btn btn-secondary" data-toggle = 'modal' data-target = '#myModal'>Hủy</button>
  `;
}


document.querySelector('.modal-footer').addEventListener('click', handleSubmit);
function handleSubmit(event) {
  console.log(event.target);
  let type = event.target.getAttribute('data-type');
  if (type === 'add') {
    addUser();
  } else if (type = 'update') {
    updateUser ();
  }
}
document.querySelector('#tblNguoiDung').addEventListener('click', handleClick);
function handleClick(event) {
  console.log(event.target)
  const type = event.target.getAttribute('data-type');
  const id = event.target.getAttribute('data-id');
  if (type === 'delete') {
    deleteUsers(id);
  } else if (type === 'update') {
    showUpdateModal(id);
  }
}

function addUser() {
  // alert('Successful');
  const username = document.getElementById('TaiKhoan').value;
  const fullName = document.getElementById('HoTen').value;
  const password = document.getElementById('MatKhau').value;
  const email = document.getElementById('Email').value;
  const image = document.getElementById('HinhAnh').value;
  const userType = document.getElementById('loaiNguoiDung').value;
  const language = document.getElementById('loaiNgonNgu').value;
  const description = document.getElementById('MoTa').value;
  const user = new User(
    null,
    username,
    fullName,
    password,
    email,
    userType,
    language,
    description,
    image,
  );
   let isValid = validation ()
   if (!isValid) {
    console.log ('Invalid Input')
    return
   }
  apiAddUsers(user)
    .then(function (result) {
      init();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteUsers(userId) {
  apiDeleteUsers(userId).then(function () {
    init();
  });
}

function showUpdateModal (userId) {
  document.querySelector('.modal-title').innerHTML = "Cập nhật người dùng";
  document.querySelector('.modal-footer').innerHTML = `
  <button class = "btn btn-success" data-type = "update"> Cập nhật</button>
  <button class = "btn btn-secondary" data-dismiss = "modal">Hủy</button>
  `;
  apiGetUsersDetail(userId).then(function(result) {
    const user = result.data ;
    document.getElementById('UserId').value = user.id 
    document.getElementById('TaiKhoan').value = user.username ;
    document.getElementById('HoTen').value = user.fullName ;
    document.getElementById('MatKhau').value = user.password ; 
    document.getElementById('Email').value = user.email
    document.getElementById('HinhAnh').value = user.image ; 
    document.getElementById('loaiNguoiDung').value = user.userType ; 
    document.getElementById('loaiNgonNgu').value = user.language ; 
    document.getElementById('MoTa').value = user.description ; 

  }).catch (function (error){
    console.log (error)
  });

  
}

function updateUser () {
  const userId = document.getElementById('UserId').value; 
  const username = document.getElementById('TaiKhoan').value;
  const fullName = document.getElementById('HoTen').value;
  const password = document.getElementById('MatKhau').value;
  const email = document.getElementById('Email').value;
  const image = document.getElementById('HinhAnh').value;
  const userType = document.getElementById('loaiNguoiDung').value;
  const language = document.getElementById('loaiNgonNgu').value;
  const description = document.getElementById('MoTa').value;
  const user = new User(
    userId,
    username,
    fullName,
    password,
    email,
    userType,
    language,
    description,
    image,
  );
  apiUpdateUsers(user)
    .then(function (result) {
      init();
      resetForm ()
    })
    .catch(function (error) {
      console.log(error);
    });
}

function resetForm() {
 
  document.getElementById('TaiKhoan').value = "" ; 
  document.getElementById('HoTen').value = ""; 
  document.getElementById('MatKhau').value = ""  ; 
  document.getElementById('Email').value = "" 
  document.getElementById('HinhAnh').value =""  ; 
  document.getElementById('loaiNguoiDung').value = ""  ; 
  document.getElementById('loaiNgonNgu').value = ""  ; 
  document.getElementById('MoTa').value = ""  ; 

  $("#myModal").modal("hide");

}
function validation () {
  const userId = document.getElementById('UserId').value; 
  const username = document.getElementById('TaiKhoan').value;
  const fullName = document.getElementById('HoTen').value;
  const password = document.getElementById('MatKhau').value;
  const email = document.getElementById('Email').value;
  const image = document.getElementById('HinhAnh').value;
  const userType = document.getElementById('loaiNguoiDung').value;
  const language = document.getElementById('loaiNgonNgu').value;
  const description = document.getElementById('MoTa').value;
  let isValid = true ; 

  if (!isRequired(username)) {
    isValid = false
    document.getElementById('spanUsername').innerHTML = "Tài khoản không được để trống"
  } 
  
  if (!isRequired(fullName)) {
    isValid = false
    document.getElementById('spanFullName').innerHTML = "Họ tên không được để trống"
  }
  if (!isRequired(password)) {
    isValid = false
    document.getElementById('spanPassword').innerHTML = "Mật khẩu không được để trống"
  }
  if (!isRequired(email)) {
    isValid = false
    document.getElementById('spanEmail').innerHTML = "Email không được để trống"
  }
  if (!isRequired(image)) {
    isValid = false
    document.getElementById('spanImage').innerHTML = "Hình Ảnh không được để trống"
  }
  if (userType === "") {
    isValid = false
    document.getElementById('spanUserType').innerHTML = "Vui lòng chọn người dùng"
  }
  if (language === "") {
    isValid = false
    document.getElementById('spanLanguage').innerHTML = "Vui lòng chọn ngôn ngữ"
  }
  if (!isRequired(description)) {
    isValid = false
    document.getElementById('spanDescription').innerHTML = "Mô tả không được để trống"
  } else if (!minLength(description,60)) {
    isValid = false
    document.getElementById('spanDescription').innerHTML = "Độ dài không vượt quá 60 ký tự"
  }
  return isValid
}

function isRequired (value) {
  if (!value) return false
  return true
}
function minLength (value, maxLimit ) {
  if (value.length > maxLimit ) {
    return false
  }
  return true ;
}

