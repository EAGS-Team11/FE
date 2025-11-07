import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";


function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

const data = [
  { week: "Week 1", submissions: 45 },
  { week: "Week 2", submissions: 50 },
  { week: "Week 3", submissions: 47 },
  { week: "Week 4", submissions: 52 },
];

const topStudents = [
  { name: "Student A", score: 95 },
  { name: "Student B", score: 93.5 },
  { name: "Student C", score: 91 },
  { name: "Student D", score: 87.5 },
  { name: "Student E", score: 85 },
];

export default function ClassAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-indigo-700" />
        <h1 className="text-2xl font-semibold text-indigo-900">Class Analytics</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-md">
          <CardContent className="text-center">
            <p className="text-gray-500 text-sm">Average Score</p>
            <h2 className="text-3xl font-bold text-indigo-900">82.4</h2>
            <p className="text-xs text-gray-400 mt-1">↑ 3.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="text-center">
            <p className="text-gray-500 text-sm">Completion Rate</p>
            <h2 className="text-3xl font-bold text-indigo-900">94%</h2>
            <p className="text-xs text-gray-400 mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="text-center">
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-3xl font-bold text-indigo-900">50</h2>
            <p className="text-xs text-gray-400 mt-1">2 New Enrollments</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="text-center">
            <p className="text-gray-500 text-sm">Avg. Time/Assignment</p>
            <h2 className="text-3xl font-bold text-indigo-900">2.3 h</h2>
            <p className="text-xs text-gray-400 mt-1">0.5h from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-md mb-8">
        <CardContent>
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">
            Assignment Submission Trend
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="week" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performance Section */}
      <Card className="shadow-md">
        <CardContent>
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">TOP 5 Performance</h2>
          <div className="flex flex-col gap-4">
            {topStudents.map((student, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p
                      className="font-medium text-gray-800 text-left hover:text-indigo-600 cursor-pointer"
                      onClick={() => navigate("/dosen/ClassAnalitik2")}
                    >
                      {student.name}
                    </p>
                    <p className="text-xs text-gray-400">5 Assignment Submitted</p>
                  </div>
                </div>
                <p className="text-1xl font-semibold text-indigo-900 mr-10">
                  {student.score}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
