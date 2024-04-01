<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const tampilkanYgDipanggil = ref({})

const fetchTampilkanYgDipanggil = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-dipanggil-anfar')
        tampilkanYgDipanggil.value = response.data
    } catch (error) {
        console.log('Uppps:', error)
    }
}
onMounted(() => {
    fetchTampilkanYgDipanggil()
    setInterval(fetchTampilkanYgDipanggil, 3500)
})
</script>

<template>
    <div>
        <p>Nama Pasien: {{ tampilkanYgDipanggil.nm_pasien }}</p>
    </div>
</template>
