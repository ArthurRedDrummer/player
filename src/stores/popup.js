import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popupStore', () => {
    const title = ref('Some title');
    const buttons = ref(null);
    const isActive = ref(false);

    const data = computed(() => {
        return {
            title: title.value,
            buttons: buttons.value
        }
    });

    const isPopupActive = computed(() => {
        return isActive.value;
    });

    const togglePopup = () => {
        isActive.value = !isActive.value;
    }

    return {
        data,
        isPopupActive,
        togglePopup
    }
});
