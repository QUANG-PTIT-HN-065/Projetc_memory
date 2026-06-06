export interface WeatherData {
    temperature: number;
    feelsLike: number;
    weatherCode: number;
    description: string;
    iconUrl: string;
    latitude: number;
    longitude: number;
    isDay: boolean;
}

/**
 * Lấy tọa độ hiện tại bằng Geolocation API
 */
export function getCurrentPosition(): Promise<{
    latitude: number;
    longitude: number;
}> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Trình duyệt không hỗ trợ Geolocation."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Geolocation error:", error);
                reject(new Error("Không thể lấy vị trí hiện tại."));
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 5 * 60 * 1000,
            }
        );
    });
}

/**
 * Lấy thời tiết hiện tại từ WeatherAPI.com
 */
export async function getCurrentWeather(): Promise<WeatherData> {
    const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_API_KEY;

    if (!API_KEY_WEATHER) {
        throw new Error(
            "Thiếu API key. Hãy thêm VITE_WEATHER_API_KEY vào file .env"
        );
    }

    const { latitude, longitude } = await getCurrentPosition();

    const url =
        `https://api.weatherapi.com/v1/current.json` +
        `?key=${API_KEY_WEATHER}` +
        `&q=${latitude},${longitude}` +
        `&lang=vi`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("WeatherAPI Error:", errorText);
        throw new Error("Không thể lấy dữ liệu thời tiết.");
    }

    const data = await response.json();

    return {
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        weatherCode: data.current.condition.code,
        description: data.current.condition.text,
        iconUrl: `https:${data.current.condition.icon}`,
        latitude: data.location.lat,
        longitude: data.location.lon,
        isDay: data.current.is_day === 1,
    };


}