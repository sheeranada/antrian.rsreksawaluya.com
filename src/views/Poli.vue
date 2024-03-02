<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint';

const ralan = ref([]);

const fetchDataRalan = async () => {
    await api.get('/api/ralan')
        .then(response => {
            ralan.value = response.data
        })
}
onMounted(() => {
    fetchDataRalan()
})

</script>

<template>
    <div>
        <h1>ini halaman poli</h1>
        <table>
            <thead>
                <th>TGL REGISTRASI</th>
                <th>NAMA PASIEN</th>
                <th>NO RM</th>
                <th>DOKTER</th>
                <th>PILIHAN</th>
            </thead>
            <tbody>
                <tr v-for="data in ralan">
                    <td>{{ data.tgl_registrasi }}</td>
                    <td>{{ data.nm_pasien }}</td>
                    <td>{{ data.no_rkm_medis }}</td>
                    <td>{{ data.nm_dokter }}</td>
                    <td>
                        <button>test</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
