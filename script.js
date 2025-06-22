let btn = document.querySelector("#btn");
let jokeText = document.querySelector("#jokeText");
let loader = document.querySelector(".loader-wrapper");
let copyBtn = document.querySelector(".copyBtn");

async function fetchData() {
  try {
    loader.style.display = "flex";
    btn.style.visibility = "hidden";
    copyBtn.style.display = "none"; // hide copy while loading

    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    });

    const data = await response.json();
    jokeText.innerText = data.joke; // ✅ updated here
    copyBtn.style.display = "inline-block"; // show copy button

    loader.style.display = "none";
    btn.style.visibility = "visible";
  } catch (error) {
    jokeText.innerText = "Something went wrong";
    loader.style.display = "none";
    btn.style.visibility = "visible";
  }
}

btn.addEventListener("click", () => {
  fetchData();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(jokeText.innerText)
    .then(() => {
      let originalText = copyBtn.innerText;
      copyBtn.innerText = "Copied! ✅";

      setTimeout(() => {
        copyBtn.innerText = originalText;
      }, 1500); // revert after 1.5s
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});
