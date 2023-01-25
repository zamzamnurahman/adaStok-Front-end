import { baseUrl } from "../baseUrl.js";
import { masukUser } from "./login.js";

var form = document.querySelector('form');
var msg = document.getElementById('msg');
var nama = document.getElementById('nama');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirm_password = document.getElementById('confirm_password');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (password.value == confirm_password.value) {
    daftarUser(nama.value, email.value, password.value, confirm_password.value);
  } else {
    msg.style.display = 'block';
    msg.innerText = 'konfirmasi password tidak sesuai';
  }
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

  var result = await response.json();

  if (response.status == 201) {
    alert("Berhasil Daftar")
    masukUser(email, password);
    return true
  }
  if (result['email'] != null) {
    msg.style.display = 'block';
    msg.innerText = 'Alamat Email sudah terdaftar';
  } else {
    msg.style.display = 'block';
    msg.innerText = 'Gagal Daftar, Coba kembali';
  }
}