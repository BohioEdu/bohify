<template>
<div class="Playlist">
  <!-- <PlaylistBanner v-bind: {...props} />
  <ListOfSongs v-bind: Songs= {props.Songs}/> -->
</div>
</template>

<script >
// import PlaylistBanner from "@/components/layout/PlaylistBanner.vue";
// import ListOfSongs from './layout/ListOfSongs.vue';
export default ({
  props:{
    img: String,
    name: String,
    author: String,
    description: String,
    songs:Number,
    likes: Number,
    time: String,
    Songs:[]
  }
  ,
  components: {
    // PlaylistBanner,
    // ListOfSongs,
  }
})
</script>

<style>

</style>