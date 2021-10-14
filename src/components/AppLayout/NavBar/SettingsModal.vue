<template>
    <teleport to="body">
        <div class="fixed top-0 bottom-0 left-0 right-0" v-if="visible" @click="close"></div>
        <transition name="fade">
            <div class="fixed top-20 md:top-24 right-5 md:right-10 w-72 bg-trueGray-800 rounded-xl ring-1 ring-trueGray-400 p-1 flex flex-col gap-1" v-if="visible">
                <SMButton @click="changeTimeRange('short_term')" :active="($store.state.time_range === 'short_term') ? true : false">View short term data</SMButton>
                <SMButton @click="changeTimeRange('medium_term')" :active="($store.state.time_range === 'medium_term') ? true : false">View medium term data</SMButton>
                <SMButton @click="changeTimeRange('long_term')" :active="($store.state.time_range === 'long_term') ? true : false">View all-time data</SMButton>
                <SMButton @click="signOut"><span class="material-icons mr-3">logout</span> Sign out</SMButton>
            </div>
        </transition>
    </teleport>
</template>

<script>
import SMButton from './SettingsModal/Button.vue';

export default {
    name:"SettingsModal",
    data() {
        return {
            visible:false
        }
    },
    components:{
        SMButton
    },
    methods:{
        close() {
            this.visible = false;
        },
        changeTimeRange(time_range) {
            if (time_range === this.$store.state.time_range) return this.close();
            this.$store.dispatch("fetchSongData", time_range);
            return this.close();
        },
        signOut() {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    }
}
</script>

<style scoped>
    .fade-enter-from, .fade-leave-to {
        transition-duration:0.2s;
        opacity:0;
    }
    .fade-enter-to, .fade-leave-from {
        transition-duration:0.2s;
        opacity:1;
    }
</style>