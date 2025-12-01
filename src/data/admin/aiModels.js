export const aiModels = [
  {
    id: 1,
    name: "AI Object Detection Model",
    version: "v1.4",
    health: "healthy",
    gpu: 65,
    cpu: 40,
    memory: 72,
    uptime: "12h 44m",

    accuracy: 92.5,
    precision: 90.1,
    recall: 88.7,
    f1: 89.3,

    lastTraining: "2025-11-08 14:33",

    logs: [
      { event: "Model re-evaluated (mAP 0.91)", time: "10 minutes ago" },
      { event: "GPU spike detected", time: "1 hour ago" },
      { event: "Autoscale event triggered", time: "1 day ago" },
    ],
  },
];
