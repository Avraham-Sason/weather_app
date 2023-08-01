import React, { useEffect, useState } from 'react';
import styles from './content.module.css'

const Content = ({data}) => {
    // console.log(data);
    // console.log(data.weather[0].icon);
    return (
        <div className={styles.hiro}>
            <h1>wether of: {data.name} {data.sys.country}</h1>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="picpic" />
            <h4>condition: {data.weather[0].main}</h4>
            <h4>temprature: {Math.floor(data.main.temp)} C </h4>
            <h4>wind: {Math.floor(data.wind.speed)} km</h4>
        </div>
    );

}

export default Content;
