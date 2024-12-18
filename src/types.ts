export type Topic = {
    title: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  };