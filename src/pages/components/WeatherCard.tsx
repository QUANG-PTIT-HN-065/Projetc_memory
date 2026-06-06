import React, { useEffect, useState } from "react";
import { Card, Space, Typography, Image } from "antd";
import { CloudOutlined } from "@ant-design/icons";

import {
  getCurrentWeather,
  type WeatherData,
} from "../../APIs/weatherAPI";


const { Text, Title } = Typography;
const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentWeather()
      .then((data) => {
        console.log("Weather Data:", data);
        setWeather(data);
      })
      .catch((err) => {
        console.error("Weather Error:", err);
        setError("Không thể tải thời tiết.");
      });
  }, []);

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        minWidth: 280,
      }}
    >
      <Space size={16} align="center">
        {weather?.iconUrl ? (
          <Image
            src={weather.iconUrl}
            alt={weather.description}
            width={48}
            height={48}
            preview={false}
            fallback=""
          />
        ) : (
          <CloudOutlined
            style={{
              fontSize: 42,
              color: "#13c2c2",
            }}
          />
        )}

        <div>
          <Text type="secondary">Thời tiết hôm nay</Text>

          <Title level={3} style={{ margin: 0 }}>
            {weather
              ? `${Math.round(weather.temperature)}°C`
              : "..."}
          </Title>

          <Text type="secondary">
            {error ??
              weather?.description ??
              "Đang tải..."}
          </Text>

          {weather && (
            <>
              <br />
              <Text
                type="secondary"
                style={{ fontSize: 12 }}
              >
                Cảm giác như {Math.round(weather.feelsLike)}°C
              </Text>
            </>
          )}
        </div>
      </Space>
    </Card>
  );
};

export default WeatherCard;