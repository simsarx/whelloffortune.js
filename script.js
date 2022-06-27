let baslatTusu = document.querySelector(".button");
let cark = document.querySelector("#wheel");
let odulGosterimi = document.querySelector(".gradient-border");
(function () {
  if (localStorage.getItem("Ödül Değeri") != null) {
    baslatTusu.remove();
  } else {
  }
  let derece = 0;
  let zoneSize = 360; // derece

  // Counter clockwise
  var odulListesi = {
    1: "₺250,00 'ye	₺60,00 İndirim,Kodun",
    2: "₺300,00 'ye	₺75,00 İndirim",
    3: "₺350,00 'ye	₺100,00 İndirim",
    4: "KARGO BEDAVA",
    5: "₺100,00 'ye	₺10,00 İndirim",
    6: "₺150,00 'ye	₺20,00 İndirim",
    7: "₺175,00 'ye	₺30,00 İndirim",
    8: "₺200,00 'ye	₺40,00 İndirim",
  };

  var handleWin = (toplamDonusDerecesi) => {
    var kazananSembol = Math.ceil(toplamDonusDerecesi / zoneSize);
    odulGosterimi.innerHTML = odulListesi[kazananSembol] + " KAZANDIN";
    //odulGosterimi.innerHTML = `Ödülünüz : ${odulListesi[kazananSembol]}`;

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function checkCookie() {
      let user = getCookie("username");
      if (user != "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          setCookie("username", user, 30);
        }
      }
    }
    document.body.onload = checkCookie();
    localStorage.setItem("Ödül Değeri", kazananSembol);
  };

  baslatTusu.addEventListener("click", () => {
    // Reset odulGosterimi

    // Disable button during spin
    baslatTusu.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    derece = Math.floor(1000 + Math.random() * 1000);
    // Set the transition on the wheel
    cark.style.transition = "all 2s ease-out";
    // Rotate the wheel
    cark.style.transform = `rotate(${derece}deg)`;
    // Apply the blur
    cark.classList.add("blur");
    odulGosterimi.innerHTML = "";
  });

  cark.addEventListener("transitionend", () => {
    // Remove blur
    cark.classList.remove("blur");
    // Enable button when spin is over
    baslatTusu.style.pointerEvents = "auto";
    baslatTusu.remove();
    //baslatTusu.remove();
    // Need to set transition to none as we want to rotate instantly
    cark.style.transition = "none";
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    var toplamDonusDerecesi = derece % 360;
    // Set the real rotation instantly without animation
    cark.style.transform = `rotate(${toplamDonusDerecesi}deg)`;
    // Calculate and odulGosterimi the winning symbol
    handleWin(toplamDonusDerecesi);
  });
})();
