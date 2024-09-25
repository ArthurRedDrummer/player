<template>
    <div class="fixed top-0 left-0 h-full w-full flex justify-center items-center z-50 bg-black bg-opacity-50">
        <img class="h-10 w-10 animate-spin" :src="loaderIcon" />
    </div>
</template>

<script setup>
import loaderIcon from '@/assets/images/icons/loader.png'
</script>