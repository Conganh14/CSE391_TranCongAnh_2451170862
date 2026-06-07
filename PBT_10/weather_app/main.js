const weatherCodeMap = {
  113: { icon: "☀️", desc: "Trời nắng, quang đãng" },
  116: { icon: "⛅", desc: "Có mây rải rác" },
  119: { icon: "☁️", desc: "Nhiều mây" },
  122: { icon: "☁️", desc: "Âm u, nhiều mây" },
  143: { icon: "🌫️", desc: "Sương mù" },
  176: { icon: "🌦️", desc: "Mưa rào lác đác" },
  179: { icon: "🌨️", desc: "Tuyết rơi rải rác" },
  182: { icon: "🌧️", desc: "Mưa đá nhỏ" },
  185: { icon: "🌧️", desc: "Mưa nhỏ, đóng băng" },
  200: { icon: "⛈️", desc: "Giông bão" },
  227: { icon: "❄️", desc: "Bão tuyết" },
  230: { icon: "❄️", desc: "Bão tuyết nặng" },
  248: { icon: "🌫️", desc: "Sương mù dày" },
  260: { icon: "🌫️", desc: "Sương mù đóng băng" },
  263: { icon: "🌦️", desc: "Mưa phùn nhẹ" },
  266: { icon: "🌦️", desc: "Mưa phùn" },
  281: { icon: "🌧️", desc: "Mưa phùn đóng băng" },
  284: { icon: "🌧️", desc: "Mưa phùn đá" },
  293: { icon: "🌧️", desc: "Mưa nhẹ" },
  296: { icon: "🌧️", desc: "Mưa vừa" },
  299: { icon: "🌧️", desc: "Mưa to" },
  302: { icon: "🌧️", desc: "Mưa rất to" },
  305: { icon: "🌧️", desc: "Mưa đổ như trút" },
  308: { icon: "🌧️", desc: "Mưa cực to" },
  311: { icon: "🌧️", desc: "Mưa đóng băng nhẹ" },
  314: { icon: "🌧️", desc: "Mưa đóng băng vừa" },
  317: { icon: "🌨️", desc: "Mưa tuyết nhẹ" },
  320: { icon: "🌨️", desc: "Mưa tuyết vừa" },
  323: { icon: "🌨️", desc: "Tuyết rơi nhẹ" },
  326: { icon: "🌨️", desc: "Tuyết rơi vừa" },
  329: { icon: "❄️", desc: "Tuyết rơi dày" },
  332: { icon: "❄️", desc: "Tuyết rơi rất dày" },
  335: { icon: "❄️", desc: "Bão tuyết nhẹ" },
  338: { icon: "❄️", desc: "Bão tuyết nặng" },
  350: { icon: "🌨️", desc: "Mưa đá" },
  353: { icon: "🌦️", desc: "Mưa rào nhẹ" },
  356: { icon: "🌦️", desc: "Mưa rào vừa" },
  359: { icon: "🌦️", desc: "Mưa rào rất to" },
  362: { icon: "🌨️", desc: "Mưa tuyết nhẹ" },
  365: { icon: "🌨️", desc: "Mưa tuyết vừa" },
  368: { icon: "🌨️", desc: "Tuyết rào nhẹ" },
  371: { icon: "❄️", desc: "Tuyết rào nặng" },
  374: { icon: "🌨️", desc: "Mưa đá nhỏ" },
  377: { icon: "🌨️", desc: "Mưa đá vừa" },
  386: { icon: "⛈️", desc: "Giông có mưa nhẹ" },
  389: { icon: "⛈️", desc: "Giông có mưa to" },
  392: { icon: "⛈️", desc: "Giông có tuyết nhẹ" },
  395: { icon: "⛈️", desc: "Giông có tuyết to" },
};

function getWeatherInfo(code) {
  return weatherCodeMap[code] || { icon: "🌡️", desc: "Không xác định" };
}

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const stateLoading = document.getElementById("stateLoading");
const stateSuccess = document.getElementById("stateSuccess");
const stateError = document.getElementById("stateError");
const errorMsg = document.getElementById("errorMsg");

const weatherIcon = document.getElementById("weatherIcon");
const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDesc = document.getElementById("weatherDesc");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");
const weatherVisibility = document.getElementById("weatherVisibility");

const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");

function showState(stateName) {
  stateLoading.classList.add("hidden");
  stateSuccess.classList.add("hidden");
  stateError.classList.add("hidden");

  if (stateName === "loading") stateLoading.classList.remove("hidden");
  if (stateName === "success") stateSuccess.classList.remove("hidden");
  if (stateName === "error") stateError.classList.remove("hidden");
}

async function fetchWeather(city) {
  const encodedCity = encodeURIComponent(city);
  const url = `https://wttr.in/${encodedCity}?format=j1`;

  const response = await fetch(url);

  lỗi;
  if (!response.ok) {
    throw new Error(`Không tìm thấy thành phố "${city}"`);
  }

  const data = await response.json();
  return data;
}

function displayWeather(data, cityName) {
  const current = data.current_condition[0];

  const area = data.nearest_area[0];
  const city = area.areaName[0].value;
  const country = area.country[0].value;

  const code = parseInt(current.weatherCode);
  const { icon, desc } = getWeatherInfo(code);

  weatherIcon.textContent = icon;
  weatherCity.textContent = `${city}, ${country}`;
  weatherTemp.textContent = `${current.temp_C}°C`;
  weatherDesc.textContent = desc;
  weatherHumidity.textContent = `${current.humidity}%`;
  weatherWind.textContent = `${current.windspeedKmph} km/h`;
  weatherVisibility.textContent = `${current.visibility} km`;

  showState("success");
}

async function searchWeather(city) {
  city = city.trim();

  if (!city) {
    showState("error");
    errorMsg.textContent = "⚠️ Vui lòng nhập tên thành phố";
    return;
  }

  showState("loading");
  searchBtn.disabled = true;

  try {
    const data = await fetchWeather(city);

    displayWeather(data, city);

    saveHistory(city);
    renderHistory();
  } catch (error) {
    showState("error");

    if (error.message.includes("Failed to fetch")) {
      errorMsg.textContent = "❌ Mất kết nối mạng. Vui lòng kiểm tra internet.";
    } else {
      errorMsg.textContent = `❌ Không tìm thấy "${city}". Thử tên khác nhé!`;
    }
  } finally {
    searchBtn.disabled = false;
  }
}

function loadHistory() {
  const raw = localStorage.getItem("weather_history");

  return raw ? JSON.parse(raw) : [];
}

function saveHistory(city) {
  let history = loadHistory();

  const normalized = city
    .trim()
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  history = history.filter((c) => c.toLowerCase() !== normalized.toLowerCase());

  history.unshift(normalized);

  history = history.slice(0, 5);

  localStorage.setItem("weather_history", JSON.stringify(history));
}

function renderHistory() {
  const history = loadHistory();

  if (history.length === 0) {
    historySection.classList.add("hidden");
    return;
  }

  historySection.classList.remove("hidden");
  historyList.innerHTML = "";

  history.forEach((city) => {
    const tag = document.createElement("button");
    tag.className = "history-tag";
    tag.textContent = city;

    tag.addEventListener("click", () => {
      cityInput.value = city;
      searchWeather(city);
    });
    historyList.appendChild(tag);
  });
}

searchBtn.addEventListener("click", () => {
  searchWeather(cityInput.value);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchWeather(cityInput.value);
});

renderHistory();
