<template>    
    <a :href="track.external_urls.spotify" target="_blank" v-if="track">
        <div class="flex items-center gap-5 select-none hover:bg-green-300 cursor-pointer p-2 rounded-xl duration-200">
            <img :src="track.album.images[0].url" class="rounded-xl w-32 md:w-40">
            <div>
                <h1 class="font-semibold text-xl md:text-3xl">{{track.name}}</h1>
                <h2 class="md:text-xl">{{track.artists[0].name}}</h2>
                <h3>from {{track.album.name}}</h3>
            </div>
        </div>
    </a>
    <div v-else>
        <h1 class="ml-2">You haven't been listening to any tracks recently</h1>
    </div>
    <SeeMoreButton colour="green" @click="$router.push('/toptracks')" v-if="track"/>
</template>

<script>
import SeeMoreButton from './SeeMore.vue';

export default {
    name:"FavouriteTrack",
    components:{
        SeeMoreButton
    },
    props:{
        track:Object
    }
}
</script>