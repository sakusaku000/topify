<template>
    <div>
        <PageTitle class="mb-7">{{$store.state.user.display_name}}'s top tracks</PageTitle>

        <div class="grid lg:grid-cols-2">
            <Track v-for="(track, index) in $store.state.top.tracks" 
            :key="index" 
            :position="index" 
            :line_1="track.name" 
            :line_2="track.artists[0].name" 
            :line_3="`from ${track.album.name}`"
            :image="track.album.images[0].url"
            :hrefLink="track.external_urls.spotify"
            :showPosition="true"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageLayout/PageTitle.vue';
import Track from '../components/ListLayout/Track.vue';

export default {
    name:"TopTracks",
    components:{
        PageTitle,
        Track
    }
}
</script>