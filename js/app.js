const uzsInput = document.querySelector(".uzs");
const usdInput = document.querySelector(".usd");
const rubInput = document.querySelector(".rub");
const eurInput = document.querySelector(".eur");
const usdQiymat = document.querySelector(".qiymat1");
const eurQiymat = document.querySelector(".qiymat2");
const rubQiymat = document.querySelector(".qiymat3");

let response = fetch(`https://cbu.uz/uz/arkhiv-kursov-valyut/json/`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const qiymat = data;
    usdQiymat.innerHTML = qiymat[0].Rate;
    eurQiymat.innerHTML = qiymat[1].Rate;
    rubQiymat.innerHTML = qiymat[2].Rate;

    console.log(data);
    
    uzsInput.addEventListener("input", (e) => {
      setTimeout(() => {
        const uzs = e.target.value;
        usdInput.value = (uzs * (1 / data[0].Rate)).toFixed(3);
        rubInput.value = (uzs * (1 / data[2].Rate)).toFixed(3);
        eurInput.value = (uzs * (1 / data[1].Rate)).toFixed(3);
      }, 2000);
    });

    usdInput.addEventListener("input", (e) => {
      setTimeout(() => {
        const usd = e.target.value;
        uzsInput.value = (usd * (1 * data[0].Rate)).toFixed(3);
        rubInput.value = (usd * (data[0].Rate / data[2].Rate)).toFixed(3);
        eurInput.value = (usd * (data[0].Rate / data[1].Rate)).toFixed(3);
      }, 2000);
    });

    rubInput.addEventListener("input", (e) => {
      setTimeout(() => {
        const rub = e.target.value;
        usdInput.value = (rub * (data[2].Rate / data[0].Rate)).toFixed(3);
        uzsInput.value = (rub * (1 * data[2].Rate)).toFixed(3);
        eurInput.value = (rub * (data[2].Rate / data[1].Rate)).toFixed(3);
      }, 2000);
    });

    eurInput.addEventListener("input", (e) => {
      setTimeout(() => {
        const eur = e.target.value;
        usdInput.value = (eur * (data[1].Rate / data[0].Rate)).toFixed(3);
        rubInput.value = (eur * (data[1].Rate / data[2].Rate)).toFixed(3);
        uzsInput.value = (eur * (1 * data[1].Rate)).toFixed(3);
      }, 2000);
    });
  });
