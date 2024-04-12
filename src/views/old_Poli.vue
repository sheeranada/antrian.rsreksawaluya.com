<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint';

const ralan = ref([]);
const items = ref([])
const pilihTanggal = ref('')
const pilihDokter = ref('')

// const fetchDataRalan = async () => {
//     await api.get('/api/ralan')
//         .then(response => {
//             new DataTable('#myTable', {
//                 layout: {
//                     top1: 'searchBuilder'
//                 },
//                 data: response.data,
//                 columns: [
//                     { data: 'tgl_registrasi' },
//                     { data: 'nm_pasien' },
//                     { data: 'no_rkm_medis' },
//                     { data: 'nm_dokter' },
//                     {
//                         data: null,
//                         render: function (data, type, row) {
//                             return `<button type="button" class="btn btn-secondary btn-detail" data-pasien="${row.nm_pasien}" data-dokter="${row.nm_dokter}"><i class="fas fa-play"></i></button>`;
//                         }
//                     }
//                 ]
//             })
//         })
// }
const fetchDataRalan = async () => {
    try {
        const response = await api.get('/api/ralan')
        items.value = response.data
        // console.log(response)
    } catch (error) {
        console.log('hikshiks:', error)
    }
}
const filterItems = () => {
    let filteredItems = items.value
    if (pilihTanggal.value) {
        filteredItems = filteredItems.filter(item => item.tgl_registrasi === pilihTanggal.value)
    }
    if (pilihDokter.value) {
        filteredItems = filteredItems.filter(item => item.nm_dokter === pilihDokter.value)
    }
    return filterItems
}

onMounted(() => {
    fetchDataRalan()

    // listener e poli ambek pasien
    let selectedPoli = ''; // Menyimpan nomor poli yang dipilih

    // Event listener for select element
    const selectPoli = document.getElementById('poli');
    selectPoli.addEventListener('change', function (event) {
        selectedPoli = event.target.value;
    });

    // Event listener untuk tombol Detail
    // Event listener untuk tombol Detail
    $(document).on('click', '.btn-detail', function () {
        // Mengambil data nm_pasien dan nm_dokter
        var nmPasien = $(this).data('pasien');
        var nmDokter = $(this).data('dokter');

        // Jika poli belum dipilih atau hasilnya bukan angka, munculkan alert
        if (!selectedPoli || isNaN(selectedPoli)) {
            alert('Pilih nomor poli terlebih dahulu!');
            return;
        }

        const data = {
            "poli": selectedPoli,
            "nm_pasien": nmPasien,
            "dokter": nmDokter,
        }

        // Lakukan request POST ke endpoint
        fetch(api.defaults.baseURL + 'api/antri-ralan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respon tidak berhasil: ' + response.status);
                }
                // Check if response body is not empty
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .then(data => {
                alert('Request untuk panggilan telah dikirim')
            })
            .catch(error => {
                console.error(error);
                alert('Terjadi kesalahan saat melakukan request!');
            });
    })
})
</script>



<template>
    <div>
        <nav class="navbar " style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo_header.png" alt="Logo" width="100" height="35"
                        class="d-inline-block align-text-top logo px-1 py-1">
                    UNIT RAWAT JALAN
                </a>
            </div>
        </nav>
        <div class="container mt-3">
            <div class="row">
                <div class="mb-3 col-4">
                    <label for="tgl_peresepan" class="form-label">Tanggal Peresepan</label>
                    <input type="date" class="form-control" id="tgl_peresepan" aria-describedby="emailHelp"
                        v-model="pilihTanggal" @change="filterItems">
                </div>
            </div>
            <div class="row flex-row-reverse">
                <div class="col-3">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="poli">Pilih Poli</label>
                        <select class="form-select" id="poli" name="poli">
                            <option selected disabled>Nomor...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="container px-5">
            <div class="row">
                <div class="col">
                    <table id="myTable" class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>TGL REGISTRASI</th>
                                <th>NAMA PASIEN</th>
                                <th>NO RM</th>
                                <th>DOKTER</th>
                                <th>PILIHAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filterItems()">
                                <td>{{ item.tgl_registrasi }}</td>
                                <td>{{ item.nm_pasien }}</td>
                                <td>{{ item.no_rkm_medis }}</td>
                                <td>{{ item.nm_dokter }}</td>
                                <td><button type="button">test</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
