<template>
    <footer class="flex flex-col justify-start items-start gap-5 w-full p-4 fixed bottom-0 left-0 z-30">
        <div class="flex flex-row justify-start items-center gap-5 w-full">
            <player-progress />
        </div>
        <div class="flex flex-row justify-between items-center gap-5 w-full">
            <div class="flex flex-row justify-start items-center gap-5">
                <player-control />
                <player-volume />
                <player-time />
            </div>
        </div>
    </footer>
</template>

<script setup>
import PlayerProgress from '@/components/elements/PlayerProgress.vue'
import PlayerControl from '@/components/elements/PlayerControl.vue'
import PlayerTime from '@/components/elements/PlayerTime.vue'
import PlayerVolume from '@/components/elements/PlayerVolume.vue'
</script>