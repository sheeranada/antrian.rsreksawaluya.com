<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const nomorDilayani = ref([])
const synth = window.speechSynthesis;

let lastData = null;
// menampilkan data antrian yang dipanggil
const fetchData = async () => {
    try {
        const response = await api.get('api/admisi/last-entry');
        const newData = response.data;

        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
            nomorDilayani.value = newData
            speakData(newData)
            lastData = newData
        }
    } catch (error) {
        console.log('rungkad entek2an:', error);
    }
}
// 
// panggilan suara
const speakData = (data) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "id-ID";
    utterance.rate = 0.9

    let textToSpeak = `Nomor Antrian! ${data.antrian_nomor} .`;
    textToSpeak += `Harap menuju loket ${data.loket_nomor}`

    utterance.onend = () => {
        synth.cancel();
    };

    utterance.text = textToSpeak;
    synth.speak(utterance);
}
onMounted(() => {
    setInterval(fetchData, 5000)
})
</script>

<template>
    <div>
        <h1>ANTRIAN LOKET</h1>
        <p>antrian nomor {{ nomorDilayani.antrian_nomor }}</p>
        <p>di loket {{ nomorDilayani.loket_nomor }}</p>
    </div>
</template>
