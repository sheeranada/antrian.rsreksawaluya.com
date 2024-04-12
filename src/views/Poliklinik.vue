<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const listRalan = ref([])
const items = ref([])
const pilihTanggal = ref('')
const pilihDokter = ref('')
const listDokter = ref([])
const poli = ref('')


const fetchListRalan = async () => {
    try {
        const response = await api.get('/api/ralan')
        items.value = response.data
        listDokter.value = [...new Set(response.data.map(item => item.nm_dokter))]
    } catch (error) {
        console.log('T_T: ', error)
    }
}
const filteredItems = () => {
    let filteredItems = items.value
    if (pilihTanggal.value) {
        filteredItems = filteredItems.filter(item => item.tgl_registrasi === pilihTanggal.value)
    }
    if (pilihDokter.value) {
        filteredItems = filteredItems.filter(item => item.nm_dokter === pilihDokter.value)
    }
    return filteredItems

}

const kirimData = async (nm_pasien, nm_dokter, poli) => {
    try {
        const response = await fetch(api.defaults.baseURL + 'api/antri-ralan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nm_pasien: nm_pasien,
                dokter: nm_dokter,
                poli: poli
            })
        });

        // Menggunakan await untuk menunggu respon dari fetch
        const responseData = await response.json();

        // Lakukan sesuatu dengan respon jika perlu
        console.log(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}
onMounted(() => {
    fetchListRalan()
    setInterval(fetchListRalan, 3500)
})
</script>

<template>
    <div>
        <header>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <a href="" class="navbar-brand h1">
                        <img src="/src/assets/display_farmasi/img/logo.jpg" alt="" srcset=""
                            style="width: auto; height: 50px;">
                        RS REKSA WALUYA</a>
                </div>
            </nav>

            <h1 class="mt-5 text-center">ANTRIAN RAWAT JALAN</h1><br>
        </header>

        <main class="konten">
            <div class="container-fluid">
                <div class="row mt-5 px-5 d-flex justify-content-center align-items-center">
                    <div class="col-4">
                        <div class="form-floating">
                            <input type="date" class="form-control" id="tgl_registrasi" placeholder="name@example.com"
                                value="test@example.com" v-model="pilihTanggal" @change="filteredItems">
                            <label for="tgl_registrasi">Pilih Tanggal Registrasi</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-floating">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                                v-model="pilihDokter" @change="filteredItems">
                                <option selected value disabled>Dokter</option>
                                <!-- <option value="" v-for="nama in listDokter">{{ nama }}</option> -->
                                <option v-for="nama in listDokter" :key="nama" :value="nama">{{ nama }}</option>
                            </select>
                            <label for="floatingSelect">Pilih Dokter</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-floating">
                            <select class="form-select" id="poli" name="poli" v-model="poli">
                                <option selected disabled>Nomor...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <label for="floatingSelect">Pilih Poli</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col px-5">
                        <table
                            class="table table-bordered table-hover table-striped table-sm table-responsive text-center">
                            <thead>
                                <tr>
                                    <th>TANGGAL REGISTRASI</th>
                                    <th>NO RM</th>
                                    <th>NAMA PASIEN</th>
                                    <th>DOKTER</th>
                                    <th>PILIHAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in filteredItems()">
                                    <td>{{ item.tgl_registrasi }}</td>
                                    <td>{{ item.no_rkm_medis }}</td>
                                    <td>{{ item.nm_pasien }}</td>
                                    <td>{{ item.nm_dokter }}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                            @click="kirimData(item.nm_pasien, item.nm_dokter, poli)">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
