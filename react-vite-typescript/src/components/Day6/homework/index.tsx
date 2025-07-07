import React, { useEffect, useState } from "react";

interface WeatherData {
  temp_c: number;
  condition: { text: string; icon: string };
  humidity: number;
  wind_kph: number;
}

interface HourlyForecast {
  time: string;
  temp_c: number;
  condition: { text: string; icon: string };
}

const API_KEY = "c9a0ca46550648b29ce125849232709";
const DEFAULT_CITY = "Da Nang";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=vi`
      );
      const data = await res.json();
      setWeather({
        temp_c: data.current.temp_c,
        condition: data.current.condition,
        humidity: data.current.humidity,
        wind_kph: data.current.wind_kph,
      });
    }
    async function fetchHourly() {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=2&aqi=no&alerts=no&lang=vi`
      );
      const data = await res.json();

      const now = new Date();
      const currentHour = now.getHours();

      // Lấy giờ hôm nay, ngày mai
      const todayHours = data.forecast.forecastday[0].hour;
      const tomorrowHours = data.forecast.forecastday[1].hour;

      // Giờ hiện tại
      const currentHourData = todayHours.find((h: { time: string | number | Date }) => {
        const hour = new Date(h.time).getHours();
        return hour === currentHour;
      });

      // Lấy giờ tiếp theo hôm nay
      const nextToday = todayHours.filter((h: { time: string | number | Date }) => {
        const hour = new Date(h.time).getHours();
        return hour > currentHour;
      });

      // Nếu thiếu thì lấy thêm từ ngày mai
      const totalNeeded = 3;
      const remaining = totalNeeded - nextToday.length;
      const nextTomorrow = tomorrowHours.slice(0, remaining);

      const nextHours = [...nextToday, ...nextTomorrow];

      // Gộp current + 3 giờ tiếp theo
      const hours = [...(currentHourData ? [currentHourData] : []), ...nextHours.slice(0, 3)];

      setHourly(hours);
      //   const res = await fetch(
      //     `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`
      //   );
      //   const data = await res.json();
      //   const hours = data.forecast.forecastday[0].hour.map((h: HourlyForecast) => ({
      //     time: h.time,
      //     temp_c: h.temp_c,
      //     condition: h.condition,
      //   }));
      //   setHourly(hours);
    }
    fetchWeather();
    fetchHourly();
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) setCity(search.trim());
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-200 rounded-3xl p-8 max-w-xs mx-auto mt-10 shadow-lg font-sans">
      <form className="flex justify-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Da Nang"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-xl border-none text-lg bg-gray-100 shadow-sm outline-none"
        />
      </form>
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold text-white drop-shadow-md">
            {weather ? `${Math.round(weather.temp_c)}°` : "--"}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl text-white font-medium">{weather?.condition.text || ""}</span>
            {weather?.condition.icon && (
              <img src={weather.condition.icon} alt="icon" className="w-10 h-10" />
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <div className="bg-blue-50 rounded-xl px-5 py-3 min-w-[90px] flex flex-col items-center shadow-sm">
            <span className="text-gray-700 text-sm">Humidity</span>
            <span className="text-lg font-semibold text-blue-900 mt-1">
              {weather ? `${weather.humidity}%` : "--"}
            </span>
          </div>
          <div className="bg-blue-50 rounded-xl px-5 py-3 min-w-[90px] flex flex-col items-center shadow-sm">
            <span className="text-gray-700 text-sm">Wind</span>
            <span className="text-lg font-semibold text-blue-900 mt-1">
              {weather ? `${weather.wind_kph} km/h` : "--"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl px-3 pt-4 pb-2 shadow-sm">
        <span className="text-base font-semibold text-blue-900 mb-2 block">Now</span>
        <div className="flex justify-between gap-2">
          {hourly.map((h, idx) => {
            const isNow = idx === 0;
            return (
              <div className="flex flex-col items-center min-w-[56px]" key={idx}>
                <img src={h.condition.icon} alt="icon" className="w-8 h-8 mb-1" />
                <span className="text-base font-semibold text-blue-900">
                  {Math.round(h.temp_c)}°
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  {isNow ? "Now" : h.time.slice(-5)}
                </span>
              </div>
            );
          })}
          {/* {hourly.map((h, idx) => (
            <div className="flex flex-col items-center min-w-[56px]" key={idx}>
              <img src={h.condition.icon} alt="icon" className="w-8 h-8 mb-1" />
              <span className="text-base font-semibold text-blue-900">{Math.round(h.temp_c)}°</span>
              <span className="text-sm text-gray-500 mt-1">
                {idx === 0 ? "Now" : h.time.slice(-5)}
              </span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
