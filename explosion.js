canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 1000; // konfeti tanecikleri
const gravity = 0.5; // düşme hızı
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front: "red", back: "darkred" },
  { front: "green", back: "darkgreen" },
  { front: "blue", back: "darkblue" },
  { front: "yellow", back: "darkyellow" },
  { front: "orange", back: "darkorange" },
  { front: "pink", back: "darkpink" },
  { front: "purple", back: "darkpurple" },
  { front: "turquoise", back: "darkturquoise" },
];

//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(5, 20),
        y: randomRange(10, 3),
      },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(
      confetto.velocity.y + gravity,
      terminalVelocity
    );
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
};

document.querySelector(".button").addEventListener("click", initConfetti);
document.querySelector(".button").addEventListener("click", render);
//---------Execution--------

//----------Resize----------
window.addEventListener("resize", function () {
  resizeCanvas();
});
    


var mobileCountdown = "<a href='https://www.betateashop.com/kategori/my-gourmet-beta-tea?utm_source=web&utm_medium=countdown&utm_campaign=16-20haz' class='ctnlink'> <div class='containerctdwn'> <div class='text-container'> <p class='campaign-name'>My Gourmet Kategorisinde Geçerli İkinci Ürün %70 İndirimli</p></div><span class='fd-ctn'> <div id='flipdownm' class='flipdown'></div></span> </div></a>";
var desktopCountdown = "<div id='clockdiv'> <span> <p class='cttext'>My Gourmet Kategorisinde Geçerli İkinci Ürün %70 İndirimli</p></span><div class='times'> <div id='flipdown' class='flipdown'></div></div><a href='https://www.betateashop.com/kategori/my-gourmet-beta-tea?utm_source=web&utm_medium=countdown&utm_campaign=16-20haz'  class='ctaCountdown'>Hemen Alışverişe <br><strong> Başla</strong></a></div>";