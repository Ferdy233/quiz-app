import "./welcomescreen.css"; // Importing the CSS file for styling the WelcomeScreen component

// Defining the type for props that the WelcomeScreen component will receive
type WelcomeScreenProps = {
  updateTopic: (chosenTopic: string) => void; // A function to update the selected topic
};

// List of available quiz topics with their titles and icons
const topicChoices = [
  {
    title: "HTML", // Topic title
    icon: "./assets/images/icon-html.svg", // Path to the topic's icon
  },
  {
    title: "CSS",
    icon: "./assets/images/icon-css.svg",
  },
  {
    title: "JavaScript",
    icon: "./assets/images/icon-js.svg",
  },
  {
    title: "Accessibility",
    icon: "./assets/images/icon-accessibility.svg",
  },
];

// The WelcomeScreen component
const WelcomeScreen = ({ updateTopic }: WelcomeScreenProps) => {
  // Mapping over the topicChoices array to generate topic cards
  const topicChoice = topicChoices.map((topic, topicID) => {
    return (
      <div
        className="topic__card shadow" // Card styling with a shadow effect
        key={topicID} // Unique key for each topic card
        onClick={() => updateTopic(topic.title)} // Calls the updateTopic function when a card is clicked
      >
        <img
          src={topic.icon} // Displays the topic's icon
          aria-hidden="true" // Hides the image from screen readers as it is decorative
          alt={topic.title} // Provides an alternative text for the icon
        />
        <p className="topic__title heading--s">{topic.title}</p> {/* Displays the topic's title */}
      </div>
    );
  });

  // Returning the JSX structure of the component
  return (
    <section className="welcome">
      {/* Welcome message */}
      <div className="welcome__message">
        <h1 className="welcome__title heading--lg">
          Welcome to the{" "}
          <span className="heading--lg--bold">Frontend Quiz!</span>
        </h1>
        <em className="welcome__helper body--s">
          Pick a subject to get started
        </em>
      </div>

      {/* Container for the topic cards */}
      <div className="topics">{topicChoice}</div>
    </section>
  );
};

export default WelcomeScreen; // Exporting the component for use in other parts of the app
