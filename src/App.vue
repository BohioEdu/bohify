<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view/>
  <MusicPlayer />
</template>

<script>
import Navbar from "@/components/navbar/Navbar";
import MusicPlayer from "@/components/musicplayer/MusicPlayer.vue";
export default {
  components: {
    Navbar,
    MusicPlayer
  }
}
</script>


<style lang="scss">

</style>
