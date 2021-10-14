<template>
    <div>
        <PageTitle class="mb-7">{{$store.state.user.display_name}}'s top artists</PageTitle>

        <div class="grid lg:grid-cols-2">
            <Artist v-for="(artist, index) in $store.state.top.artists"  
            :key="index" 
            :position="index" 
            :line_1="artist.name" 
            :line_2="artist.genres[0]"
            :image="artist.images[0].url"
            :hrefLink="artist.external_urls.spotify"
            :showPosition="true"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageLayout/PageTitle.vue';
import Artist from '../components/ListLayout/Track.vue';

export default {
    name:"TopTracks",
    components:{
        PageTitle,
        Artist
    }
}
</script>