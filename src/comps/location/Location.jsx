import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Location() {
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, []);
  useEffect(()=>{
    getllocation()
  },[location])
  const getllocation = async () => {
    const key = "AIzaSyAPepl2l-3lJW3L_VnlDcpB9Zd9yS04O2A"
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.latitude},${location.longitude}&key=AIzaSyAPepl2l-3lJW3L_VnlDcpB9Zd9yS04O2A`
    const data = await axios.get(url)
    // console.log(data.data.results[0].address_components[2].long_name);
    setCurrentLocation(data.data.results[0].address_components[2].long_name)
  }
   currentLocation? console.log(currentLocation):""
  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>
          Please allow access to your location to retrieve the coordinates.
        </p>
      )}
    </div>
  );
}
