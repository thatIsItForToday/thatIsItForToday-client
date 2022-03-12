import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { videoActions } from "../features/videoSlice";

const RuntimeTracker = () => {
  const dispatch = useDispatch();

  const ref = useRef();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const $message = ref.current;

    setTimeout(() => {
      $message.classList.add("show");
    }, 0);

    return () => {
      $message.classList.remove("show");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = ref.current.textContent;

      const runTime = time.slice(1, time.length - 1);

      const payload = {
        runTime,
      };

      dispatch(videoActions.updateRecorder(payload));
    }, 1002);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSecond => {
        if (prevSecond === 59) {
          setMinutes(prevMinute => prevMinute + 1);
          return 0;
        }

        return prevSecond + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TimerBox ref={ref}>
      ({minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")})
    </TimerBox>
  );
};

const TimerBox = styled.div`
  color: red;
  font-family: "ABeeZee";
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  @keyframes appearAnimationText {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.show {
    opacity: 1;
    animation: appearAnimationText 0.3s ease-in-out;
  }
`;

export default RuntimeTracker;
