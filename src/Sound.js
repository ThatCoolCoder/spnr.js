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

spnr.Sound = class {
    constructor(url) {
        this.url = url;
        this.audio = new Audio(url);
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
        return new spnr.Sound(this.url);
    }
}