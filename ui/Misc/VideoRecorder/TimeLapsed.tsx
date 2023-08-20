'use client'
import React, { useEffect, useState } from 'react';

function TimeLapsed({ isRecording }: { isRecording: boolean }) {
  const [timeLapsed, setTimeLapsed] = useState(0);

  useEffect(() => {
    let timerInterval;

    if (isRecording) {
      timerInterval = setInterval(() => {
        setTimeLapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setTimeLapsed(0);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording]);

  // Format time elapsed into minutes and seconds
  const minutes = Math.floor(timeLapsed / 60);
  const seconds = timeLapsed % 60;

  // Display the formatted time
  return (
    <div>
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default TimeLapsed;
