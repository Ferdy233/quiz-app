// src/App.tsx
import Header from "./components/Header/Header";
import QuizApp from "./components/QuizApp"; // Import the new QuizApp component
import "./App.css";
import { useEffect, useState } from "react";
import data from "./data.json";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import { Topic } from './types';

function App() {
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);

  const updateTopic = (chosenTopic: string) => {
    sessionStorage.setItem("topic", chosenTopic.toLowerCase());
    setQuizTopic(() => data.quizzes.find(topic => topic.title.toLowerCase() === chosenTopic.toLowerCase()) || null);
  };

  useEffect(() => {
    const chosenTopic = sessionStorage.getItem("topic") || null;
    console.log(chosenTopic)
    chosenTopic !== null && updateTopic(chosenTopic);
  }, []);
  
  return (
    <>
      <Header quizTopicSelected={null} />
      <main>
        {
          !quizTopic ? <WelcomeScreen updateTopic={updateTopic} />:
        <QuizApp quizTopic={quizTopic} setQuizTopic={setQuizTopic}/>
        }
      </main>
    </>
  );
}

export default App;