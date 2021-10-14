<template>
    <a :href="artist.external_urls.spotify" target="_blank">
        <div class="m-2 xl:m-3 flex items-center gap-5 select-none cursor-pointer p-4 rounded-xl duration-200 bgHover" :style="`--bg:${bg_colour}; --bgh:${bg_colour_hover}; --text:${text_colour};`">
            <h1 class="text-2xl text-trueGray-500 font-semibold mx-2 lg:mx-3">1</h1>
            <img src="https://i.scdn.co/image/ab67616d0000b27348a03c11c71a265006e1b9e3" class="rounded-lg w-20 md:w-20">
            <div>
                <h1 class="font-bold text-xl">Twice</h1>
                <h2>k-pop</h2>
            </div>
        </div>
    </a>
</template>

<script>
import facm from 'fast-average-color';

export default {
    name:"ListArtist",
    data() {
        return {
            bg_colour:"#171717",
            bg_colour_hover:"#404040",
            text_colour:"#f9fafb"
        }
    },
    props:{
        artist:Object,
        position:Number,
        showPosition:Boolean
    },
    async mounted() {
        const fac = new facm();
        const image = "https://i.scdn.co/image/ab67616d0000b27348a03c11c71a265006e1b9e3";

        const colour = await fac.getColorAsync(image, {algorithm:"simple"});
        this.bg_colour = `${colour.hex}90`;
        this.bg_colour_hover = colour.hex;

        if (colour.isLight) this.text_colour = "#111827";
    }
}
</script>

<style scoped>
    .bgHover {
        background-color:var(--bg);
        transition-duration:200ms;
    }
    .bgHover:hover {
        background-color:var(--bgh);
        color:var(--text);
    }
</style>