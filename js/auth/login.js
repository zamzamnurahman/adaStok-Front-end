import { baseUrl } from "../baseUrl.js";

var form = document.querySelector('form');
var emailCtrl = document.getElementById('emailCtrl');
var passwordCtrl = document.getElementById('passwordCtrl');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  masukUser(emailCtrl.value, passwordCtrl.value);
})

async function masukUser(email, password) {
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

  if (response.status == 200) {
    alert("Berhasil Masuk")
    var result = await response.json();
    var token = result['token'];
    localStorage.setItem('token', token);
    window.location.replace('home.html');
    return true
  }
  alert("Gagal Masuk Akun, Harap perhatikan pengisian Formulir")

}