//------------- search city btn
let btn1 = document.querySelector(".btn1");
let form = document.querySelector("form");

btn1.addEventListener("click", (e) => {
  form.classList.add('show')
  e.target.style.display = "none";
});

//------------ date and time
let dateToday = document.querySelector(".right-top p");
const isoString = new Date().toISOString();
const date = new Date(isoString);

let D1 = new Intl.DateTimeFormat("fa", {
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(date);
dateToday.textContent = D1;

//-----
let weekDay = document.querySelector(".right-top h4");
const D2 = new Intl.DateTimeFormat("fa", {
  weekday: "long",
}).format(date);
weekDay.textContent = D2;

//--------------------- search city and get api
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(e.target.city.value, D1, D2);
  e.target.classList.remove('show');
  btn1.style.display = "block";
});

let rightSide = document.querySelector(".right-side");
let leftTop = document.querySelector(".left-top");
let middleBox = document.querySelector(".middle-box");

async function getWeather(city, D1, D2) {
  let response = await fetch(
    `https://developers.parsijoo.ir/web-service/v1/weather/?type=search&city=${city}`, {
    headers: {
      "api-key": "ddcf1ced5178487aa99822180d38f9dd",
    },
  }
  );
  let data = await response.json();
  let dayList = data.result.hava.dayList;
  let summary = data.result.hava.summary;

  rightSide.innerHTML = `
    <div class="right-top">
       <h4>${D2}</h4>
       <p>${D1}</p>
       <p><i class="bi bi-geo-alt"></i> ${city}</p>
    </div>
     <div class="right-bot">
       <i class="wi ${dayList[0].symbol}"></i>
       <p><small class="deg">&#x2103</small> ${summary.temp}</p>
       <p>${dayList[0].condition}</p>
     </div>`;

  leftTop.innerHTML = `
    <div class="top-box">
      <div class="wether-info">
        <p>حداقل دما</p>
        <p>&#x2103 ${dayList[0].min}</p>
      </div>
      <div class="wether-info">
        <p>حداکثر دما</p>
        <p>&#x2103 ${dayList[0].max}</p>
      </div>
      <div class="wether-info">
        <p>سرعت باد</p>
        <p class="speed">${summary.windSpeed} km/h</p>
      </div>
    </div>`;

  middleBox.innerHTML = `
    <div class="middle-box-info active">
      <i class="wi ${dayList[1].symbol}"></i>
      <p>${dayList[1].name}</p>
      <p>&#x2103 ${dayList[1].items[0].temp}</p>
    </div>
    <div class="middle-box-info">
      <i class="wi ${dayList[2].symbol}"></i>
      <p>${dayList[2].name}</p>
      <p>&#x2103 ${dayList[2].items[0].temp}</p>
    </div>
    <div class="middle-box-info">
      <i class="wi ${dayList[3].symbol}"></i>
      <p>${dayList[3].name}</p>
      <p>&#x2103 ${dayList[3].items[0].temp}</p>
    </div>
    <div class="middle-box-info">
      <i class="wi ${dayList[4].symbol}"></i>
      <p>${dayList[4].name}</p>
      <p>&#x2103 ${dayList[4].items[0].temp}</p>
    </div>`;
};

getWeather('تهران', D1, D2);

//------------ alert

const alerts = document.querySelector(".alert");
const hide = setTimeout(function () {
  alerts.classList.add("alert-hide");
}, 9500);

window.addEventListener("load", () => {
  hide;
  setTimeout(() => {
    alerts.classList.remove("alert-hide");
  }, 2000);
});