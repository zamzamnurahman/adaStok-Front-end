import { baseUrl } from "../baseUrl.js";

var form = document.querySelector('form');
var nama = document.getElementById('nama');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirm_password = document.getElementById('confirm_password');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  daftarUser(nama.value, email.value, password.value, confirm_password.value);
})

async function daftarUser(name, email, password, confirm_password) {
  const data = {
    name: name,
    email: email,
    password: password,
    password_confirmation: confirm_password,
  };

  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (response.status == 201) {
    window.location.assign('home.html');
    alert("Berhasil Daftar")
    return true
  }
  alert("Gagal Daftar Akun, Harap perhatikan pengisian Formulir")

}