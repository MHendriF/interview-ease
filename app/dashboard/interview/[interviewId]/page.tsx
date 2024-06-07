"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import Webcam from "react-webcam";

export default function Interview({ params }: any) {
  const [interview, setInterview] = useState();
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ params.interviewId:", params.interviewId);
    getInterviewDetail();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */
  const getInterviewDetail = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
    console.log("🚀 ~ getInterviewDetail ~ result:", result);
    setInterview(result[0]);
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:&nbsp;</strong>
              {interview?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:&nbsp;</strong>
              {interview?.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:&nbsp;</strong>
              {interview?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              {" "}
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              To start your AI-generated mock interview, please enable your webcam and microphone. The interview
              consists of five questions that you will respond to, and at the end, you will receive a detailed report
              based on your answers. Note: We do not record your video, and you can disable webcam access at any time if
              you choose.
            </h2>
          </div>
        </div>
        <div>
          {isWebCamEnabled ? (
            <Webcam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant="ghost" className="w-full" onClick={() => setIsWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}
