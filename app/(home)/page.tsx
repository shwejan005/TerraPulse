"use client"

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { silkScreen } from "../layout";
import BentoGrid from "@/components/ui/BentoGrid";
import { api } from "@/convex/_generated/api";  // Assuming this is the auto-generated api

const Home = () => {
  const { user } = useUser();  // Get user data from Clerk
  const updateUserLocation = useMutation(api.users.updateLocation);  // Use the correct mutation path here

  useEffect(() => {
    // Check if the browser supports geolocation and user is authenticated
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    if (user?.id) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Send the location data to Convex via the mutation
            await updateUserLocation({ clerkId: user.id, location: { latitude, longitude } });
            console.log("Location updated successfully");
          } catch (error) {
            console.error("Error updating location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("User is not authenticated.");
    }
  }, [user?.id, updateUserLocation]);

  return (
    <main className="min-h-screen container mx-auto p-4 py-8">
      <div className={`${silkScreen.className} text-xl mt-8 mb-4 text-center text-green-600`}>
        An AI-powered system that suggests best farming practices based on local agricultural conditions and a farmer-specific marketplace.
      </div>
      <BentoGrid /> {/* Hero Section */}
    </main>
  );
};

export default Home;