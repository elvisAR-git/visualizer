const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
const file = document.getElementById("file");

file.addEventListener("change", function () {
  const files = file.files;
  let x;

  var visualizer = new Visualizer(canvas, 512, 15, files[0]);
  visualizer.start();

  function animate() {
    x = 0;
    visualizer.ctx.clearRect(0, 0, canvas.width, canvas.height);
    visualizer.analyser.getByteFrequencyData(visualizer.sampleArray);
    visualizer.drawVisualizer(
      visualizer.bufferLength,
      x,
      visualizer.barWidth,
      visualizer.barHeight,
      visualizer.sampleArray
    );
    requestAnimationFrame(animate);
  }
  animate();
});
