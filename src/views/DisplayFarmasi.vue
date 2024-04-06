<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const tampilkanYgDipanggil = ref({})
const resepNonRacik = ref([])
const resepRacik = ref([])

const fetchTampilkanYgDipanggil = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-dipanggil-anfar')
        tampilkanYgDipanggil.value = response.data
    } catch (error) {
        console.log('Uppps:', error)
    }
}
const fetchNonRacik = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-nonracik-anfar')
        resepNonRacik.value = response.data
    } catch (error) {
        console.log('Loooroooo atiku:', error)
    }
}
const fetchRacik = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-obatracik-anfar')
        resepRacik.value = response.data
    } catch (error) {
        console.log('haduuuh:', error)
    }
}
onMounted(() => {
    fetchTampilkanYgDipanggil()
    fetchNonRacik()
    fetchRacik()
    setInterval(() => {
        fetchTampilkanYgDipanggil()
        fetchNonRacik()
        fetchRacik()
    }, 3500)
})
</script>

<template>
    <div>
        <p>Nama Pasien: {{ tampilkanYgDipanggil.nm_pasien }}</p>

    </div>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <ul v-for="data in resepNonRacik">
                    <li><b>{{ data.nm_pasien }}</b></li>
                    <li>
                        No Rawat: {{ data.no_rawat }}
                    </li>
                </ul>
            </div>
            <div class="col-6">
                <ul v-for="data in resepRacik">
                    <li><b>{{ data.nm_pasien }}</b></li>
                    <li>
                        No Rawat: {{ data.no_rawat }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
