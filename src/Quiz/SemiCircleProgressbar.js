import React, { useState, useEffect } from 'react';
import './SemiCircleProgressBar.css'; // Import your custom CSS

function SemiCircleProgressBar({ percentage }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progress = Math.min(Math.max(percentage, 0), 100);
    const circumference = 2 * Math.PI * 50; // Assuming a radius of 50 units

    // Calculate the offset value for the stroke-dashoffset CSS property
    const offsetValue = ((100 - progress) / 100) * circumference;
    setOffset(offsetValue);
  }, [percentage]);

  return (
    <svg className="semi-circle">
      <circle
        className="semi-circle-bg"
        cx="50"
        cy="50"
        r="45"
      />
      <circle
        className="semi-circle-progress"
        cx="50"
        cy="50"
        r="45"
        style={{
          strokeDasharray: 283, // 2 * Math.PI * 45 (circumference)
          strokeDashoffset: offset,
        }}
      />
    </svg>
  );
}

export default SemiCircleProgressBar;
