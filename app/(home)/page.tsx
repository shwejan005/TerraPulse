"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { silkScreen } from "../layout";
import BentoGrid from "@/components/ui/BentoGrid";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const { user } = useUser();
  const updateUserLocation = useMutation(api.users.updateLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    if (!user?.id) {
      console.log("User is not authenticated or user ID is missing.");
      return;
    }

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') {
        console.error("User has denied geolocation permissions.");
        alert("Please enable location permissions in your browser settings.");
      }
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await updateUserLocation({ clerkId: user.id, location: { latitude, longitude } });
          console.log("Location updated successfully");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error updating location:", error.message);
          } else {
            console.error("Error updating location:", error);
          }
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
        alert(`Unable to fetch location: ${error.message}`);
      },
      { timeout: 10000 }
    );
  }, [user?.id, updateUserLocation]);

  return (
    <main className="min-h-screen container mx-auto p-4 py-8">
      <div className={`${silkScreen.className} text-xl mt-8 mb-4 text-center text-green-600`}>
        An AI-powered system that suggests best farming practices based on local agricultural conditions and a farmer-specific marketplace.
      </div>
      <BentoGrid />
    </main>
  );
};

export default Home;