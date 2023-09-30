import React from "react";
import styles from './styles.module.css'
function Startpage({setAllow,allow,setSeconds,createData,setOpen,open}){
    const handleStart=()=>{
        setAllow(!allow)
        setOpen(false)
        setSeconds(createData.length*60)
    }
    return(
        <>
            <div className={styles.main}>
                <img className={styles.image} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3eit1okvgZRdrjANsHOgr0G2hCv8Sa67UV534IJg5A&s' alt='img'/>
                <h2>Upraised</h2>
            </div>
            <div className={styles.top}>
                <p className={styles.start}>Quiz</p>
            </div>
            <div className={styles.bottom}>
                <button className={styles.button} onClick={()=>handleStart()}>Start</button>
            </div>
        </>
        
    );
};
export default Startpage;