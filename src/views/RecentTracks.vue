<template>
    <div>
        <PageTitle class="mb-7">{{$store.state.user.display_name}}'s recent tracks</PageTitle>

        <div class="grid lg:grid-cols-2">
            <Track v-for="(track, index) in $store.state.recents"
            :key="index" 
            :position="index" 
            :line_1="track.track.name" 
            :line_2="track.track.artists[0].name" 
            :line_3="timeDifference(new Date(), new Date(track.played_at))"
            :image="track.track.album.images[0].url"
            :hrefLink="track.track.external_urls.spotify"
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
    },
    methods:{
        timeDifference(current, previous) {
            const msPerMinute = 60 * 1000;
            const msPerHour = msPerMinute * 60;
            const msPerDay = msPerHour * 24;
            const msPerMonth = msPerDay * 30;
            const msPerYear = msPerDay * 365;

            let elapsed = current - previous;

            if (elapsed < msPerMinute) {
                return Math.round(elapsed/1000) + ' seconds ago';   
            }

            else if (elapsed < msPerHour) {
                return Math.round(elapsed/msPerMinute) + ' minutes ago';   
            }

            else if (elapsed < msPerDay ) {
                return Math.round(elapsed/msPerHour ) + ' hours ago';   
            }

            else if (elapsed < msPerMonth) {
                return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
            }

            else if (elapsed < msPerYear) {
                return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
            }

            else {
                return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
            }
        }
    }
}
</script>