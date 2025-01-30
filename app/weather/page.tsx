'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react"; // Import Convex's useMutation hook
import { CloudSunIcon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart, Cloud, Droplet, Wind } from "react-feather"; // You can use any icon library of your choice
import { silkScreen } from "../layout";

// Define the weather data type with the new fields
type WeatherData = {
  app_temp: number;
  aqi: number;
  city_name: string;
  country_code: string;
  datetime: string;
  weather: { description: string; icon: string };
  precip: number;
  pres: number;
  clouds: number;
  temp: number;
  rh: number;
  wind_spd: number;
  dewpt: number;
  uv: number;
  solar_rad: number;
};

const Home = () => {
  const { user } = useUser();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use the Convex mutation hook
  const updateWeatherMutation = useMutation(api.weather.updateWeather);

  useEffect(() => {
    if (navigator.geolocation && user?.id) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch weather data from the backend API, passing in the geolocation
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
            const data = await response.json();

            if (data.error) {
              setError(data.error);
            } else {
              // Assuming the data structure returned by API matches the expected WeatherData shape
              const weather = data.data[0];
              setWeatherData(weather); // Save weather data to state

              // Update weather details in Convex
              await updateWeatherMutation({
                userId: user.id,
                cityName: weather.city_name,
                countryCode: weather.country_code,
                datetime: weather.datetime,
                weather: weather.weather,
                temp: weather.temp,
                appTemp: weather.app_temp,
                humidity: weather.rh,
                windSpeed: weather.wind_spd,
                pressure: weather.pres,
                cloudCover: weather.clouds,
                precip: weather.precip,
                dewpt: weather.dewpt,
                uvIndex: weather.uv,
                solarRad: weather.solar_rad,
              });
            }
          } catch (error) {
            setError("Error fetching weather data");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Error getting location");
        }
      );
    } else {
      console.log("Geolocation is not supported or user is not authenticated.");
    }
  }, [user?.id, updateWeatherMutation]);

  // Destructure weatherData to access the properties directly
  const { app_temp, aqi, city_name, country_code, datetime, weather, precip, pres, clouds, temp, rh, wind_spd, dewpt, uv, solar_rad } = weatherData || {};

  return (
    <main className="min-h-screen container mx-auto p-4 py-8">
      <div className={`${silkScreen.className} text-3xl mt-8 mb-4 text-center text-green-600`}>
       WEATHER DETAILS
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* City Name & Country Code Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CloudSunIcon className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{city_name}, {country_code}</p>
                <p className="text-lg">{datetime}</p>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CloudSunIcon className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{temp}°C</p>
                <p>{weather?.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Apparent Temperature Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CloudSunIcon className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Apparent Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{app_temp}°C</p>
              </div>
            </CardContent>
          </Card>

          {/* Air Quality Index (AQI) Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CloudSunIcon className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Air Quality Index (AQI)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{aqi}</p>
              </div>
            </CardContent>
          </Card>

          {/* Precipitation Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Droplet className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Precipitation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{precip} mm</p>
              </div>
            </CardContent>
          </Card>

          {/* Pressure Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <BarChart className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{pres} hPa</p>
              </div>
            </CardContent>
          </Card>

          {/* Cloud Cover Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Cloud className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Cloud Cover</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{clouds}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Wind Speed Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Wind className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Wind Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{wind_spd} m/s</p>
              </div>
            </CardContent>
          </Card>

          {/* Humidity Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Droplet className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{rh}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Dew Point Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Droplet className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Dew Point</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{dewpt}°C</p>
              </div>
            </CardContent>
          </Card>

          {/* UV Index Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Sun className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">UV Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{uv}</p>
              </div>
            </CardContent>
          </Card>

          {/* Solar Radiation Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <Sun className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Solar Radiation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{solar_rad} W/m²</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center mt-8">
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
};

export default Home;