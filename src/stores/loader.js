import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loaderStore', () => {
    const loading = ref(true);

    const isLoading = computed(() => loading.value);

    const showLoader = () => {
        loading.value = true;
    }

    const hideLoader = () => {
        loading.value = false;
    }

    return {
        isLoading,
        showLoader,
        hideLoader
    }
});