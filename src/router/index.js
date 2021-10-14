import { createRouter, createWebHistory } from 'vue-router'

// views
import Home from '../views/Home.vue'
import TopTracks from '../views/TopTracks.vue';
import TopArtists from '../views/TopArtists.vue';
import RecentTracks from '../views/RecentTracks.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/toptracks',
        name: 'Top Tracks',
        component: TopTracks
    },
    {
        path: '/topartists',
        name: 'Top Artists',
        component: TopArtists
    },
    {
        path: '/recents',
        name: 'Recent Tracks',
        component: RecentTracks
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
