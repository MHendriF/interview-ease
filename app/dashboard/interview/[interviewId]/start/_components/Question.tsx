import { Lightbulb, Volume2 } from "lucide-react";

export default function Question({ questions, activeQuestionIndex }) {
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };

  return (
    questions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {questions &&
            questions.map((question, index) => (
              <h2
                key={index}
                className={`p-2 border rounded-full
                    text-xs md:text-sm text-center cursor-pointer
                    ${activeQuestionIndex == index && "bg-primary text-white"}`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">{questions[activeQuestionIndex]?.question}</h2>
        <Volume2 className="cursor-pointer" onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)} />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20 ">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            Click on <strong>Record Answer</strong> when you are ready to respond to the question. At the end of the
            interview, we will provide you with feedback, including the correct answers for each question and your
            responses for comparison. This will help you understand your performance and identify areas for improvement.
          </h2>
        </div>
      </div>
    )
  );
}
