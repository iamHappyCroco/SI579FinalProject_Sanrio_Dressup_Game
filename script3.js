document.addEventListener("DOMContentLoaded", () => {
  // ✅ Restore background image
  const savedBg = localStorage.getItem("mirror-background");
  if (savedBg) {
    const bg = document.getElementById("mirror-bg");
    if (bg) bg.src = savedBg;
  }

  // ✅ Load selected base character
  const characterData = JSON.parse(localStorage.getItem("selectedCharacter"));
  if (characterData) {
    document.getElementById("base-character").src = characterData.img;
  }

  const idMap = {
    headwear: "headwear-layer",
    neckwear: "neckwear-layer",
    decoration: "decoration-layer"
  };

  const accessories = {
    headwear: [
      "assets/accessories/headwear/hat1.png",
      "assets/accessories/headwear/hat2.png",
      "assets/accessories/headwear/hat3.png",
      "assets/accessories/headwear/hat4.png",
      "assets/accessories/headwear/hat5.png",
      "assets/accessories/headwear/6.png",
      "assets/accessories/headwear/7.png",
      "assets/accessories/headwear/8.png",
      "assets/accessories/headwear/9.png",
      "assets/accessories/headwear/10.png"
    ],
    neckwear: [
      "assets/accessories/neckwear/1.png",
      "assets/accessories/neckwear/2.png",
      "assets/accessories/neckwear/3.png",
      "assets/accessories/neckwear/4.png",
      "assets/accessories/neckwear/5.png"
    ],
    decoration: [
      "assets/accessories/decoration/1.png",
      "assets/accessories/decoration/2.png",
      "assets/accessories/decoration/3.png",
      "assets/accessories/decoration/4.png",
      "assets/accessories/decoration/5.png"
    ]
  };

  // ✅ Generate accessory buttons
  for (const type in accessories) {
    const container = document.getElementById(`${type}-container`);
    accessories[type].forEach((imgPath) => {
      const button = document.createElement("button");
      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = imgPath;
      button.appendChild(img);
      button.onclick = () => changeDecoration(type, imgPath);
      container.appendChild(button);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => changeDecoration(type, "");
    container.appendChild(removeBtn);
  }

  // ✅ Update accessory layer
  window.changeDecoration = function (type, src) {
    const layerId = idMap[type];
    const layer = document.getElementById(layerId);
    layer.src = src;
    localStorage.setItem(`${type}-accessory`, src);
  };

  // ✅ Restore saved positions + enable dragging
  for (const type in idMap) {
    const layer = document.getElementById(idMap[type]);
    const savedPosition = JSON.parse(localStorage.getItem(`${type}-position`));
    if (savedPosition) {
      layer.style.left = savedPosition.left;
      layer.style.top = savedPosition.top;
    }
    makeDraggable(layer, type);
  }

  // ✅ Drag-and-drop logic with boundary limits
  function makeDraggable(element, type) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    element.style.position = "absolute";
    element.style.cursor = "grab";

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const container = element.parentElement.getBoundingClientRect();
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;

        let newLeft = e.clientX - container.left - offsetX;
        let newTop = e.clientY - container.top - offsetY;

        newLeft = Math.max(0, Math.min(newLeft, container.width - elemWidth));
        newTop = Math.max(0, Math.min(newTop, container.height - elemHeight));

        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        element.style.cursor = "grab";
        localStorage.setItem(
          `${type}-position`,
          JSON.stringify({
            left: element.style.left,
            top: element.style.top
          })
        );
      }
    });
  }
});

// ✅ Change background and save to localStorage
window.setMirrorBackground = function (src) {
  const bg = document.getElementById("mirror-bg");
  if (bg) {
    bg.src = src;
    localStorage.setItem("mirror-background", src);
  }
};

// ✅ Save snapshot as PNG
window.saveSnapshot = function () {
  const target = document.querySelector(".mirror-frame");
  if (!target) return;

  html2canvas(target, {
    useCORS: true,
    backgroundColor: null,
    scale: 2
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-character-look.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};
