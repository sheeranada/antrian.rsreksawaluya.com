<template>
    <div v-if="response">
        <h1>{{ response.data.loket1 }}</h1>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/endpoint'

const response = ref(null)
const fetchLoket = async () => {
    try {
        const res = await api.get('api/admisi/dilayani1')
        response.value = res
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    fetchLoket()
})
</script>


<style lang="scss" scoped></style>