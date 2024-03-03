<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint';
import axios from 'axios'

const ralan = ref([]);

const fetchDataRalan = async () => {
    await api.get('/api/ralan')
        .then(response => {
            new DataTable('#myTable', {
                layout: {
                    top1: 'searchBuilder'
                },
                data: response.data,
                columns: [
                    { data: 'tgl_registrasi' },
                    { data: 'nm_pasien' },
                    { data: 'no_rkm_medis' },
                    { data: 'nm_dokter' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-secondary btn-detail"><i class="fas fa-play"></i></button>';
                        }
                    }
                ]
            })
        })
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
    $(document).on('click', '.btn-detail', function () {
        // Mengambil data nm_pasien (kolom kedua)
        var nmPasien = $(this).closest('tr').find('td:eq(1)').text();

        // Mengambil data nm_dokter (kolom keempat)
        var nmDokter = $(this).closest('tr').find('td:eq(3)').text();

        const data = {
            "poli": selectedPoli,
            "nm_pasien": nmPasien,
            "dokter": nmDokter,
        }
        fetch('https://api-antrian.rsreksawaluya.com.dev/api/antri-ralan', {
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
    });
})
</script>



<template>
    <div>
        <h1>ini halaman poli</h1>
        <div class="container">
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

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
