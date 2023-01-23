import { baseUrl } from "../baseUrl.js";

var table_body = document.getElementById("table-body");
var btnProduk = document.getElementById('btn-produk');
// get produk
const getProduk = async () => {
  var url = `${baseUrl}/Produk`;
  var response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  var result = await response.json();

  if (response.status == 200) {
    var data = new Array();
    data = await result['data'];
    var rows = []
    for (var i = 0; i < data.length; i++) {
      var stok = [];
      stok = data[i]['stok'];

      const rowData =
        `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${data[i]['kode']}</td>
          <td>${data[i]['nama']}</td>
          <td>${data[i]['harga_umum']}</td>
          <td>${stok ?? 0}</td>
          <td>${data[i]['type']}</td>
          <td><a href="detailBarang.html?id=${data[i]['id']}" class="btn btn-info text-light">Detail</a></td>
        </tr>
      `
      rows.push(rowData);
    }
    table_body.innerHTML = rows.map((value) => value);
  }
}

const postProduk = async () => {

  var kodebarang = document.getElementById('kode');
  var namaBarang = document.getElementById('nama');
  var kategoriBarang = document.getElementById('kategori');
  var hargaBarang = document.getElementById('harga');
  var url = `${baseUrl}/Produk`;
  var body = {
    kode: kodebarang.value,
    nama: namaBarang.value,
    type: kategoriBarang.value,
    id_user: localStorage.getItem('idUser'),
    harga_umum: hargaBarang.value,
    harga_grosir: hargaBarang.value,
  }

  var response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  getProduk();
}

btnProduk.addEventListener('click', function () {
  postProduk();
})

getProduk();
