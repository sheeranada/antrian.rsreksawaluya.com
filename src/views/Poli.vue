<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint';


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
                            return '<button type="button" class="btn btn-primary btn-detail">Detail</button>';
                        }
                    }
                ]
            })
        })
}
onMounted(() => {
    fetchDataRalan()
    // Event listener untuk tombol Detail
    $(document).on('click', '.btn-detail', function () {
        // Mengambil data nm_pasien (kolom kedua)
        var nmPasien = $(this).closest('tr').find('td:eq(1)').text();

        // Mengambil data nm_dokter (kolom keempat)
        var nmDokter = $(this).closest('tr').find('td:eq(3)').text();

        // Menampilkan data dengan alert
        alert("Nama Pasien: " + nmPasien + "\nNama Dokter: " + nmDokter);
    });
})

</script>

<template>
    <div>
        <h1>ini halaman poli</h1>
        <table id="myTable" class="table table-striped table-hover table-bordered table-responsive-sm">
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
</template>
