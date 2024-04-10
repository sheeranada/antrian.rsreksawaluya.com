<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const tampilkanYgDipanggil = ref({})
const resepNonRacik = ref([])
const resepRacik = ref([])
const currentPage = ref(1)

const waktuSekarang = ref(new Date().toLocaleString())

const updateJam = () => {
    waktuSekarang.value = new Date().toLocaleString()
}
const fetchTampilkanYgDipanggil = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-dipanggil-anfar')
        tampilkanYgDipanggil.value = response.data
    } catch (error) {
        console.log('Uppps:', error)
    }
}
// const fetchNonRacik = async () => {
//     try {
//         const response = await api.get('/api/farmasi/pasien-nonracik-anfar?page=2')
//         resepNonRacik.value = response.data
//     } catch (error) {
//         console.log('Loooroooo atiku:', error)
//     }
// }
const fetchNonRacik = async () => {
    try {
        const response = await api.get(`/api/farmasi/pasien-nonracik-anfar?page=${currentPage.value}`) // Menggunakan currentPage
        resepNonRacik.value = response.data
    } catch (error) {
        console.log('Loooroooo atiku:', error)
    }
}
const fetchRacik = async () => {
    try {
        const response = await api.get(`/api/farmasi/pasien-obatracik-anfar?page=${currentPage.value}`)
        resepRacik.value = response.data
    } catch (error) {
        console.log('haduuuh:', error)
    }
}
// const fetchRacik = async () => {
//     try {
//         const response = await api.get('/api/farmasi/pasien-obatracik-anfar')
//         resepRacik.value = response.data
//     } catch (error) {
//         console.log('haduuuh:', error)
//     }
// }

onMounted(() => {
    fetchTampilkanYgDipanggil()
    fetchNonRacik()
    fetchRacik()
    setInterval(() => {
        fetchTampilkanYgDipanggil()
        fetchNonRacik()
        fetchRacik()
    }, 10000)
    setInterval(() => {
        updateJam()
    }, 1000)
    setInterval(() => {
        // Memperbarui nomor halaman setiap 5 detik
        currentPage.value = currentPage.value >= 20 ? 1 : currentPage.value + 1
    }, 5000)
})
</script>

<template>
    <div class="main"><!-- Start: HEADER -->
        <header class="mt-3 mb-3">
            <div class="row d-xxl-flex justify-content-xxl-center align-items-xxl-center" id="header">
                <div class="col-md-7 col-xxl-7">
                    <h1 style="color: var(--bs-body-bg);">ANTRIAN FARMASI</h1>
                </div>
                <div class="col-md-5 col-xxl-5">
                    <h4 class="jam">{{ waktuSekarang }}</h4>
                </div>
            </div>
        </header><!-- End: HEADER --><!-- Start: KONTEN -->
        <section class="mb-3 mt-5" style="padding-right: 30px;padding-left: 30px;">
            <div class="row" style="height: 496px;"><!-- Start: RESEP -->
                <div class="col-md-7 col-xxl-7">
                    <div class="row" id="resep">
                        <div class="col">
                            <div class="card" id="box-resep">
                                <div class="card-body">
                                    <h5 class="card-header " id="teks-resep" style="text-align: center;">RESEP OBAT
                                        NON-RACIK
                                        DILAYANI</h5>
                                    <ul class="font-monospace resep-list" id="teks-resep">
                                        <li v-for="pasien in resepNonRacik.data">
                                            <b>{{ pasien.nm_pasien }}</b>
                                            <p>NO RAWAT : {{ pasien.no_rawat }}</p>
                                        </li>
                                    </ul>
                                    <!-- <ul class="font-monospace resep-list" id="teks-resep" v-for="data in resepNonRacik">
                                        <li><b>{{ data.nm_pasien }}</b>
                                            <p>NO RAWAT :{{ data.no_rawat }}</p>
                                        </li>
                                    </ul> -->
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" id="box-resep">
                                <div class="card-body">
                                    <h5 class="card-header" id="teks-resep" style="text-align: center;">RESEP OBAT RACIK
                                        DILAYANI</h5>
                                    <ul class="font-monospace resep-list" id="teks-resep">
                                        <li v-for="pasien in resepRacik.data">
                                            <b>{{ pasien.nm_pasien }}</b>
                                            <p>NO RAWAT : {{ pasien.no_rawat }}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End: RESEP --><!-- Start: VIDEO -->
                <div class="col-md-5 col-xxl-5 d-xxl-flex justify-content-xxl-center align-items-xxl-center video">
                    <iframe allowfullscreen="" frameborder="0"
                        src="https://www.youtube.com/embed/skhVx1yeXKc?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=skhVx1yeXKc&amp;controls=0"
                        width="560" height="315" style="height: 100%;width: 100%;"></iframe>
                </div><!-- End: VIDEO -->
            </div>
        </section><!-- End: KONTEN --><!-- Start: KONTEN 2 -->
        <section style="padding-left: 30px;">
            <div class="row" style="height: 179px;"><!-- Start: PASIEN DIPANGGIL -->
                <div class="col-md-7 col-xxl-7" style="padding-right: 26px;">
                    <div class="card" id="box-pasien">
                        <div class="card-header">
                            <h4 class="text-pasien">PASIEN ATAS NAMA :</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="text-pasien">{{ tampilkanYgDipanggil.nm_pasien }}</h1>
                        </div>
                        <div class="card-footer">
                            <h4 class="text-pasien">HARAP MENUJU KE LOKET FARMASI</h4>
                        </div>
                    </div>
                </div><!-- End: PASIEN DIPANGGIL --><!-- Start: RS -->
                <div class="col-md-5 col-xxl-5 d-xxl-flex flex-column justify-content-xxl-center align-items-xxl-center "
                    id="block-rs">
                    <img class="logo" src="/src/assets/display_farmasi/img/logo.jpg">
                    <h1 class="rs">RS REKSA WALUYA</h1>
                    <p class="motto">KAMI MEMBERI PELAYANAN TERBAIK</p>
                </div><!-- End: RS -->
            </div>
        </section><!-- End: KONTEN 2 -->
    </div>
</template>

<style scoped></style>