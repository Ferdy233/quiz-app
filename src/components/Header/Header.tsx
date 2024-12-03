// Import necessary assets and styles
import lightModeIcon from "/assets/images/icon-sun-dark.svg"; // Icon for light mode
import darkModeIcon from "/assets/images/icon-moon-dark.svg"; // Icon for dark mode
import "./header.css"; // Import specific styles for the Header component
import { useEffect, useState } from "react";

// Define the prop types for the Header component
type HeaderProps = {
  quizTopicSelected: {
    title: string; // Title of the selected quiz topic
    icon: string; // Icon representing the selected quiz topic
    questions: {
      question: string; // Quiz question text
      options: string[]; // Possible answers for the question
      answer: string; // Correct answer
    }[];
  } | null; // Null if no topic is selected
};

const Header = ({ quizTopicSelected }: HeaderProps) => {
  // State to manage the current theme (light or dark)
  const [theme, setTheme] = useState<string>(() => sessionStorage.getItem("theme") || "");

  // Toggles the theme between "dark-mode" and light mode
  const handleMode = () => {
    setTheme((prev) => (prev === "dark-mode" ? "" : "dark-mode"));
  };

  // Updates the theme in the DOM and persists it in sessionStorage
  useEffect(() => {
    document.body.className = theme; // Set the class on the <body> to apply the theme
    sessionStorage.setItem("theme", theme); // Save the theme preference in sessionStorage
  }, [theme]);

  return (
    <header className="header">
      {/* Display selected quiz topic only if one is selected */}
      {quizTopicSelected === null ? null : (
        <div className="topic">
          <img
            className={`${quizTopicSelected.title} topic__img`}
            src={quizTopicSelected.icon} // Topic icon
            aria-hidden="true" // Hides icon from screen readers as it’s decorative
          />
          <p className="topic__title heading--s">{quizTopicSelected.title}</p> {/* Topic title */}
        </div>
      )}

      {/* Theme switcher */}
      <div className="theme">
        {/* Icon representing light mode */}
        <img className="light-icon" src={lightModeIcon} aria-hidden="true" />

        {/* Toggle switch for theme */}
        <div className="switch">
          <label>
            <input onChange={handleMode} id="toggleMode" type="checkbox" /> {/* Checkbox for toggling */}
            <span className="slider slider--round"></span> {/* Slider for toggle visual effect */}
          </label>
        </div>

        {/* Icon representing dark mode */}
        <img className="dark-icon" src={darkModeIcon} aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;
