// src/data/dosen/course/essayData.js

export const essays = [
  // Capstone Project
  {
    id: 1,
    courseId: 1,
    assignmentName: "Capstone Essay 1",
    description:
      "Analyze the system design for your capstone project and describe its architecture in detail.",
    taskType: "Essay",
    startDate: "2025-11-01",
    timeDuration: "13.00 – 17.00 WIB",
    deadline: "2025-11-10, 17.00 WIB",
    attachment: "capstone_guide.pdf",
    totalSubmitted: 9,
    questions: [
      { number: 1, question: "Explain the purpose of your project.", points: 10, answerKey: "BLABLABLA" },
      { number: 2, question: "Describe your system architecture.", points: 10, answerKey: "BLABLABLA" },
    ],
  },
  {
    id: 2,
    courseId: 1,
    assignmentName: "Capstone Essay 2",
    description:
      "Discuss testing results and improvement plans for your capstone project.",
    taskType: "Essay",
    startDate: "2025-11-02",
    timeDuration: "10.00 – 12.00 WIB",
    deadline: "2025-11-12, 17.00 WIB",
    attachment: null,
    totalSubmitted: 7,
    questions: [
      { number: 1, question: "Explain your testing process.", points: 10, answerKey: "BLABLABLA" },
      { number: 2, question: "What improvements are planned next?", points: 10, answerKey: "BLABLABLAABLAAAAAAAAAAA" },
    ],
  },
  {
    id: 3,
    courseId: 1,
    assignmentName: "Capstone Essay 3",
    description:
      "Summarize project evaluation and lessons learned during implementation.",
    taskType: "Essay",
    startDate: "2025-11-03",
    timeDuration: "14.00 – 16.00 WIB",
    deadline: "2025-11-15, 17.00 WIB",
    attachment: null,
    totalSubmitted: 5,
    questions: [
      { number: 1, question: "What were the biggest challenges?", points: 10, answerKey: "" },
      { number: 2, question: "What lessons were learned?", points: 10, answerKey: "" },
    ],
  },

  // Pengembangan Aplikasi Perangkat Bergerak
  {
    id: 4,
    courseId: 2,
    assignmentName: "Mobile App Essay 1",
    description:
      "Design a mobile app interface for e-commerce and describe its usability features.",
    taskType: "Essay",
    startDate: "2025-10-01",
    timeDuration: "09.00 – 11.00 WIB",
    deadline: "2025-10-10, 17.00 WIB",
    attachment: "ui_guideline.pdf",
    totalSubmitted: 12,
    questions: [
      { number: 1, question: "Describe your mobile UI design.", points: 10, answerKey: "" },
    ],
  },
  {
    id: 5,
    courseId: 2,
    assignmentName: "Mobile App Essay 2",
    description:
      "Discuss API integration challenges in mobile app development.",
    taskType: "Essay",
    startDate: "2025-10-05",
    timeDuration: "13.00 – 15.00 WIB",
    deadline: "2025-10-12, 17.00 WIB",
    attachment: null,
    totalSubmitted: 8,
    questions: [
      { number: 1, question: "Explain how your app handles API responses.", points: 10, answerKey: "" },
    ],
  },

  // AI Ethics
  {
    id: 6,
    courseId: 3,
    assignmentName: "AI Ethics Essay 1",
    description:
      "Explain ethical considerations in developing and deploying AI systems.",
    taskType: "Essay",
    startDate: "2025-09-01",
    timeDuration: "14.00 – 16.00 WIB",
    deadline: "2025-09-10, 17.00 WIB",
    attachment: null,
    totalSubmitted: 10,
    questions: [
      { number: 1, question: "What are the key ethical issues in AI?", points: 10, answerKey: "" },
    ],
  },

  // Machine Learning
  {
    id: 7,
    courseId: 4,
    assignmentName: "ML Essay 1",
    description:
      "Discuss the differences between supervised and unsupervised learning.",
    taskType: "Essay",
    startDate: "2025-08-01",
    timeDuration: "09.00 – 11.00 WIB",
    deadline: "2025-08-10, 17.00 WIB",
    attachment: null,
    totalSubmitted: 15,
    questions: [
      { number: 1, question: "Explain supervised learning with example.", points: 10, answerKey: "" },
      { number: 2, question: "Explain unsupervised learning with example.", points: 10, answerKey: "" },
    ],
  },
  {
    id: 8,
    courseId: 4,
    assignmentName: "ML Essay 2",
    description:
      "Explain how neural networks are trained using gradient descent.",
    taskType: "Essay",
    startDate: "2025-08-05",
    timeDuration: "13.00 – 15.00 WIB",
    deadline: "2025-08-12, 17.00 WIB",
    attachment: "ml_notes.pdf",
    totalSubmitted: 9,
    questions: [
      { number: 1, question: "What is the purpose of gradient descent?", points: 10, answerKey: "" },
    ],
  },

  // Data Science
  {
    id: 9,
    courseId: 5,
    assignmentName: "Data Science Essay 1",
    description:
      "Explain the importance of data preprocessing in analytics.",
    taskType: "Essay",
    startDate: "2025-07-01",
    timeDuration: "09.00 – 11.00 WIB",
    deadline: "2025-07-10, 17.00 WIB",
    attachment: null,
    totalSubmitted: 11,
    questions: [
      { number: 1, question: "Why is preprocessing important?", points: 10, answerKey: "" },
    ],
  },
  {
    id: 10,
    courseId: 5,
    assignmentName: "Data Science Essay 2",
    description:
      "Describe methods for handling missing data in a dataset.",
    taskType: "Essay",
    startDate: "2025-07-05",
    timeDuration: "13.00 – 16.00 WIB",
    deadline: "2025-07-12, 17.00 WIB",
    attachment: "dataset_example.csv",
    totalSubmitted: 6,
    questions: [
      { number: 1, question: "Explain mean imputation.", points: 10, answerKey: "" },
    ],
  },
  {
    id: 11,
    courseId: 5,
    assignmentName: "Data Science Essay 3",
    description:
      "Discuss data visualization techniques for large datasets.",
    taskType: "Essay",
    startDate: "2025-07-10",
    timeDuration: "14.00 – 17.00 WIB",
    deadline: "2025-07-15, 17.00 WIB",
    attachment: null,
    totalSubmitted: 4,
    questions: [
      { number: 1, question: "Give an example of good visualization.", points: 10, answerKey: "" },
    ],
  },

  // Cloud Computing
  {
    id: 12,
    courseId: 6,
    assignmentName: "Cloud Essay 1",
    description:
      "Compare IaaS, PaaS, and SaaS with suitable examples.",
    taskType: "Essay",
    startDate: "2025-06-01",
    timeDuration: "10.00 – 12.00 WIB",
    deadline: "2025-06-10, 17.00 WIB",
    attachment: "cloud_computing_guide.pdf",
    totalSubmitted: 7,
    questions: [
      { number: 1, question: "Differentiate IaaS, PaaS, SaaS.", points: 10, answerKey: "" },
    ],
  },
];
