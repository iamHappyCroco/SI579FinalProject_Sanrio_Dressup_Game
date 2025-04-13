document.addEventListener("DOMContentLoaded", () => {
  // Start button click event and animation
  const startBtn = document.getElementById("start-button");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        startBtn.classList.add("clicked");
        setTimeout(() => {
          window.location.href = "character.html";
        }, 500);
      });
    }
  
    // star sparkle effect when mouse move
    document.addEventListener("mousemove", (e) => {
      const sparkle = document.createElement("img");
      sparkle.src = "assets/sparkle.png"; 
      sparkle.className = "sparkle";
      sparkle.style.left = e.pageX + "px";
      sparkle.style.top = e.pageY + "px";
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {

    const floatingLeft = document.querySelector(".floating-left");
    const floatingMiddle = document.querySelector(".floating-middle");
    const floatingRight = document.querySelector(".floating-right");
  
    const floatData = [
      {
        el: floatingLeft,
        angle: Math.random() * 360,
        speed: 0.03,
        amplitude: 10,
      },
      {
        el: floatingMiddle,
        angle: Math.random() * 360,
        speed: 0.035,
        amplitude: 12,
      },
      {
        el: floatingRight,
        angle: Math.random() * 360,
        speed: 0.04,
        amplitude: 10,
      },
    ];
  
    function animateFloating() {
      floatData.forEach((data) => {
        data.angle += data.speed;
        const offset = Math.sin(data.angle) * data.amplitude;
        data.el.style.top = offset + "px";
      });
      requestAnimationFrame(animateFloating);
    }
  
    animateFloating();
  } );