const convertTime = (seconds) => {
    const addZeroes = (time) => time < 10? `0${time}` : `${time}`;

    const minute = Math.floor(seconds / 60) % 60;
    const secondsLeft = Math.floor(seconds) % 60;
    const currentMinute = addZeroes(minute);
    const currentSeconds = addZeroes(secondsLeft);
    
    return `${currentMinute}:${currentSeconds}`;
};

export { convertTime }