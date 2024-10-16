import React, {useState, useEffect} from "react";

interface TimerProps {
    time: number;
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ time, onTimeUp }) => {
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        if (seconds > 0) {
            const intervalid = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000)
            return () => clearInterval(intervalid);
        } else {
            onTimeUp();
        }
    }, [seconds])

  return <div>Time Left: {seconds}s</div>
};

export default Timer;