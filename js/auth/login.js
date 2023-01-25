import { baseUrl } from "../baseUrl.js";

var form = document.querySelector('form');
var msg = document.getElementById('msg');
var text = document.getElementById('text');
var loading = document.getElementById('loading');
var emailCtrl = document.getElementById('emailCtrl');
var passwordCtrl = document.getElementById('passwordCtrl');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  text.style.display = 'none';
  loading.setAttribute('class', 'spinner-border');
  masukUser(emailCtrl.value, passwordCtrl.value);
})

export const masukUser = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  var result = await response.json();

  if (response.status == 200) {
    console.log('berhasi;l');

    var token = result['token'];
    var idUser = result['user']['id'];
    localStorage.setItem('token', token);
    localStorage.setItem('idUser', idUser);
    window.location.replace('../../page/dataBarang.html');
    removeLoading();
    alert("Berhasil Masuk")
    return true
  }
  removeLoading();
  msg.innerText = `${result['message']}`;
  msg.style.display = 'block';
}

function removeLoading() {
  setTimeout(() => {
    loading.removeAttribute('class');
    text.style.display = 'block';
  }, 500);
}
