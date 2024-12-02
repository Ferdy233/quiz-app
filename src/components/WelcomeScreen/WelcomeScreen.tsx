import "./welcomescreen.css";

type WelcomeScreenProps = {
  updateTopic: (chosenTopic: string) => void;
};

const topicChoices = [
  {
    title: "HTML",
    icon: "./assets/images/icon-html.svg"
  },
  {
    title: "CSS",
    icon: "./assets/images/icon-css.svg"
  },
  {
    title: "JavaScript",
    icon: "./assets/images/icon-js.svg"
  },
  {
    title: "Accessibility",
    icon: "./assets/images/icon-accessibility.svg"
  },
]

const WelcomeScreen = ({
    updateTopic,
}: WelcomeScreenProps) => {
  const topicChoice = topicChoices.map((topic, topicID) => {
     return (
      <div
        className="topic__card shadow"
        key={topicID}
        onClick={() => updateTopic(topic.title)}
      >
        {/* <div className={`topic__img ${topic.title}`}> */}
          <img src={topic.icon} aria-hidden="true" alt={topic.title} />
        {/* </div> */}
        <p className="topic__title heading--s">{topic.title}</p>
      </div>
    );
  });

  {
    return (
      <section className="welcome">
        <div className="welcome__message">
          <h1 style={{ fontWeight: 'normal' }}className="welcome__title heading--lg">
            Welcome to the{" "}
            <span className="heading--lg--bold">Frontend Quiz!</span>
          </h1>
          <em className="welcome__helper body--s">
            Pick a subject to get started
          </em>
        </div>
        <div className="topics">{topicChoice}</div>
      </section>
    )
  }
};

export default WelcomeScreen;
