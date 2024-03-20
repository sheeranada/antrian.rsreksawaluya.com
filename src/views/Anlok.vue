<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import api from '../api/endpoint'

const anlok = ref([])

const fetchData = async () => {
    try {
        const response = await axios.get(api.defaults.baseURL + 'api/admisi/last-ticket-print');
        anlok.value = response.data;
    } catch (error) {
        console.log('rungkad:', error);
    }
}
onMounted(() => {
    setInterval(fetchData, 5000);
})
</script>

<template>
    <div>
        <h1>halaman anlok</h1>
        <p>{{ anlok.nomor }}</p>
    </div>
</template>
