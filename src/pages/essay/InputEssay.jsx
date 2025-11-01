import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Palette, Plus, Minus, ListTree } from "lucide-react";
import { courseEssays } from "../../data/course/courseEssay";

export default function InputEssay() {
  const { courseId, essayId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const selectedEssay =
    courseEssays[courseId]?.find((e) => e.id === parseInt(essayId)) || {};

  const essayQuestions = [
    { id: 1, questionTitle: "Describe your understanding of this topic.", questionDesc: "Explain what you know about this essay subject in detail." },
    { id: 2, questionTitle: "Explain the process involved.", questionDesc: "Discuss the main stages and challenges in implementing this concept." },
    { id: 3, questionTitle: "Give a practical example.", questionDesc: "Provide one real-life example that relates to the topic." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(essayQuestions.map(() => ""));
  const [checked, setChecked] = useState(essayQuestions.map(() => false));
  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState("#000000");

  const handleInput = () => {
    const updated = [...answers];
    updated[currentIndex] = editorRef.current.innerHTML;
    setAnswers(updated);
  };

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const changeFontSize = (change) => {
    const newSize = Math.max(10, Math.min(36, fontSize + change));
    setFontSize(newSize);
    applyCommand("fontSize", "4");
    const fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; i++) {
      if (fontElements[i].size === "4") {
        fontElements[i].removeAttribute("size");
        fontElements[i].style.fontSize = `${newSize}px`;
      }
    }
  };

  const handleNavigation = (direction) => {
    handleInput();
    if (direction === "next" && currentIndex < essayQuestions.length - 1)
      setCurrentIndex(currentIndex + 1);
    if (direction === "prev" && currentIndex > 0)
      setCurrentIndex(currentIndex - 1);
  };

  const handleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomplete = checked.some((c, i) => !c || answers[i].trim() === "");
    if (incomplete) {
      alert("⚠️ Some answers are incomplete. Please review them before submitting.");
      return;
    }

    const newEssay = {
      title: selectedEssay.title || "Untitled Essay",
      status: "In Review",
      score: "-",
      feedbackAI: "-",
      feedbackLecturer: "-",
      date: new Date().toLocaleDateString("en-GB"),
      action: "View",
    };

    const storedEssays = JSON.parse(localStorage.getItem("submittedEssays")) || [];
    localStorage.setItem("submittedEssays", JSON.stringify([...storedEssays, newEssay]));

    alert(`✅ Essay "${selectedEssay.title}" berhasil dikirim!`);
    navigate("/myessays");
  };

  return (
    <div className="min-h-screen bg-white flex font-[Inter]">
      {/* Sidebar Soal */}
      <div className="w-[150px] bg-white border-r border-gray-200 flex flex-col items-center py-8">
        <h2 className="text-[#222] font-semibold text-lg mb-6">Soal</h2>
        <div className="grid grid-cols-2 gap-3">
          {essayQuestions.map((q, index) => {
            const filled = answers[index].trim() !== "";
            const checkedQ = checked[index];
            const color = checkedQ
              ? "bg-green-500 text-white"
              : filled
              ? "bg-[#3D73B4] text-white"
              : "bg-gray-200 text-gray-700";
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-10 rounded-lg font-semibold ${color} transition-all ${
                  currentIndex === index ? "ring-2 ring-[#3D73B4]" : ""
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 px-14 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[22px] font-bold text-gray-900 mb-6 border-b pb-2">
            {selectedEssay.title || "Serba-serbi mahasiswa"}
          </h1>

          <p className="text-gray-800 font-medium mb-3">
            {essayQuestions[currentIndex].questionDesc}
          </p>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-4 p-2 bg-gray-100 rounded-md border border-gray-300">
            <button onClick={() => applyCommand("bold")} title="Bold"><Bold className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("italic")} title="Italic"><Italic className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("underline")} title="Underline"><Underline className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("strikeThrough")} title="Strikethrough"><Strikethrough className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyLeft")} title="Align Left"><AlignLeft className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyCenter")} title="Center"><AlignCenter className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyRight")} title="Align Right"><AlignRight className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyFull")} title="Justify"><ListTree className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("insertUnorderedList")} title="Bullets"><List className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("insertOrderedList")} title="Numbering"><ListOrdered className="w-5 h-5" /></button>
            <button onClick={() => changeFontSize(1)} title="Increase Font Size"><Plus className="w-5 h-5" /></button>
            <button onClick={() => changeFontSize(-1)} title="Decrease Font Size"><Minus className="w-5 h-5" /></button>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => {
                setFontColor(e.target.value);
                applyCommand("foreColor", e.target.value);
              }}
              title="Font Color"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Editable area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="w-full min-h-[220px] border border-gray-300 rounded-md p-4 bg-white focus:outline-[#3D73B4] text-left"
            style={{
              fontSize: `${fontSize}px`,
              color: fontColor,
              direction: "ltr",
              textAlign: "left",
              unicodeBidi: "plaintext",
            }}
            dangerouslySetInnerHTML={{ __html: answers[currentIndex] }}
          ></div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={checked[currentIndex]}
              onChange={() => handleCheck(currentIndex)}
              className="w-5 h-5 accent-[#3D73B4]"
            />
            <label className="text-gray-700">
              I have reviewed and finalized this answer.
            </label>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => handleNavigation("prev")}
              disabled={currentIndex === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentIndex === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              Previous
            </button>

            {currentIndex < essayQuestions.length - 1 ? (
              <button
                onClick={() => handleNavigation("next")}
                className="px-6 py-2 bg-[#3D73B4] text-white rounded-lg hover:bg-[#2c5a90]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
