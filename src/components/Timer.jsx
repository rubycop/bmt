import React, { useEffect, useRef, useState } from "react";
import { formatDate, secondsToString, timeDiffSeconds } from "../utils/utils";
import { isActive, isIncomming } from "./contest/ContestItem";

export const Timer = ({ contest }) => {
  const funRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(Date.now());

  useEffect(() => {
    funRef.current = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(funRef.current);
    };
  }, []);

  useEffect(() => {}, [currentDate]);

  return (
    <div className={`flex tracking-wide text-center rounded-full`}>
      {isIncomming(contest) ? (
        <>
          <span>
            {secondsToString(timeDiffSeconds(parseInt(contest.start_time)))}
          </span>
          <span className="ml-2">left</span>
        </>
      ) : isActive(contest) ? (
        <>
          Ended at:{" "}
          {secondsToString(timeDiffSeconds(parseInt(contest.end_time)))}
        </>
      ) : (
        <>
          {formatDate(contest.start_time)} -{" "}
          {formatDate(parseInt(contest.end_time))}
        </>
      )}
    </div>
  );
};
