<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const listAnfar = ref([])
const items = ref([]);
const selectedDate = ref('')
const selectedStatus = ref('')
const tampilkanYgDipanggil = ref({})
const synth = window.speechSynthesis;
let lastData = null


const fetchListAnfar = async () => {
    try {
        const response = await api.get('/api/farmasi/anfar')
        items.value = response.data
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
const filterItems = () => {
    let filteredItems = items.value

    if (selectedDate.value) {
        filteredItems = filteredItems.filter(item => item.tgl_peresepan === selectedDate.value)
    }
    if (selectedStatus.value) {
        filteredItems = filteredItems.filter(item => item.status === selectedStatus.value)
    }
    return filteredItems
}
const panggilPasien = (nm_pasien) => {
    window.alert(`Memanggil pasien: ${nm_pasien}`)
    postNmPasien(nm_pasien)
}
const postNmPasien = async (nm_pasien) => {
    try {
        const response = await fetch(api.defaults.baseURL + 'api/farmasi/pasien-anfar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nm_pasien })
        })

        if (response.ok) {
            console.log('Data nm_pasien berhasil disimpan ke database')
        } else {
            throw new Error('Gagal menyimpan data nm_pasien ke database')
        }
    } catch (error) {
        console.error('Error posting data:', error)
    }
}
const fetchTampilkanYgDipanggil = async () => {
    try {
        const response = await api.get('/api/farmasi/pasien-dipanggil-anfar')
        const newData = response.data
        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
            tampilkanYgDipanggil.value = newData
            speakData(newData)
            lastData = newData
        }
    } catch (error) {
        console.log('rungkad:', error)
    }
}
const speakData = (data) => {
    const utterance = new SpeechSynthesisUtterance()
    utterance.lang = "id-ID"
    utterance.rate = 0.8

    let textToSpeak = `Pasien atas nama ${data.nm_pasien}. harap menuju ke loket farmasi`

    utterance.onend = () => {
        synth.cancel()
    }
    utterance.text = textToSpeak
    synth.speak(utterance)
}

onMounted(() => {
    fetchListAnfar()
    fetchTampilkanYgDipanggil()
    // setInterval(fetchListAnfar, 5000)
    setInterval(() => {
        fetchListAnfar()
        fetchTampilkanYgDipanggil()
    }, 2000)
})
</script>

<template>
    <div>
        <nav class="navbar " style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo_header.png" alt="Logo" width="100" height="35"
                        class="d-inline-block align-text-top logo px-1 py-1">
                    <b>UNIT FARMASI</b>
                </a>
            </div>
        </nav>
        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col d-flex flex-row-reverse text-center">
                    <div class="card text-bg-light border-secondary" style="max-width: 35rem;">
                        <div class="card-header">PASIEN DIPANGGIL</div>
                        <div class="card-body">
                            <p class="card-text">{{ tampilkanYgDipanggil.nm_pasien }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h1>ANTRIAN RESEP</h1>
                </div>
                <div class="mb-3 col-4">
                    <label for="tgl_peresepan" class="form-label">Tanggal Peresepan</label>
                    <input type="date" class="form-control" id="tgl_peresepan" aria-describedby="emailHelp"
                        v-model="selectedDate" @change="filterItems">
                </div>
                <div class="mb-3 col-4">
                    <label for="status" class="form-label">Status</label>
                    <select class="form-select" aria-label="Default select example" v-model="selectedStatus"
                        @change="filterItems">
                        <option selected disabled>Pilih status pasien</option>
                        <option value="ralan">Ralan</option>
                        <option value="ranap">Ranap</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <table id="myTable"
                        class="table table-striped table-hover table-bordered table-responsive table-sm">
                        <thead>
                            <tr>
                                <th>TGL PERESEPAN</th>
                                <th>NO RESEP</th>
                                <th>NAMA PASIEN</th>
                                <th>STATUS</th>
                                <th>PILIHAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filterItems()">
                                <td>{{ item.tgl_peresepan }}</td>
                                <td>{{ item.no_resep }}</td>
                                <td>{{ item.nm_pasien }}</td>
                                <td>{{ item.status }}</td>
                                <td>
                                    <button type="button" class="btn btn-info" @click="panggilPasien(item.nm_pasien)"><i
                                            class="fas fa-play"></i>
                                        Panggil
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
