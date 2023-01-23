import { baseUrl } from "../baseUrl.js";

const token = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idProduk = urlParams.get('id')

const getDetailProduk = async () => {
  var url = `${baseUrl}/Produk/${idProduk}`;

  var response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  var result = await response.json();

  if (response.status == 200) {
    var data = new Array(result['data']);
    console.log(data);

    var rows = [];
    for (var d in data) {
      var row =
        `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${d['stok']}</td>
        <td>${d['nama']}</td>
        <td>${d['harga_umum']}</td>
      </tr>
      `
    }
  }
}

getDetailProduk();