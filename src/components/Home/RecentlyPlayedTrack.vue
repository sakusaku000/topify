<template>
    <a href="" target="_blank">
        <div class="rounded-xl hover:bg-red-300 duration-200 cursor-pointer p-2 flex items-center gap-3 select-none overflow-hidden">
            <img :src="track.track.album.images[0].url" class="rounded-lg w-14 md:w-16">
            <div>
                <h1 class="font-semibold text-lg -mb-1 truncate">{{track.track.name}}</h1>
                <h2>{{track.track.artists[0].name}}</h2>
                <h3 class="text-xs text-gray-800">{{timeDifference(new Date(), new Date(track.played_at))}}</h3>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    name:"RecentlyPlayedTrack",
    props:{
        track:Object
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