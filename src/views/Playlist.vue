<template>
  <div>
    <PlaylistBanner  v-bind:Banner="Banner" ></PlaylistBanner>
    <ListOfSongs v-bind:Songs = Songs v-bind:imgs ="imgs" ></ListOfSongs>
  </div>
</template>

<script>
import PlaylistBanner from "@/components/layout/PlaylistBanner.vue";
import ListOfSongs from '@/components/layout/ListOfSongs.vue';
import heart from '@/assets/icons/Heart.svg'

export default ({
  
  data(){
    const Songs = [{
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia",
      }, {
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia"
      }
      , {
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia"
      }
      , {
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia"
      }
      , {
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia"
      }
      , {
        imgSrc: heart,
        name:"La cucaracha",
        actist: "El pepe",
        date: "ayer",
        time:"2:00",
        album: "La real cumbia"
      }]
    

    return{
      Songs : Songs,
      Banner :{
      img: heart, 
      name: "Team cucaracha",
      author: "El pepe",
      description: "un temazo vacano con un flow aceleraisimo",
      songs: Songs.length,
      likes: 5,
      time: "3h",
      },

    }
  },
  components: {
    PlaylistBanner,
    ListOfSongs,
  }
})
</script>