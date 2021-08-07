  <template>
   <div class="ListOfMusic">
     <div class="buttons">
       <div @click="play = !play"  class="play">
         <img  v-if="play == true" :src=" playIcon">
         <img v-else :src="pause">
       </div>
       <div @click="like = !like" class='heart'>  
         <img v-if="like == true" :src="heart">
         <img v-else :src="heart_green">

       </div>
       <div class="menu">
         <img :src ="menu">
       </div>
     </div>
     <div class="List">
       <div class="List__titles">
         <div class="title_1"><div># </div> Title</div>
         <div class="title">album</div>
         <div class="title">date added</div>
         <div class="title"><img :src="clock"></div>
       </div>
      <ul> 
        <li class="List__music" v-for="(Music, index) in Songs" v-bind:key = index>
         <div class="play" v-bind:key = index  @mouseenter="showPlay = true" @mouseleave="showPlay = false">
          <div class="play-btn" v-if="showPlay"><img :src="playIcon" ></div>
          <div class="play-btn" v-else >{{index + 1}}</div>
          <div v-bind:key = index class="description">
          <img v-bind:src ="Music.imgSrc">
          <div >
            <h3>{{Music.name}}</h3>
            <p>{{Music.actist}}</p>
          </div>
          </div>
        </div>
          <div class="album">
            {{Music.album}}
          </div>
          <div v-bind:key = index class="date">
            {{Music.date}}
          </div>
          <div v-bind:key = index class="time">
            {{Music.time}}
          </div>
        </li>
      </ul>
     </div>

   </div>
</template> 

<script >
import heart from "../../assets/icons/Heart.svg"
import heart_green from "../../assets/icons/Heart_green.svg"
import playIcon from '../../assets/icons/play.svg'
import clock  from '../../assets/icons/clock.svg'
import pause from '../../assets/icons/pause.svg'
import menu from '../../assets/icons/menu.svg'
export default ({
  data(){
    return{
      showPlay:false,
      play: true,
      like: true,
      heart,
      heart_green,
      playIcon,
      clock,
      pause,
      menu
    }
  },
  props: {
    Songs: [],
    imgs: []
  },
  
})
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;

}
  .ListOfMusic{
    background:linear-gradient(to bottom, #222222 0% , #121212 100% );

    .buttons{
      display:flex;
      align-items:center;
      margin-left: 1.5rem;
      height: 130px;
      & > *{
        margin: 0 1rem;
      }
      .play{
        width: 58px;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1DB954;
        border-radius:50%;
        overflow:hidden;
        img{
          height: 40px;
          width: 40px;
          filter: invert(100%);
        }     
      }
      .heart{
        width: 2rem;
        height: 2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
     
      .menu{
        width: 2rem;
        height: 2rem;
        img{
          width: 100%;
          height: 100%;
          filter: invert(50%);
        }
        &:hover{
          img{
            filter: invert(80%);
          }
        }
        
      }
    }
    .List{
      width: 95%;
      margin: 0 auto;
      color: #b3b3b3;
      &__titles, &__music{
        display: grid;
        grid-template-columns: 30% 30% 30% 10%;
        .title_1{
          display: flex;
          align-content: center;
          gap: 30px;
          margin-left: 20px;
        }
      }
      &__titles{
        border-bottom: 1px solid rgba(255,255,255, .1);
        text-transform: uppercase;
        margin: 10px 0 ;
        padding: 10px 0 ;
        color: #b3b3b3;
        img{
          width: 20px;
          height: 20px;
          
        }
      }
      ul{
        margin: 0;
        padding: 0;
        li{
          padding:10px 0 ;
          &:hover{
            background-color: rgba(255,255,255,.1);
            .album{
              color: #fff;
            }  
          }
          
        .play{
          display: flex;
          align-items: center;
          .description{
            display: flex;
            align-items: center;
            div{
              margin-left: 20px;
              h3{
                margin: 0 ;
                color: #fff;
              }
              p{
                margin:0;
              }
            }
          }
          .play-btn{
            width: 30px;
            filter: invert(100%);
            padding-left: 16px;
            font-size: 18px;
            color:#000;
            img{
              width: 25px;
              height: 25px;
              margin: 0;
              padding: 0;
            }
          }
        }
          img{
            width: 40px;
            height: 40px;
            padding-left: 10px;
          }
        }
      }


    }
  }
</style>