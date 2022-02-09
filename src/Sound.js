/*
spnr.Sound = class {
    constructor(data, dataIsUrl=true) {
        // Create a sound using data
        // If dataIsUrl is true, then treat data as a url and load the sound from there
        // else treat data as a fileBlob and use that to create sound
        console.log('reciever', data, dataIsUrl)
        if (dataIsUrl) {
            fetch(data)
                .then(response => {return response.blob()})
                .then(blob => {
                    this.fileBlob = URL.createObjectURL(blob);
                    this.audio = new Audio(this.fileBlob); // forces a request for the blob
                });
        }
        else {
            this.fileBlob = data;
            this.audio = new Audio(this.fileBlob);
        }
        console.log('receiver', this.fileBlob);
    }

    play() {
        this.audio.play();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.onended = () => {};
    }

    pause() {
        this.audio.pause();
    }

    loop() {
        this.play();
        this.onended = () => this.play();
    }

    set onended(val) {
        this.audio.onended = val;
    }

    copy() {
        console.log('copyer', this.fileBlob);
        return new spnr.Sound(this.fileBlob, false);
    }
}
*/

/**
 * Class to load and play audio
 */
spnr.Sound = class {
    /**
     * Create a new Sound
     * @param {string} url - url to load the audio from
     */
    constructor(url) {
        this.url = url;
        this.audio = new Audio(url);
    }

    /**
     * Start the audio playing (non-blocking)
     */
    play() {
        this.audio.play();
    }

    /**
     * Stop the audio playing and return to start
     */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;

        /**
         * @private
         */
        this.onended = () => {};
    }

    /**
     * Stop the audio but don't reset playthrough position
     */
    pause() {
        this.audio.pause();
    }

    /** 
     * Start looping the audio (non-blocking)
    */
    loop() {
        this.play();
        this.onended = () => this.play();
    }
    set onended(val) {
        this.audio.onended = val;
    }

    /**
     * Create an independent copy of this Sound. Currently does that by refetching the URL (although browser might have cached it).
     * In future there are plans to make this reuse the same sound data.
     * @returns {Sound}
     */
    copy() {
        return new spnr.Sound(this.url);
    }
}