"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Question from "./_components/Question";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Start(props: any) {
  const { params } = props;
  const [interview, setInterview] = useState<any>();
  const [questions, setQuestions] = useState<any>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    console.log("🚀 ~ params.interviewId:", params.interviewId);
    getInterviewDetail();
  }, []);

  const getInterviewDetail = async () => {
    const result: any = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
    setQuestions(jsonMockResponse);
    setInterview(result[0]);
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions  */}
        <Question questions={questions} activeQuestionIndex={activeQuestionIndex} />

        {/* Video/ Audio Recording  */}
        <RecordAnswer questions={questions} activeQuestionIndex={activeQuestionIndex} interview={interview} />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>
        )}
        {activeQuestionIndex != questions?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
        )}
        {activeQuestionIndex == questions?.length - 1 && (
          <Link href={`/dashboard/interview/${interview?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
