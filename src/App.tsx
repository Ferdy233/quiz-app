// src/App.tsx

// Importing required components and files
import Header from "./components/Header/Header"; // Header component for the app's header
import QuizApp from "./components/QuizApp"; // Main QuizApp component
import "./App.css"; // Application-level styles
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import data from "./data.json"; // Quiz data imported from a JSON file
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen"; // Component for the initial welcome screen
import { Topic } from './types'; // TypeScript type definition for Topic

function App() {
  // State to track the selected quiz topic
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);

  // Function to update the selected quiz topic
  const updateTopic = (chosenTopic: string) => {
    // Store the chosen topic in session storage for persistence across refreshes
    sessionStorage.setItem("topic", chosenTopic.toLowerCase());

    // Update the state with the selected topic by finding it in the quiz data
    setQuizTopic(() => 
      data.quizzes.find(
        topic => topic.title.toLowerCase() === chosenTopic.toLowerCase()
      ) || null
    );
  };

  // useEffect to initialize the quiz topic based on session storage
  useEffect(() => {
    // Retrieve the saved topic from session storage, if it exists
    const chosenTopic = sessionStorage.getItem("topic") || null;

    // If a topic was previously selected, update the quiz topic
    console.log(chosenTopic); // Debug log to check the retrieved topic
    chosenTopic !== null && updateTopic(chosenTopic);
  }, []); // Dependency array is empty to run this effect only once on component mount

  return (
    <>
      {/* Always render the Header component */}
      <Header quizTopicSelected={null} />
      
      <main>
        {/* Conditionally render either the WelcomeScreen or QuizApp */}
        {
          // If no topic is selected, display the WelcomeScreen
          !quizTopic 
            ? <WelcomeScreen updateTopic={updateTopic} /> 
            : // Otherwise, display the QuizApp with the selected topic
            <QuizApp quizTopic={quizTopic} setQuizTopic={setQuizTopic} />
        }
      </main>
    </>
  );
}

export default App;
