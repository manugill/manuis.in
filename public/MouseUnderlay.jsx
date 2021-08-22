import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from 'styled-components'

import MouseUnderlayHeart from "./MouseUnderlayHeart.jsx";

const [width, height] = [630, 440]
const dimensions = { width, height }

const shakeDuration = 820

const shakeKeyframes = keyframes`
  10%, 90% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, 0.5, 1.5deg);
  }

  20%, 80% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, -0.5, 1.5deg);
  }

  30%, 50%, 70% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, 1, 1.5deg);
  }

  40%, 60% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, -1, 1.5deg);
  }
`
const Shake = styled.div`
  animation: ${shakeKeyframes} ${shakeDuration}ms cubic-bezier(.36,.07,.19,.97) both;
  transform-origin: center 91%;
  transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 1.5deg);
  /* backface-visibility: hidden; */
  animation-play-state: ${p => p.finish || p.yes ? 'play' : 'paused' };
`

const Wrap = styled.div`
  position: absolute;
  opacity: ${p => p.fade ? 0.5 : 1};
  transition: transform 1s ease-out, opacity 5s ease;
  transform-origin: center 91%;
  width: ${width}px;
  height: ${height}px;
  top: ${-height / 2}px;
  left: ${-width / 2}px;
  pointer-events: none;
  transform: ${`translate3d(calc(50vw ), ${20 + height / 2}px, 0)`};
  perspective: 1000;
  will-change: 'transform';
  z-index: -9999;
`

const MouseUnderlay = () => {
  const ghost = useRef();
  const [pos, setPos] = useState(false);
  const [wait, setWait] = useState(true);
  const [shaking, setShaking] = useState(false);
  const shakeTimeoutRef = useRef(undefined);

  useEffect(() => {
    setTimeout(() => setWait(undefined), 1000);
  }, []);

  useEffect(() => {
    if (!wait && !shakeTimeoutRef.current && pos) {
      setShaking(true);
      shakeTimeoutRef.current = setTimeout(() => setShaking(undefined), shakeDuration * 0.85);
    }
  }, [pos, wait]);

  const update = useCallback((e) => {
    const { clientX, clientY } = e;
    requestAnimationFrame(() => !wait && setPos({ clientX, clientY }));
  }, [wait]);
  useEffect(() => {
    addEventListener("mousemove", update, { passive: true });
    return () => removeEventListener("mousemove", update);
  }, [update]);

  return (
    <Wrap
      fade={!!pos}
      style={{
        transform: pos && !shaking && !wait
          ? `translate3d(${pos.clientX}px, ${pos.clientY - height / 2 + 40}px, 0) rotate3d(${pos.clientY / window.innerHeight * 2 - 1}, 0, ${(pos.clientX / window.innerWidth - 0.5) * -1}, 25deg)`
          : `translate3d(calc(50vw + 3.5px), calc(20px + ${height / 2}px), 0)`,
      }}
    >
      <Shake yes={shaking} finish={shaking === undefined}>
        <div ref={ghost}>
          <MouseUnderlayHeart />
        </div>
      </Shake>
    </Wrap>
  );
};

export default MouseUnderlay;
