<template>
    <div class="bg-trueGray-900 text-gray-50 h-screen overflow-y-auto">
        <AppLayout v-if="$store.state.app_ready && $store.state.user"/>
        <Splash v-if="$store.state.splash.show" :redirect_url="$store.state.splash.redirect"/>
        <ErrorScreen v-if="$store.state.error.show" :error="$store.state.error.message"/>
    </div>
</template>

<script>
import AppLayout from './components/AppLayout/main.vue';
import Splash from './components/Splash/main.vue';
import ErrorScreen from './components/Error/main.vue';

import uniqid from 'uniqid';

export default {
    name:"App",
    components:{
        AppLayout,
        Splash,
        ErrorScreen
    },
    watch:{
        $route(to, from) {
            if (to.name === "Home") {
                document.title = "Topify";
            } else {
                document.title = `${to.name} - Topify`;
            }
        }
    },
    created() {
        // -- get URL parameters
        const params = new URLSearchParams(window.location.search);

        // -- Check for auth code
        if (params.get("code")) {
            this.$store.dispatch("authenticate", params.get("code"));
        } else if (params.get("error")) {
            // -- Set error message
            this.$store.commit("showError", params.get("error"));
        } else {
            // -- check for tokens
            if (sessionStorage.getItem("access")) {
                this.$store.commit("setAccessToken", sessionStorage.getItem("access"));
                this.$store.dispatch("fetchUser", true);
                this.$store.dispatch("fetchSongData");
            } else if (localStorage.getItem("refresh")) {
                this.$store.dispatch("refresh");
            } else {
                // -- Generate a auth redirect URL
                this.$store.commit("showSplash", `/api/redirect`);
            };
        };

        // -- Determine if no tokens are available
        // If no refresh token, try to authenticate
        // if (!localStorage.getItem("refresh")) return this.authenticate();
        // If no access token, attempt to refresh token
        // if (!sessionStorage.getItem("access")) return this.refresh();

        // -- If tokens are available, attempt to retrieve user information
        // return this.getUser();
    }
}
</script>