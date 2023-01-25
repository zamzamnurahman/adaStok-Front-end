import { baseUrl } from "../baseUrl.js";

var table_body = document.getElementById("table-stok");
const token = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idProduk = urlParams.get('id')

const getDetailProduk = async () => {
  var url = `${baseUrl}/Produk`;

  var response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  var result = await response.json();

  if (response.status == 200) {
    var data = result['data'];
    var datastok = []

    for (var i = 0; i < data.length; i++) {
      if (data[i]['id'] == idProduk) {
        datastok = data[i]['stock'];
        break;
      }
    }

    var rows = [];
    for (var i = 0; i < datastok.length; i++) {
      var rowData =
        `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${datastok[i]['stock_produk']}</td>
        <td>${datastok[i]['tgl_masuk']}</td>
        <td>${datastok[i]['expired_produk']}</td>
        <td><button class='btn btn-danger' >hapus</button></td>
      </tr>
      `
      rows.push(rowData);
    }

    table_body.innerHTML = rows.map((value) => value);
  }
}

getDetailProduk();