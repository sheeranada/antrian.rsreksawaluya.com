<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const nomorDilayani = ref([])
const response1 = ref(null)
const response2 = ref(null)
const response3 = ref(null)
const response4 = ref(null)

const waktuSekarang = ref(new Date().toLocaleString())

const updateJam = () => {
    waktuSekarang.value = new Date().toLocaleString()
}

const synth = window.speechSynthesis;

let lastData = null;
// menampilkan data antrian yang dipanggil
const fetchProsesLoket1 = async () => {
    try {
        const res = await api.get('api/admisi/dilayani1')
        response1.value = res
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Terlalu banyak permintaan, atur backoff sebelum mencoba lagi
            setTimeout(fetchProsesLoket1, 5000); // Tunggu 5 detik sebelum mencoba lagi
        } else {
            console.log(error);
        }
    }
}
const fetchProsesLoket2 = async () => {
    try {
        const res = await api.get('api/admisi/dilayani2')
        response2.value = res
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Terlalu banyak permintaan, atur backoff sebelum mencoba lagi
            setTimeout(fetchProsesLoket2, 5000); // Tunggu 5 detik sebelum mencoba lagi
        } else {
            console.log(error);
        }
    }
}
const fetchProsesLoket3 = async () => {
    try {
        const res = await api.get('api/admisi/dilayani3')
        response3.value = res
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Terlalu banyak permintaan, atur backoff sebelum mencoba lagi
            setTimeout(fetchProsesLoket3, 5000); // Tunggu 5 detik sebelum mencoba lagi
        } else {
            console.log(error);
        }
    }
}
const fetchProsesLoket4 = async () => {
    try {
        const res = await api.get('api/admisi/dilayani4')
        response4.value = res
    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(fetchProsesLoket4, 5000);
        } else {
            console.log(error);
        }
    }
}

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
        if (error.response && error.response.status === 429) {
            setTimeout(fetchProsesLoket4, 5000);
        } else {
            console.log(error);
        }
    }
}

const speakData = (data) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "id-ID";
    utterance.rate = 0.85;

    let voices = [];
    speechSynthesis.onvoiceschanged = () => {
        voices = synth.getVoices();
        const desiredVoice = voices.find(voice => voice.gender === 'male');
        if (desiredVoice) {
            utterance.voice = desiredVoice;
        }
    };

    let textToSpeak = `Nomor Antrian ${data.antrian_nomor}... Harap menuju loket .. .${data.loket_nomor}`;

    utterance.onend = () => {
        synth.cancel();
    };

    utterance.text = textToSpeak;
    synth.speak(utterance);
}



onMounted(() => {
    setInterval(fetchData, 5000)
    fetchProsesLoket1()
    setInterval(() => {
        fetchProsesLoket1()
        fetchProsesLoket2()
        fetchProsesLoket3()
        fetchProsesLoket4()
    }, 7500)
    setInterval(() => {
        updateJam()
    }, 1000)
})
</script>

<template>
    <div class="hero">
        <header>
            <div class="row header">
                <div
                    class="col-md-1 col-xxl-1 d-xl-flex d-xxl-flex justify-content-xl-end align-items-xl-center justify-content-xxl-end align-items-xxl-center">
                    <img class="logo" src="/src/assets/display_farmasi/img/logo.jpg">
                </div>
                <div class="col-md-6 col-xxl-6">
                    <h1 style="color: var(--bs-body-bg);">RS REKSA WALUYA</h1>
                </div>
                <div class="col-md-5 col-xxl-5 d-xl-flex justify-content-xl-center align-items-xl-center">
                    <p class="jam">{{ waktuSekarang }}</p>
                </div>
            </div>
        </header>
        <!-- End: HEADER -->
        <!-- Start: KONTEN -->
        <article class="mt-3">
            <div class="row konten " style="padding-right: 50px;padding-left: 50px;">
                <!-- Start: VIDEO -->
                <div class="col-sm-6 col-md-7 col-xxl-7">
                    <iframe width="560" height="315" class="video"
                        src="https://www.youtube.com/embed/k_07e5Xwufo?si=XIOW3OjG7_wSPZFO&amp;controls=0&autoplay=1&mute=1&loop=1&playlist=k_07e5Xwufo"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>

                </div>
                <!-- <div class="col-sm-6 col-md-7 col-xxl-7"><iframe allowfullscreen="" frameborder="0"
                        src="https://www.youtube.com/embed/G8KdzZevn4Q?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=G8KdzZevn4Q&amp;controls=0"
                        class="video" width="560" height="315"></iframe></div> -->
                <!-- End: VIDEO -->
                <!-- Start: AREA PASIEN -->
                <div class="col-md-5 col-xxl-5">
                    <div class="row gap-2"><!-- Start: LOKET -->
                        <div class="col-12 antrian">
                            <div class="card px">
                                <div
                                    class="d-xl-flex d-xxl-flex justify-content-xl-center align-items-xl-start justify-content-xxl-center align-items-xxl-center card-body">
                                    <p class="loket-no">LOKET {{ nomorDilayani.loket_nomor }}</p>
                                </div>
                            </div>
                        </div><!-- End: LOKET --><!-- Start: ANTRIAN NOMOR -->
                        <div class="col-12 antrian">
                            <div class="card px">
                                <div
                                    class="d-xl-flex d-xxl-flex justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center card-body">
                                    <p class="antrian-nomor">{{ nomorDilayani.antrian_nomor ?
                                        nomorDilayani.antrian_nomor.toString().padStart(3, '0') : '' }}</p>
                                </div>
                            </div>
                        </div><!-- End: ANTRIAN NOMOR -->
                    </div>
                </div><!-- End: AREA PASIEN -->
            </div>
        </article><!-- End: KONTEN --><!-- Start: FOOTER -->
        <footer class="mt-3">
            <!-- Start: LOKET1 -->
            <div class="card kotak-antrian1 g-5">
                <div class="card-header1">
                    <span class="antrian-poli">LOKET 1</span>
                </div>
                <div class="card-body" v-if="response1">
                    <span class="nomor-loket">{{ response1.data.loket1 ? response1.data.loket1.toString().padStart(3,
                        '0') : '' }}</span>
                </div>
            </div>
            <!-- End: LOKET1 --><!-- Start: LOKET 2 -->
            <div class="card kotak-antrian1">
                <div class="card-header2">
                    <span class="antrian-poli">LOKET 2</span>
                </div>
                <div class="card-body" v-if="response2">
                    <span class="nomor-loket">{{ response2.data.loket2 ? response2.data.loket2.toString().padStart(3,
                        '0') : '' }}</span>
                </div>
            </div><!-- End: LOKET 2 --><!-- Start: LOKET 3 -->
            <div class="card kotak-antrian1">
                <div class="card-header3">
                    <span class="antrian-poli">LOKET 3</span>
                </div>
                <div class="card-body" v-if="response3">
                    <span class="nomor-loket">{{ response3.data.loket3 ? response3.data.loket3.toString().padStart(3,
                        '0') : '' }}</span>
                </div>
            </div><!-- End: LOKET 3 --><!-- Start: LOKET 4 -->
            <div class="card kotak-antrian1">
                <div class="card-header4">
                    <span class="antrian-poli">LOKET 4</span>
                </div>
                <div class="card-body" v-if="response4">
                    <span class="nomor-loket">{{ response4.data.loket4 ? response4.data.loket4.toString().padStart(3,
                        '0') : '' }}</span>
                </div>
            </div><!-- End: LOKET 4 -->
        </footer><!-- End: FOOTER -->
    </div>
</template>
<style scoped>
.hero {
    background: url("/src/assets/img/anpol.jpg") top / cover no-repeat;
    width: 100%;
    height: 100vh;
}
</style>