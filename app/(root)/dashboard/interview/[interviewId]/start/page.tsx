"use client";

import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

import Question from "./_components/Question";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "@/components/ui/button";

export default function Start(props: any) {
  const { params } = props;
  const [interview, setInterview] = useState<any>();
  const [questions, setQuestions] = useState<any>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
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
        <Question questions={questions} activeQuestionIndex={activeQuestionIndex} />
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
