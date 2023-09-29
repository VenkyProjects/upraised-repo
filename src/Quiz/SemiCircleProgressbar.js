import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
function SemiCircleProgressBar({ value }) {
  const [lineX1, setLineX1] = useState(100);
  const [lineY1, setLineY1] = useState(50);
  const [lineX2, setLineX2] = useState(100);
  const [lineY2, setLineY2] = useState(50);

  useEffect(() => {
    // Calculate the angle based on the value (0-100)
    const angle = ((value / 100) * 180) + 180; // Assumes a 180-degree arc (half circle)

    // Calculate the coordinates for the line's start and end points
    const radians = (angle * Math.PI) / 180;
    const radius =70; // Radius of the semi-circle
    const centerX = 100; // X-coordinate of the center
    const centerY = 50; // Y-coordinate of the center

    const x1 = centerX + radius * Math.cos(radians);
    const y1 = centerY + radius * Math.sin(radians);

    // Adjust the line's end point coordinates
    const x2 = centerX + (radius - 10) * Math.cos(radians); // Move 10 units inside the semi-circle
    const y2 = centerY + (radius - 10) * Math.sin(radians); // Move 10 units inside the semi-circle

    // Update the state with the calculated coordinates
    setLineX1(x1);
    setLineY1(y1);
    setLineX2(x2);
    setLineY2(y2);
  }, [value]);

  return (
    <div className={styles.speedometer}>
      <svg width="100%" height="100%" viewBox="0 0 200 100">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FF3B3F', stopOpacity: 1 }} />
          <stop offset="48%" style={{ stopColor: '#FFD033', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#44B77B', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
        <path 
          className={styles.dial} 
          d="M 10 50 A 90 90 0 0 1 190 50"
          cx="100"
          cy="100"
          r="90"
          style={{
            stroke: 'url(#gradient)',
          }}
        />
        <path
          className={styles.inner_circle}
          d="M 37 50 A 50 50 1 0 1 164 50"
          cx="100"
          cy="100"
          r="25" // Specify the radius of the inner circle
        />
        <circle
          className={styles.inner_circles}
          d="M 30 50 A 50 50 1 0 1 170 50"
          cx="100"
          cy="49"
          r="30" // Specify the radius of the inner circle
        />
        <text x="100" y="55" textAnchor="middle" className={styles.percentage_text}>
          {value}%
        </text>
        <line
          className={styles.needle}
          x1={lineX1}
          y1={lineY1}
          x2={lineX1 + (lineX2 - lineX1) * 2.75}
          y2={lineY1 + (lineY2 - lineY1) * 2.75}
        />
      </svg>
    </div>
  );
}

export default SemiCircleProgressBar;
