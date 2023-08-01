import React, { useEffect, useState } from "react";
import styles from "./stayle.module.css";
import Header from '../../comps/header/Header';
import Content from '../../comps/content/Content';
import axios from "axios";

const Home = () => {
  const [qwery,setQwery] =useState()
  const [info,setInfo] =useState()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [useLocation, setUseLocation] = useState();
  
  
  useEffect(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
        function (position) {
          if(position){
            console.log(position);
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          }
          else{
            setLocation(null)
          }
        },
        function (error) {
          console.error("Error getting geolocation:", error);

          setErrorMsg(`To display the exact location please confirm access to the 
          location of the device otherwise search for a city in the input above`)
        }
      );
    } 
    else {
      console.log("Geolocation is not supported");
    }
  }, []);
  
  useEffect(() =>{
    doApi(qwery)
  },[qwery])

  useEffect(()=>{
    getLocation()
  },[location])
  
  
  const getLocation = location? async () => {
    const key = "AIzaSyAPepl2l-3lJW3L_VnlDcpB9Zd9yS04O2A"
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.latitude},${location.longitude}&key=${key}`
    const data = await axios.get(url)
    setQwery(data.data.results[0].address_components[2].long_name)
  }:()=>console.log("NA");

  const doApi =qwery? async(city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9df5a7ae64ba54dd937af377ffc84e72&units=metric`
    const data = await axios.get(url)
    setInfo(data.data)
  }:()=>console.log("NA");

  return (
    <div className={styles.divAll}>
        <Header setLocation={setLocation} setUseLocation={setUseLocation} setQwery={setQwery}></Header>
        {info?<Content data={info}></Content>:errorMsg?<h4>{errorMsg}</h4>:<h2>loading...</h2> }
    </div>
  );
};

export default Home;
