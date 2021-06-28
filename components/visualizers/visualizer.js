class Visualizer {
  canvas;
  samples;
  barWidth;
  barHeight;
  audioSource;
  analyser;
  audio;
  ctx;
  sampleArray;
  bufferLength;
  audioContext;
  sampleArray;
  x;

  constructor(htmlCanvas, numberOfSamples, barSize, audioFile) {
    this.x = 0;
    this.audioContext = new AudioContext();
    this.canvas = htmlCanvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.samples = numberOfSamples;
    this.barWidth = barSize;
    this.ctx = this.canvas.getContext("2d");

    this.audio = document.getElementById("audio");
    this.audio.src = URL.createObjectURL(audioFile);
    this.audio.load();
  }

  start() {
    this.audio.play();
    this.audioSource = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    this.audioSource.connect(this.analyser);

    this.analyser.connect(this.audioContext.destination);
    this.analyser.fftSize = this.samples;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.sampleArray = new Uint8Array(this.bufferLength);
  }

  drawVisualizer() {
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      this.barHeight = this.sampleArray[i];
      const HUE = i / 9 + i + 20;

      this.ctx.fillStyle = "white";
      // this.ctx.strokeStyle = "hsl(1, 100%, " + i / 7 + "%)";
      this.ctx.fillRect(
        x,
        this.canvas.height - this.barHeight,
        this.barWidth,
        this.barHeight
      );
      // this.ctx.strokeRect(x, y, this.barWidth, this.barHeight);
      x += this.barWidth;
    }
  }
}
