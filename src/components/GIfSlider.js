import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import styled from "styled-components";

import axios from "../config/axiosInstance";
import { videoActions } from "../features/videoSlice";
import { getRecordedDate } from "../utils/dateUtils";
import Description from "./Description";

const GifSlider = ({ videos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wrapperRef = useRef();

  const { user } = useSelector(state => state.user);
  const { videosByDate } = useSelector(state => state.video);

  let speed = 0;
  let position = 0;
  let rounded = 0;

  const handleGifClick = useCallback(
    event => {
      const index = event.currentTarget.id;
      const clickedVideo = videosByDate[index];

      const payload = { video: clickedVideo };
      dispatch(videoActions.updateCurrentVideo(payload));

      navigate(`${user.id}/${clickedVideo._id}`);
    },
    [videosByDate, videos]
  );

  useEffect(() => {
    window.addEventListener("wheel", event => {
      speed = event.deltaY * 0.002;
    });
  }, []);

  useEffect(() => {
    const objs = Array(videosByDate.length).fill({ distance: 0 });

    const requestAnimationFrame = () => {
      const $gifCards = [...document.querySelectorAll(".card")];

      position += speed;
      speed *= 0.8;

      objs.forEach((obj, i) => {
        const abs = Math.abs(position - i);
        obj.distance = Math.min(abs, 1);
        obj.distance = 1 - obj.distance ** 2;

        $gifCards[i].style.transform = `scale(${1 + 0.5 * obj.distance})`;
      });

      rounded = Math.round(position);
      const diff = rounded - position;

      position += Math.sign(diff) * Math.abs(diff) ** 0.7 * 0.02;

      wrapperRef.current.style.transform = `translate(${-position * 735}px, 0)`;

      window.requestAnimationFrame(requestAnimationFrame);
    };

    requestAnimationFrame();
  }, []);

  useEffect(async () => {
    const { data } = await axios.get(`/users/${user.id}/videos`);

    const payload = {
      videos: data.videos,
    };

    dispatch(videoActions.setVideos(payload));
  }, []);

  return (
    <Wrap ref={wrapperRef} id="wrapper">
      {videosByDate.length &&
        videosByDate.map((video, i) => {
          const date = parseISO(video.createdAt);

          return (
            <Container
              id={i}
              key={video._id}
              className="card"
              onClick={handleGifClick}
            >
              <MemoryGif crossOrigin="true" src={video.gifURL} alt="gif" />
              <Description
                className="description"
                date={getRecordedDate(date)}
              />
            </Container>
          );
        })}
    </Wrap>
  );
};

const Container = styled.div`
  display: inline-block;
  width: 33%;
  height: 50%;
  margin-right: 33%;
  border-radius: 1rem;
  background-color: grey;
`;

const Wrap = styled.div`
  ${({ theme }) => theme.container.flexStart};
  width: 100%;
  height: 100%;
  padding-left: 40%;
  padding-bottom: 3%;
`;

const MemoryGif = styled.img`
  display: inline-block;
  width: 100%;
  height: 80%;
`;

export default GifSlider;
