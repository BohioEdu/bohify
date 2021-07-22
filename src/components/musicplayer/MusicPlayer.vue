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
                <button class="prev-button"><img :src="ArrowIcon" /></button>
                <button class="play-button" @click="startAudio"><img :src="playIcon" class="play-icon"></button>
                <button class="next-button"><img :src="ArrowIcon" /></button>
            </div>
            <div class="audio-progress">
                <audio @timeupdate="updateTime()" ref="audio" :src="music.file"></audio>
                <span class="time-span">{{ currentTimeText }}</span>
                <progress @mousedown="isMouseDown = true" @mouseup="isMouseDown = false" @mousemove="handleAudioDrag($event)" @click="handleAudioProgressChange($event)" :value="current" :max="duration"/>
                <span class="time-span">{{ durationText }}</span>
            </div>
        </div>
        <div>
            <progress ref="volume" @mousedown="isMouseDown = true" @mouseup="isMouseDown = false" @mousemove="handleVolumeDrag($event)" @click="handleVolumeProgressChange($event)" max="100" value="100"/>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    @import './MusicPlayer.scss';
</style>

<script>
    import Audio from "@/assets/audio/true-damage.mp3";
    import StartIcon from '@/assets/icons/play-icon.svg';
    import PauseIcon from '@/assets/icons/pause-icon.svg';
    import ArrowIcon from '@/assets/icons/arrow-icon.svg';

    import { convertTime } from '@/lib/timeLibrary';

    const music = { 
        id: '1',
        name: '56 | El Trading y las 2 sencillas apps',
        artist: 'Paco Montoya',
        file: Audio,
        image: '/img/trading.jpg'
    }

    export default {
        data(){
            return {
                playIcon: StartIcon,
                ArrowIcon,
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
                this.duration = audio.duration;
                this.durationText = convertTime(audio.duration);
                if(!audio.paused){
                    audio.pause();
                    this.$data.playIcon = StartIcon;
                    return
                }
                audio.play();
                this.$data.playIcon = PauseIcon;
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
                const volume = this.$refs?.volume;
                const audio = this.$refs?.audio;
                const currentVolume = this.calculateCurrentValue(event, volume.max);
                
                audio.volume = currentVolume / 100;
                volume.value = currentVolume;
                
            },
            calculateCurrentValue(e, maxValue){
                const width = e.target.clientWidth;
                const newPos = maxValue * (e.offsetX / width);

                return newPos;
            }
        },
        components: {

        }
    };
</script>