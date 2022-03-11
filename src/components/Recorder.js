import React, { useCallback, useEffect, useRef, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import styled from "styled-components";

import Message from "./Common/Message";
import { getToday } from "../utils/dateUtils";

const ffmpeg = createFFmpeg({
  log: true,
});

const Recorder = ({ gif, setGif, setVideoBlob, setGifBlob }) => {
  const videoRef = useRef();
  const recordButtonRef = useRef();
  const finishButtonRef = useRef();

  // const [file, setFile] = useState(null);

  const [parts, setParts] = useState([]);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isStoping, setIsStoping] = useState(false);

  const loadFfmpeg = async () => {
    try {
      if (ffmpeg.isLoaded()) {
        return;
      }

      await ffmpeg.load();
    } catch (error) {
      console.log("ffmpeg 로드 에러", error);
    }
  };

  const handleRecordButtonClick = useCallback(() => {
    setMediaRecorder(new MediaRecorder(stream));
    setIsRecording(true);
  }, [stream]);

  const handleAvailableStreamData = useCallback(
    event => {
      parts.push(event.data);
    },
    [parts]
  );

  const handleFinishButtonClick = useCallback(async () => {
    mediaRecorder.stop();
    setIsRecording(false);
    setIsStoping(true);

    const videoBlob = new Blob(parts, { type: "video/webm" });

    const newVideo = new File([videoBlob], "TEST.mp4", {
      type: "video/mp4",
    });

    ffmpeg.FS("writeFile", "anything.webm", await fetchFile(newVideo));

    await ffmpeg.run(
      "-i",
      "anything.webm",
      "-t",
      "2.0",
      "-ss",
      "3.0",
      "-vf",
      "fps=20,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
      "out.gif"
    );

    const data = ffmpeg.FS("readFile", "out.gif");
    const gifBlob = new Blob([data.buffer], { type: "image/gif" });

    const gifURL = URL.createObjectURL(gifBlob);

    setGif(gifURL);
    // setFile(newVideo);
    setVideoBlob(videoBlob);
    setGifBlob(gifBlob);
    setParts([]);
    setMediaRecorder(null);
    setIsStoping(false);
  }, [parts, mediaRecorder]);

  useEffect(() => {
    const setRecorderSetting = async () => {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1920,
          height: 1080,
        },
      });

      const $video = videoRef.current;
      $video.srcObject = userStream;

      setStream(userStream);
    };

    loadFfmpeg();
    setRecorderSetting();
  }, []);

  useEffect(() => {
    if (!mediaRecorder) {
      return;
    }

    mediaRecorder.start(1000);
    mediaRecorder.addEventListener("dataavailable", handleAvailableStreamData);

    return () => {
      mediaRecorder.removeEventListener(
        "dataavailable",
        handleAvailableStreamData
      );
    };
  }, [mediaRecorder, handleAvailableStreamData]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const $recordButton = recordButtonRef.current;
    const $finishButton = finishButtonRef.current;

    $recordButton.addEventListener("click", handleRecordButtonClick);
    $finishButton.addEventListener("click", handleFinishButtonClick);

    return () => {
      $recordButton.removeEventListener("click", handleRecordButtonClick);
      $finishButton.removeEventListener("click", handleFinishButtonClick);
    };
  }, [stream, handleRecordButtonClick, handleFinishButtonClick]);

  return (
    <Container className={gif ? "no-show" : "show"}>
      <Text>{`${getToday()}`}</Text>
      <Video ref={videoRef} id="video" autoPlay muted />
      <Button
        ref={finishButtonRef}
        id="finish-button"
        style={{ display: isRecording ? "block" : "none" }}
      >
        Finish Recording
      </Button>
      {isRecording && (
        <Message style={{ color: "red" }} message="🎥 on REC..." />
      )}
      {isStoping && <Message message="🎬 on saving REC..." />}
      {isStoping || (
        <Button
          ref={recordButtonRef}
          id="record-button"
          style={{ display: isRecording ? "none" : "block" }}
        >
          Start Recording
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 50%;
  height: 100%;
  border: 2px solid #bdbdbd;
  border-radius: 3em;
  background-color: #eeeeee;

  transition: all 0.7s ease-out;

  @keyframes appearAnimationRecorder {
    from {
      opacity: 0;
      background-color: black;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      background-color: #eeeeee;
      transform: translateY(0);
    }
  }

  &.show {
    opacity: 1;
    animation: appearAnimationRecorder 0.7s ease-in-out;
  }
`;

const Text = styled.h2`
  text-align: center;
  font-family: "ABeeZee";
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;

const Video = styled.video`
  width: 100%;
  height: 60%;
  margin: 2em;
  border-radius: 2em;
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 1em;
  background-color: red;
  color: #eeeeee;
  font-family: "ABeeZee";
  font-weight: 500;
  text-align: center;
`;

export default Recorder;
