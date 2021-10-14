<template>
    <div>
        <PageTitle>hello, {{$store.state.user.display_name}}</PageTitle>

        <div class="grid lg:grid-cols-2">
            <Card bg="green" text="text-gray-900">
                <h1 class="text-3xl font-black ml-2 mb-3 select-none">favourite track</h1>
                <FavouriteTrack :track="$store.state.top.tracks[0]"/>
            </Card>

            <Card bg="blue" text="text-gray-900">
                <h1 class="text-3xl font-black ml-2 mb-3 select-none">favourite artist</h1>
                <FavouriteArtist :artist="$store.state.top.artists[0]"/>
                <!-- <SeeMoreButton colour="blue" @click="$router.push('/topartists')"/> -->
            </Card>
        </div>

        <Card bg="red" text="text-gray-900">
            <h1 class="text-3xl font-black ml-2 mb-3 select-none">recently played tracks</h1>
            <div v-if="$store.state.recents.length >= 1">
                <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <RecentlyPlayedTrack v-for="track in $store.state.recents.slice(0, 6)" :key="track.track.id" :track="track"/>
                </div>
                <SeeMoreButton colour="red" @click="$router.push('/recents')"/>
            </div>
            <div v-else>
                <h1 class="ml-2">You haven't been listening to any tracks recently</h1>
            </div>
        </Card>
    </div>
</template>

<script>
import PageTitle from '../components/PageLayout/PageTitle.vue';
import Card from '../components/PageLayout/Card.vue';

import FavouriteTrack from '../components/Home/FavouriteTrack.vue';
import FavouriteArtist from '../components/Home/FavouriteArtist.vue';
import RecentlyPlayedTrack from '../components/Home/RecentlyPlayedTrack.vue';
import SeeMoreButton from '../components/Home/SeeMore.vue';

export default {
    name:"HomeView",
    components:{
        PageTitle,
        Card,
        FavouriteTrack,
        FavouriteArtist,
        RecentlyPlayedTrack,
        SeeMoreButton
    }
}
</script>