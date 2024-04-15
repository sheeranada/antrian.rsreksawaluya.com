<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const cetakTerakhir = ref([])
const terakhirDilayani = ref([])
const terakhirDilayani1 = ref([])
const selectedLoket = ref(null)

const fetchCetakTerakhir = async () => {
    try {
        const response = await api.get('api/admisi/last-ticket-print')
        cetakTerakhir.value = response.data
    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(fetchCetakTerakhir, 5000);
        } else {
            console.log(error);
        }
    }
}
const fetchTerakhirDilayani = async () => {
    try {
        const response = await api.get('api/admisi/last-entry')
        terakhirDilayani.value = response.data

    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(fetchTerakhirDilayani, 5000);
        } else {
            console.log(error);
        }
    }
}
const fetchTerakhirDilayani1 = async () => {
    try {
        const response = await api.get('api/admisi/last-entry1');
        const nomorTerakhir = parseInt(response.data.antrian_nomor);
        if (!isNaN(nomorTerakhir)) {
            terakhirDilayani1.value = nomorTerakhir + 1;
        } else {
            console.log('Response data tidak berisi nomor yang valid');
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(fetchTerakhirDilayani1, 5000);
        } else {
            console.log(error);
        }
    }
}
const panggilAntrian = async () => {
    try {
        // Pastikan selectedLoket memiliki nilai
        if (!selectedLoket.value) {
            throw new Error('Pilih nomor loket terlebih dahulu');
        }

        const data = {
            loket_nomor: selectedLoket.value,
            antrian_nomor: terakhirDilayani1.value
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(api.defaults.baseURL + 'api/admisi/antrianadmisi', requestOptions)

        if (!response.ok) {
            throw new Error('Gagal mengirim data');
        }

        console.log('Data berhasil terkirim');
    } catch (error) {
        console.log(error);
        throw new Error('Gagal bosku');
    }
}

onMounted(() => {
    fetchCetakTerakhir()
    fetchTerakhirDilayani()
    fetchTerakhirDilayani1()
    setInterval(() => {
        fetchCetakTerakhir()
        fetchTerakhirDilayani()
        fetchTerakhirDilayani1()
    }, 5000)
})


</script>
<template>
    <div class="dasaran"><!-- Start: 1 Row 1 Column -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" id="headercuy">
                    <p class="admisi">ADMISI CUY</p>
                </div>
            </div>
        </div><!-- End: 1 Row 1 Column --><!-- Start: 1 Row 2 Columns -->
        <div class="container-fluid mt-2">
            <div class="row">
                <div class="col-md-6 d-flex d-xxl-flex flex-column justify-content-xxl-center align-items-xxl-center"
                    id="kotak-wasiat">
                    <div class="card bg-secondary w-100">
                        <div class="card-body text-center">
                            <h6 class="card-title">NOMOR TERAKHIR DIPANGGIL</h6>
                            <p>{{ terakhirDilayani.antrian_nomor }}</p>
                        </div>
                    </div>
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h6 class="card-title">NOMOR TERAKHIR DICETAK</h6>
                            <p>{{ cetakTerakhir.nomor }}</p>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">Loket berapa ?</label>
                                <select class="form-select" id="inputGroupSelect01" v-model="selectedLoket">
                                    <option selected disabled>Pilih cuy</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="col-8 text-center">
                                <div class="form-floating">
                                    <input type="number" class="form-control" id="terakhirDilayani"
                                        placeholder="name@example.com" v-model="terakhirDilayani1">
                                    <label for="terakhirDilayani">Nomor Antrian</label>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-end">
                                <button @click="panggilAntrian" type="button" class="panggil btn btn-info "><i
                                        class="fas fa-play"></i>
                                    Panggil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- End: 1 Row 2 Columns -->
    </div>
</template>

<style>
.panggil {
    height: 55px;
}

#kotak-wasiat {
    background-color: chocolate;
    border-radius: 15px;
    margin-left: 20px;
}
</style>