<template>
    <a :href="artist.external_urls.spotify" target="_blank" v-if="artist">
        <div class="flex items-center gap-5 select-none hover:bg-blue-300 cursor-pointer p-2 rounded-xl duration-200">
            <img :src="artist.images[0].url" class="rounded-xl w-32 md:w-40">
            <div>
                <h1 class="font-semibold text-xl md:text-3xl">{{artist.name}}</h1>
                <h2 class="md:text-xl">{{artist.genres[0]}}</h2>
            </div>
        </div>
    </a>
    <div v-else>
        <h1 class="ml-2">You haven't been listening to any artists recently</h1>
    </div>
    <SeeMoreButton colour="blue" @click="$router.push('/toptracks')" v-if="artist"/>
</template>

<script>
import SeeMoreButton from './SeeMore.vue';

export default {
    name:"FavouriteArtist",
    components:{
        SeeMoreButton
    },
    props:{
        artist:Object
    }
}
</script>