<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const anpol = ref({})
const synth = window.speechSynthesis;

// Menyimpan data terakhir untuk membandingkan dengan data baru
let lastData = null;

const fetchAnpol = async () => {
    try {
        const response = await api.get('/api/anpol');
        const newData = response.data;

        // Cek apakah data baru berbeda dengan data sebelumnya
        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
            anpol.value = newData;
            speakData(newData);
            lastData = newData; // Perbarui data terakhir
        }
    } catch (error) {
        console.log("Rungkad", error)
    }
}

const speakData = (data) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "id-ID";
    utterance.rate = 0.95;

    // Teks untuk pengucapan
    let textToSpeak = `Pasien atas nama ${data.nm_pasien}. `;
    textToSpeak += `harap menuju poli nomor. ${data.poli}. `;

    // Menghentikan pengucapan setelah selesai
    utterance.onend = () => {
        synth.cancel();
    };

    // Set teks ke utterance dan mulai pengucapan
    utterance.text = textToSpeak;
    synth.speak(utterance);
}

onMounted(() => {
    fetchAnpol(); // Panggil saat komponen dimuat

    // Setup polling untuk pembaruan data setiap 5.5 detik
    setInterval(fetchAnpol, 2000);
})
</script>

<template>
    <div>
        <h1>ini halaman anpol</h1>
        <p>{{ anpol.nm_pasien }}</p>
        <p>{{ anpol.dokter }}</p>
        <p>{{ anpol.poli }}</p>
    </div>
</template>
