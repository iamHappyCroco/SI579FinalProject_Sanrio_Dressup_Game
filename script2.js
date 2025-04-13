document.addEventListener("DOMContentLoaded", () => {
    const characterPreview = document.getElementById("character-preview");
    const characterName = document.getElementById("character-name");
  
    const characters = [
      { name: "Hello Kitty", img: "assets/characters/Hello Kitty.png" },
      { name: "My Melody", img: "assets/characters/My Melody.png" },
      { name: "Kuromi", img: "assets/characters/Kuromi.png" },
      { name: "Cinnamoroll", img: "assets/characters/Cinnamoroll.png" },
      { name: "Pompompurin", img: "assets/characters/Pompompurin.png" },
      { name:"Pochacco", img: "assets/characters/Pochacco.png" },
      { name: "Badtz-Maru", img: "assets/characters/Badtz-Maru.png" },
      { name: "Keroppi", img: "assets/characters/Keroppi.png" }
    ];
  
    let current = 0;
  
    function updatePreview() {
      characterPreview.src = characters[current].img;
      characterName.innerText = characters[current].name;
    }
  
    document.getElementById("prev-button")?.addEventListener("click", () => {
      current = (current - 1 + characters.length) % characters.length;
      updatePreview();
    });
  
    document.getElementById("next-button")?.addEventListener("click", () => {
      current = (current + 1) % characters.length;
      updatePreview();
    });
  
    document.getElementById("confirm-button")?.addEventListener("click", () => {
      const selected = characters[current];
      localStorage.setItem("selectedCharacter", JSON.stringify(selected));
      window.location.href = "dressup.html";
    });
  
    updatePreview();
});
  