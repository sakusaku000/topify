import { createStore } from 'vuex'

import SpotifyWebApi from 'spotify-web-api-node';
const api = new SpotifyWebApi({
    clientId:process.env.VUE_APP_SPOTIFY_CLIENT_ID
});

import axios from 'axios';

export default createStore({
    state: {
        app_ready:false,
        splash:{
            show:false,
            redirect:""
        },
        error:{
            show:false,
            message:""
        },
        user:null,
        top:{
            tracks:[],
            artists:[]
        },
        recents:[],
        time_range:"medium_term"
    },
    mutations: {
        setReady(state, ready) {
            state.app_ready = ready;
        },
        showSplash(state, url) {
            state.splash.show = true;
            state.splash.redirect = url;
        },
        showError(state, error) {
            state.error.show = true;
            state.error.message = error;
        },
        setUser(state, user) {
            state.user = user;
        },
        setTopTracks(state, tracks) {
            state.top.tracks = tracks;
        },
        setTopArtists(state, artists) {
            state.top.artists = artists;
        },
        setRecentTracks(state, tracks) {
            state.recents = tracks;
        },
        setTimeRange(state, time_range) {
            state.time_range = time_range;
        },
        setAccessToken(state, token) {
            api.setAccessToken(token);
        }
    },
    getters:{
        timeRange(state) {
            return state.time_range;
        }
    },
    actions:{
        // -- authenticate with API
        async authenticate(state, code) {
            try {
                // -- Fetch tokens
                const tokenRequest = await axios.post("/api/token", {code:code});
                
                // -- Set tokens in local / session storage
                localStorage.setItem("refresh", tokenRequest.data.tokens.refresh);
                sessionStorage.setItem("access", tokenRequest.data.tokens.access);
                
                // -- Set access token in Spotify API
                api.setAccessToken(tokenRequest.data.tokens.access);
                // -- Set refresh token in Spotify API
                api.setRefreshToken(tokenRequest.data.tokens.refresh);

                // -- Fetch user
                state.dispatch("fetchUser");
                state.dispatch("fetchSongData");
                // -- Remove code from URL
                window.history.replaceState({}, "Topify", "/");
            } catch (err) {
                state.commit("showError", "failed to authenticate spotify account");
            };
        },
        // -- Refresh tokens
        async refresh(state, background) {
            try {
                // -- Fetch new access token
                const refreshRequest = await axios.post("/api/token/refresh", {token:localStorage.getItem("refresh")});

                // -- Set new access token
                sessionStorage.setItem("access", refreshRequest.data.token);
                // -- Set new access token in Spotify API
                api.setAccessToken(refreshRequest.data.token);

                // -- if not running in background, fetch user
                if (!background) {
                    state.dispatch("fetchUser");
                    state.dispatch("fetchSongData");
                }
            } catch (err) {
                state.commit("setReady", false);
                state.commit("showError", "lost connection with spotify api");
            };
        },
        // -- Background token refreshing (every 30 minutes)
        backgroundTokenRefresh(state) {
            setInterval(() => {
                state.dispatch("refresh", true);
            }, 1800000);
        },
        // -- Fetch user
        async fetchUser(state) {
            try {
                const user = await api.getMe();
                console.log(user);
                state.commit("setUser", user.body);
                state.commit("setReady", true);
            } catch (err) {
                state.commit("setReady", false);
                state.commit("showError", "lost connection with spotify api");
            };
        },
        // -- Fetch song data
        async fetchSongData(state, time_range) {
            // -- set time range
            if (time_range) state.commit("setTimeRange", time_range);
            
            try {
                // -- get time range
                const fetchedTimeRange = state.getters.timeRange;
                console.log(fetchedTimeRange);
                // -- get top song data
                const topTracks = await api.getMyTopTracks({time_range:fetchedTimeRange, limit:50});
                const topArtists = await api.getMyTopArtists({time_range:fetchedTimeRange, limit:50});
                // -- get recent songs data
                const recentTracks = await api.getMyRecentlyPlayedTracks({limit:50});

                // -- commit to state
                state.commit("setTopTracks", topTracks.body.items);
                state.commit("setTopArtists", topArtists.body.items);
                state.commit("setRecentTracks", recentTracks.body.items);
            } catch (err) {
                state.commit("setReady", false);
                state.commit("showError", "lost connection with spotify api");
            };
        }
    }
})
