import React from "react";
import styles from './styles.module.css';

function CircularProgressBar({ percentage }) {
  // Calculate the stroke-dasharray based on the percentage
  const dasharray = `${283 * (percentage / 100)} 283`;

  return (
    <div className={styles.circularProgressBar}>
      <svg width="100" height="100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#EBEDF5"
          strokeWidth="5"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#44B77B"
          strokeWidth="5"
          strokeDasharray={dasharray}
        />
      </svg>
    </div>
  );
}

export default CircularProgressBar;
