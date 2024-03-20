<script setup>
import { ref, onMounted, onErrorCaptured } from 'vue'
import api from '../api/endpoint';

window.speak = (nmPasien) => {
    const utterance = new SpeechSynthesisUtterance(`Atas nama ${nmPasien}. harap menuju ke loket farmasi`);
    utterance.lang = "id-ID";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

const listAnfar = ref([]);
let dataTableInstance = null;

const initializeDataTable = (data) => {
    dataTableInstance = new DataTable('#myTable', {
        layout: {
            top1: 'searchBuilder'
        },
        data: data,
        columns: [
            { data: 'tgl_peresepan' },
            { data: 'no_resep' },
            { data: 'nm_pasien' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button type="button" class="btn btn-secondary btn-detail" onclick="speak('${row.nm_pasien}')"><i class="fas fa-play"></i></button>`;
                }
            },
        ]
    });
}

const updateDataTable = (data) => {
    dataTableInstance.clear().rows.add(data).draw();
}

const fetchListAnfar = async () => {
    try {
        const response = await api.get('api/farmasi/anfar');
        if (!dataTableInstance) {
            initializeDataTable(response.data);
        } else {
            updateDataTable(response.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(() => {
    fetchListAnfar();
    setInterval(fetchListAnfar, 5000);
})

onErrorCaptured((error) => {
    console.error('Error captured in component:', error);
    return false;
});
</script>





<template>
    <div>
        <nav class="navbar " style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo_header.png" alt="Logo" width="100" height="35"
                        class="d-inline-block align-text-top logo px-1 py-1">
                    <b>UNIT FARMASI</b>
                </a>
            </div>
        </nav>
        <div class="container px-5">
            <div class="row">
                <div class="col">
                    <table id="myTable" class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>TGL PERESEPAN</th>
                                <th>NO RESEP</th>
                                <th>NAMA PASIEN</th>
                                <th>STATUS</th>
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
