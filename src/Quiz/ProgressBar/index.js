import React, { Component } from "react";
import styles from './styles.module.css'
import SemiCircleProgressBar from "react-progressbar-semicircle";

function ProgressBar({progress}){
    return (
        <div className={styles.scpb_circle_wrappers}>
          <div className={styles.scpb_circles}>
            <SemiCircleProgressBar percentage={progress} showPercentValue />
          </div>
        </div>
    );
}
export default ProgressBar;


