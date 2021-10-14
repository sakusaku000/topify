<template>
    <a :href="hrefLink" target="_blank">
        <div class="m-2 xl:m-3 flex items-center gap-5 select-none cursor-pointer p-4 rounded-xl duration-200 bgHover" :style="`--bg:${bg_colour}; --bgh:${bg_colour_hover}; --text:${text_colour};`">
            <h1 class="text-2xl font-semibold mx-2 mr-4 lg:ml-2 w-5" v-if="showPosition" :style="`color:${text_colour}`">{{position+1}}</h1>
            <img :src="image" class="rounded-lg w-20 h-20">
            <div>
                <h1 class="font-bold text-xl">{{line_1}}</h1>
                <h2>{{line_2}}</h2>
                <h3 class="text-sm">{{line_3}}</h3>
            </div>
        </div>
    </a>
</template>

<script>
import facm from 'fast-average-color';

export default {
    name:"ListTrack",
    data() {
        return {
            bg_colour:"#171717",
            bg_colour_hover:"#404040",
            text_colour:"#f9fafb"
        }
    },
    props:{
        line_1:String,
        line_2:String,
        line_3:String,
        image:String,
        hrefLink:String,
        position:Number,
        showPosition:Boolean
    },
    async mounted() {
        const fac = new facm();
        const image = this.$props.image;

        const colour = await fac.getColorAsync(image, {algorithm:"dominant"});
        this.bg_colour = `${colour.hex}CC`;
        this.bg_colour_hover = colour.hex;

        if (colour.isLight) this.text_colour = "#111827";
    }
}
</script>

<style scoped>
    .bgHover {
        background-color:var(--bg);
        color:var(--text);
        transition-duration:200ms;
    }
    .bgHover:hover {
        background-color:var(--bgh);
    }
</style>