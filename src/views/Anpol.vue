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
    <div class="head">
        <div
            class="d-flex justify-content-center align-items-center align-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center justify-content-xxl-center brand">
            <h1 style="text-shadow: 3px 1px 5px var(--bs-gray-900);color: var(--bs-gray-100);">RS REKSA WALUYA</h1>
        </div>
    </div><!-- Start: 1 Row 2 Columns -->
    <div class="container-fluid hero">
        <div class="row text-center d-flex d-xl-flex justify-content-xl-center align-items-xl-center">
            <div class="col-md-6" style="width: 397.5px;margin-top: 136px;">
                <div class="card" style="background: rgba(255,255,255,0.69);border-radius: 23px;">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 20px;">POLI NOMOR</h4>
                        <h4 class="card-title" style="font-size: 118px;">{{ anpol.poli }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-6" style="margin-top: 136px;">
                <div class="card" style="background: rgba(255,255,255,0.69);border-radius: 23px;">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 20px;">PASIEN ATAS NAMA</h4>
                        <h4 class="card-title" style="font-size: 35px;margin-top: 46px;">{{ anpol.nm_pasien }}</h4>
                        <p class="card-text" style="margin-top: 40px;"><b>DOKTER</b> : dr. {{ anpol.dokter }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- End: 1 Row 2 Columns -->
</template>

<style>
.hero {
    background-image: url('../assets/img/poli.jpg');
}
</style>