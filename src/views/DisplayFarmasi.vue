<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    namaPasien: String
})
</script>

<template>
    <div>
        <p>Nama Pasien: {{ namaPasien }}</p>
    </div>
</template>
