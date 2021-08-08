<template>
    <footer class="player">
        <div class="music-info">
            <img :src="music.image" alt="Music image" class="music-image">
            <div>
                <p class="music-name">{{ music.name }}</p>
                <p class="artist-name">{{ music.artist }}</p>
            </div>
        </div>
        <div class="audio-controls">
            <div class="audio-buttons">
                <button class="btn prev-button"><img class="icon" src="@/assets/icons/arrow-icon.svg" /></button>
                <button class="btn play-button" @click="startAudio"><img class="icon" src="@/assets/icons/play-icon.svg" ref="playIcon"></button>
                <button class="btn next-button"><img class="icon" src="@/assets/icons/arrow-icon.svg" /></button>
            </div>
            <div class="audio-progress">
                <audio @timeupdate="updateTime()" ref="audio" :src="music.file"></audio>
                <span class="time-span">{{ currentTimeText }}</span>
                <progress @mousedown="isMouseDown = true" @mouseup="isMouseDown = false" @mousemove="handleAudioDrag($event)" @click="handleAudioProgressChange($event)" :value="current" :max="duration" class="progress"/>
                <span class="time-span">{{ durationText }}</span>
            </div>
        </div>
        <div class="volume-container">
            <img v-if="isMuted" src="@/assets/icons/volume-muted-icon.svg" class="volume-icon" @click="muteAudio()"/>
            <img v-else src="@/assets/icons/volume-icon.svg" class="volume-icon" @click="muteAudio()"/>
            <progress ref="volume" @mousedown="isMouseDown = true" @mouseup="isMouseDown = false" @mousemove="handleVolumeDrag($event)" @click="handleVolumeProgressChange($event)" max="100" value="100" class="progress"/>
        </div>
    </footer>
</template>

<script>
    import Audio from "@/assets/audio/true-damage.mp3";
    import StartIcon from '@/assets/icons/play-icon.svg';
    import PauseIcon from '@/assets/icons/pause-icon.svg';

    import { convertTime } from '@/lib/timeLibrary';

    const music = { 
        id: '1',
        name: '56 | El Trading y las 2 sencillas apps',
        artist: 'Paco Montoya',
        file: Audio,
        image: '/img/trading.jpg'
    }

    export default {
        mounted() {
            const audio = this.$refs?.audio;
            audio.onloadeddata = () => {
                this.duration = audio.duration;
                this.durationText = convertTime(audio.duration);
                this.currentTimeText = `${convertTime(audio.currentTime)}`;
            };
        },
        data(){
            return {
                isMuted: false,
                isMouseDown: false,
                music,
                currentTimeText: '0',
                durationText: '0',
                current: 0,
                duration: 0,
            }
        },
        methods: {
            startAudio(){
                const audio = this.$refs?.audio;
                if(!audio.paused){
                    audio.pause();
                    this.$refs.playIcon.src = StartIcon;
                    return
                }
                audio.play();
                this.$refs.playIcon.src = PauseIcon;
            },
            muteAudio() {
                const audio = this.$refs?.audio;
                this.isMuted = !this.isMuted;
                audio.muted = this.isMuted;
            },
            updateTime(){
                const audio = this.$refs?.audio;
                this.current = audio.currentTime;
                this.currentTimeText = `${convertTime(audio.currentTime)}`;
            },
            handleAudioProgressChange(event){
                const audio = this.$refs?.audio;
                audio.currentTime = this.calculateCurrentValue(event, this.duration);
            },
            handleAudioDrag(event){
                this.isMouseDown && this.handleAudioProgressChange(event);
            },
            handleVolumeDrag(event){
                this.isMouseDown && this.handleVolumeProgressChange(event);
            },
            handleVolumeProgressChange(event){
                const volume = this.$refs.volume;
                const audio = this.$refs.audio;
                const currentVolume = this.calculateCurrentValue(event, volume.max);
                
                audio.volume = currentVolume / 100;
                volume.value = currentVolume;
            },
            calculateCurrentValue(e, maxValue){
                const width = e.target.clientWidth;
                const currentValue = maxValue * (e.offsetX / width);

                return currentValue;
            }
        },
        components: {

        }
    };
</script>

<style lang="scss" scoped>
.player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    padding: 0.6rem 1rem 1rem 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #181818;
    color: #fff;
    font-family: sans-serif;

    .music-info{
        position: relative;
        display: grid;
        grid-template-areas: 'image name'
                             'image artist';
        gap: 25px;
    }

    .music-image{
        height: 56px;
        width: 56px;
        grid-area: image;
        object-fit: cover;
        border-radius: 5px;
    }

    .music-name{
        font-size: 14px;
        font-weight: bold;
        grid-area: name;
    }

    .artist-name{
        font-size: 12px;
        grid-area: artist;
        color: lightgray;
    }

    .audio-controls{
        
        .audio-buttons{
            display: flex;
            justify-content: center;
            gap: 5px;

            .btn {
                padding: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                user-select: none;
                outline: none;

                .icon {
                    width: 15px;
                }
            }
            
            .prev-button, .next-button{
                background-color: transparent;
                
                .icon {
                    filter: invert(100%) sepia(0%) saturate(7491%) hue-rotate(133deg) brightness(100%) contrast(101%);

                    &:hover {
                        filter: invert(100%) sepia(0%) saturate(7491%) hue-rotate(133deg) brightness(70%) contrast(101%);
                    }
                }
            }

            .prev-button {

                .icon{
                    transform: rotate(180deg);
                }
            }
        }

        .audio-progress{
            position: relative;
            display: flex;

            audio{
                display: none;
            }
            
            span.time-span {
                margin: 0px 6px;
                user-select: none;
            }
        }
    }
    .volume-container {
        display: flex;
        align-items: center;
        gap: 10px;

        .volume-icon {
            width: 20px;
            user-select: none;
            cursor: pointer;

            &:hover {
                filter: brightness(130%);
            }
        }
    }

    .progress{
            height: 7px;
            border-radius: 10px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            align-self: center;
            cursor: pointer;

            &::-webkit-progress-value {
                background-color: #B3B3B3;
                border-radius: 10px;
                transition: background-color 200ms ease;

                &:active, &:hover {
                    background-color: #1db954;
                }
            }
            
            &::-webkit-progress-bar {
                background-color: #535353;
                border-radius: 10px;
            }
    }
}
</style>