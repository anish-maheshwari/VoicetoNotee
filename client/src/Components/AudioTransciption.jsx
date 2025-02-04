import { useState, useRef } from "react";
import  Button  from "../Utills/Button";
import  Input  from "../Utills/Input";
import  Card  from "../Utills/Card";
import  CardContent  from "../Utills/CardContent";

import { Play, Download, Mic, StopCircle } from "lucide-react";

// export default function AudioTranscriptionApp() {


const AudioTranscription = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState("Waiting for transcription...");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      transcribeAudio(audioBlob);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const transcribeAudio = (audioBlob) => {
    // Placeholder transcription logic (replace with API call)
    setTimeout(() => {
      setTranscript("Transcribed text will appear here (dummy text for now)");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Audio Transcriber</h2>

          <div className="flex space-x-2 mb-4">
            {!recording ? (
              <Button onClick={startRecording} className="bg-red-500 text-white">
                Start Recording
              </Button>
            ) : (
              <Button onClick={stopRecording} className="bg-gray-500 text-white">
                Stop Recording
              </Button>
            )}
          </div>

          {audioUrl && (
            <div className="w-full mt-4">
              <audio controls src={audioUrl} className="w-full" />
              <a href={audioUrl} download="recording.wav" className="block mt-2 text-blue-500">
                Download Audio
              </a>
            </div>
          )}

          <div className="w-full mt-4">
            <Input value={transcript} readOnly className="w-full border p-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioTranscription;