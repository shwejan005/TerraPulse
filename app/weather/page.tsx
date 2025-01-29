'use client'
import BentoGrid from "@/components/ui/BentoGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { CloudSunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart, Cloud, Droplet, Wind } from "react-feather"; // You can use any icon library of your choice
import { silkScreen } from "../layout";

// Define the weather data type
type WeatherData = {
  temp: number;
  rh: number;
  wind_spd: number;
  pres: number;
  clouds: number;
};

const Home = () => {
  const { user } = useUser();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation && user?.id) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch weather data from the backend API, passing in the geolocation
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=7ba7c97e1df04e1393a485f46230dbde`);
            console.log(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=7ba7c97e1df04e1393a485f46230dbde`)
            const data = await response.json();

            if (data.error) {
              setError(data.error);
            } else {
              // Assuming the data structure returned by API matches the expected WeatherData shape
              setWeatherData(data.data[0]); // Example: assuming API response has `data` array
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
  }, [user?.id]);

  // Destructure weatherData to access the properties directly
  const { temp, rh, wind_spd, pres, clouds } = weatherData || {};

  return (
    <main className="min-h-screen container mx-auto p-4 py-8">
      <div className={`${silkScreen.className} text-xl mt-8 mb-4 text-center text-green-600`}>
        An AI-powered system that suggests best farming practices based on local agricultural conditions and a farmer-specific marketplace.
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Temperature Card */}
          <Card className="bg-card/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CloudSunIcon className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{temp}°C</p>
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
        </div>
      ) : (
        <div className="text-center mt-8">
          <BentoGrid /> {/* Hero Section while weather data is loading */}
        </div>
      )}
    </main>
  );
};

export default Home;