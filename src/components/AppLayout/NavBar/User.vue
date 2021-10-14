<template>
    <img :src="$store.state.user.images[0].url" class="rounded-full w-10 cursor-pointer" @click="$refs.settingsModal.visible = true">
    <SettingsModal ref="settingsModal"/>
</template>

<script>
import SettingsModal from './SettingsModal.vue';

export default {
    name:"User",
    components:{
        SettingsModal
    }
}
</script>