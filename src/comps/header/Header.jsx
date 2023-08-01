import React, { useRef } from 'react';
import styles from './header.module.css';
const Heder = ({setQwery}) => {
    const inputValue = useRef()
   
    return (
        <div className={styles.hiro}>
            <div className={styles.content}>
                <img src="./weatherLogo.JPG" alt="p" />
                <div>
                    <input ref={inputValue} type="serch" placeholder={"city name"}/>
                    <button onClick={()=>setQwery(inputValue.current.value)}>serch</button>
                </div>
            </div>
        </div>
    );
}

export default Heder;
