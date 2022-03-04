import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import styled from "styled-components";

import Message from "./Common/Message";

const ffmpeg = createFFmpeg({
  log: true,
});

const Recorder = ({ setGif, setVideoBlob, setGifBlob }) => {
  const dispatch = useDispatch();

  const videoRef = useRef();
  const recordButtonRef = useRef();
  const finishButtonRef = useRef();

  const [ready, setReady] = useState(false);
  const [file, setFile] = useState(null);
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
      console.log("ffmpeg 로드 중 에러 발생", error);
    }
    setReady(true);
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
      "-f",
      "gif",
      "out.gif"
    );

    const data = ffmpeg.FS("readFile", "out.gif");
    const gifBlob = new Blob([data.buffer], { type: "image/gif" });

    const gifURL = URL.createObjectURL(gifBlob);

    setGif(gifURL);
    setFile(newVideo);
    setVideoBlob(videoBlob);
    setGifBlob(gifBlob);
    setParts([]);
    setMediaRecorder(null);
    setIsStoping(false);
  }, [parts, mediaRecorder]);

  useEffect(() => {
    const setRecorderSetting = async () => {
      // logicam 설정
      // const list = await navigator.mediaDevices.enumerateDevices();

      // const logiCapture = list.find(
      //   device => device.label === "Logitech StreamCam (046d:0893)"
      // );

      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
          // deviceId: logiCapture.deviceId,
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
    <Container>
      <Video ref={videoRef} id="video" autoPlay muted />
      {isRecording && <Message message="🎥 on REC..." />}
      {isStoping && <Message message="🎬 on saving REC..." />}
      <Button
        ref={finishButtonRef}
        id="finish-button"
        style={{ display: isRecording ? "block" : "none" }}
      >
        Finish Recording
      </Button>
      <Button
        ref={recordButtonRef}
        id="record-button"
        style={{ display: isRecording ? "none" : "block" }}
      >
        Start Recording
      </Button>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 50%;
  height: 100%;
  background-color: yellow;
  transition: all 0.3s ease-out;
`;

const Video = styled.video`
  width: 560px;
  height: 520px;
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 0.5em;
  background-color: black;
  color: white;
  font-family: sans-serif;
  text-align: center;
`;

export default Recorder;
