import lightModeIcon from "/assets/images/icon-sun-dark.svg";
import DarkModeIcon from "/assets/images/icon-moon-dark.svg";
import "./header.css";
import { useEffect, useState } from "react";

type HeaderProps = {
  quizTopicSelected: {
    title: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  } | null;
};

const Header = ({ quizTopicSelected }: HeaderProps) => {
  const [theme, setTheme] = useState<string>(() => sessionStorage.getItem("theme") || "")
  const handleMode = () => {
    setTheme(prev => prev === "dark-mode" ? "" : "dark-mode")
  };
  
  useEffect(() => {
    document.body.className=theme;
    sessionStorage.setItem("theme", theme)
  }, [theme])

  return (
    <header className="header">
      {quizTopicSelected === null ? null : (
        <div className="topic">
          <img
            className={`${quizTopicSelected.title} topic__img`}
            src={quizTopicSelected.icon}
            aria-hidden="true"
          />
          <p className="topic__title heading--s">{quizTopicSelected.title}</p>
        </div>
      )}
      <div className="theme">
        <img className="light-icon" src={lightModeIcon} aria-hidden="true" />
        <div className="switch">
          <label>
            <input onChange={handleMode} id="toggleMode" type="checkbox" />
            <span className="slider slider--round"></span>
          </label>
        </div>
        <img className="dark-icon" src={DarkModeIcon} aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;
