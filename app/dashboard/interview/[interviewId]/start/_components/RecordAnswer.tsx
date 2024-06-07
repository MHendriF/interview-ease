"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/lib/geminiAI";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

export default function RecordAnswer(props: any) {
  const { questions, activeQuestionIndex, interview } = props;
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText, setResults } =
    useSpeechToText({
      continuous: false,
      useLegacyResults: false,
    });

  useEffect(() => {
    results?.map((result: any) => setUserAnswer((prevAns) => prevAns + result?.transcript));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setIsLoading(true);

    const feedbackPrompt =
      "Question:" +
      questions[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and user answer for give interview question " +
      " please give us rating for answer and feedback as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResponse = result.response.text().replace("```json", "").replace("```", "");
      const JsonFeedbackResponse = JSON.parse(mockJsonResponse);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interview?.mockId,
        question: questions[activeQuestionIndex]?.question,
        correctAnswer: questions[activeQuestionIndex]?.answer,
        userAnswer: userAnswer,
        feedback: JsonFeedbackResponse?.feedback,
        rating: JsonFeedbackResponse?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.log("🚀 ~ UpdateUserAnswer ~ error:", error);
    } finally {
      setResults([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image src={"/webcam.png"} width={200} height={200} alt="webcam-icon" className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={isLoading} variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}
