<template>
    <div class="h-screen flex flex-col items-center text-center justify-center select-none">
        <div id="title">
            <h1 class="text-7xl font-black">topify</h1>
            <h2 class="text-2xl mt-3">by saku</h2>
        </div>

        <div id="info" class="mt-7">
            <p>
                topify lets you see all top tracks and artists you've been listening to recently on spotify<br>
                sign in with your spotify account to get started
            </p>
        </div>

        <button id="signin" @click="redirect" class="mt-7 p-2 hover:bg-green-500 duration-200 ring-1 ring-green-500 w-44 rounded-xl">
            sign in with spotify
        </button>
    </div>
</template>

<script>
export default {
    name:"Splash",
    props:{
        redirect_url:String
    },
    mounted() {
        this.$router.replace("/");
    },
    methods:{
        redirect() {
            window.location.replace(this.$props.redirect_url);
        }
    }
}
</script>