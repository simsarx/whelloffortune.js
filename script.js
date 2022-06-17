// Immediately invoked function expression
// to not pollute the global scope
(function () {
  const wheel = document.querySelector(".wheel");
  const startButton = document.querySelector(".button");
  const display = document.querySelector(".gradient-border");

  let deg = 0;
  let zoneSize = 90; // deg

  // Counter clockwise
  const symbolSegments = {
    1: "100 TL 10 TL İNDİRİM",
    2: "200 TL 20 TL İNDİRİM",
    3: "KARGO BEDAVA",
    4: "400 TL 40 TL İNDİRİM",
    5: "100 TL 50 TL İNDİRİM",
    6: "600 TL 60 TL İNDİRİM",
    7: "700 TL 70 TL İNDİRİM",
    8: "300 TL 30 TL İNDİRİM",
  };

  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = symbolSegments[winningSymbolNr];
  };

  startButton.addEventListener("click", () => {
    // Reset display

    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = "all 5s ease-out";
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");
  });

  wheel.addEventListener("transitionend", () => {
    // Remove blur
    wheel.classList.remove("blur");
    // Enable button when spin is over
    startButton.style.pointerEvents = "auto";
    startButton.remove();
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = "none";
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  });
})();
