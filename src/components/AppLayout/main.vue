<template>
    <NavBar/>
    <div class="pb-5 md:px-10 mx-auto container">
        <router-view v-slot="{Component}">
            <transition name="page-tran" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
    name:"AppLayout",
    components:{
        NavBar
    }
}
</script>

<style scoped>
    .page-tran-enter-from, .page-tran-leave-to {
        transition-duration:0.2s;
        opacity:0;
    }
    .page-tran-enter-to, .page-tran-leave-from {
        transition-duration:0.2s;
        opacity:1;
    }
</style>