"use client";

import { useState } from "react";
import { useAppContext } from "@/lib/store";
import AssessmentSummary from "./AssessmentSummary";
import type { AssessmentSubPage } from "@/lib/types";

const assessmentCategories: { id: AssessmentSubPage; title: string; sectionId: string; icon: React.ReactNode }[] = [
  {
    id: "infrastructure",
    title: "Infrastructure Readiness",
    sectionId: "infrastructure",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: "financial",
    title: "Financial Readiness",
    sectionId: "financial",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "skills",
    title: "Digital Skills & Workforce",
    sectionId: "skills",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Preparedness",
    sectionId: "cybersecurity",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const likertLabels = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

function getSectionCompletion(sectionId: string, sections: ReturnType<typeof useAppContext>["assessmentSections"]) {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return { answered: 0, total: 0 };
  return {
    answered: section.questions.filter((q) => q.answer !== null).length,
    total: section.questions.length,
  };
}

export default function Assessment() {
  const { assessmentSections, setAssessmentAnswer, assessmentSubPage, setAssessmentSubPage } = useAppContext();
  const [expandedSection, setExpandedSection] = useState<string | null>(assessmentSubPage !== "overview" ? assessmentSubPage : null);
  const [savingDraft, setSavingDraft] = useState(false);

  const handleCategoryClick = (cat: AssessmentSubPage) => {
    setAssessmentSubPage(cat);
    setExpandedSection(expandedSection === cat ? null : cat);
  };

  const totalQuestions = assessmentSections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredQuestions = assessmentSections.reduce(
    (acc, s) => acc + s.questions.filter((q) => q.answer !== null).length,
    0
  );
  const completionPct = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  const handleSubmitAssessment = () => {
    if (answeredQuestions < totalQuestions) {
      alert(`Please answer all ${totalQuestions - answeredQuestions} remaining questions before submitting.`);
      return;
    }
    alert("Assessment submitted successfully! Your results are ready.");
  };

  const handleSaveDraft = () => {
    setSavingDraft(true);
    setTimeout(() => {
      setSavingDraft(false);
      alert("Draft saved successfully!");
    }, 800);
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Digital Readiness Assessment</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Answer all questions across 4 categories to determine your digital readiness level.
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-600">{completionPct}%</p>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-brand-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            {answeredQuestions} of {totalQuestions} questions answered
          </p>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-3">
          {assessmentCategories.map((cat) => {
            const section = assessmentSections.find((s) => s.id === cat.sectionId);
            if (!section) return null;
            const completion = getSectionCompletion(cat.sectionId, assessmentSections);
            const isComplete = completion.answered === completion.total;
            const isExpanded = expandedSection === cat.id;

            return (
              <div key={cat.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                    isExpanded ? "bg-[#1e3a8a]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isComplete 
                        ? "bg-emerald-100 text-emerald-600" 
                        : isExpanded 
                          ? "bg-white/20 text-white" 
                          : "bg-brand-100 text-brand-600"
                    }`}>
                      {isComplete ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <span className={`text-xs font-bold ${isExpanded ? "text-white" : "text-brand-600"}`}>
                          {assessmentCategories.indexOf(cat) + 1}
                        </span>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className={`text-sm font-medium ${isExpanded ? "text-white" : "text-gray-900"}`}>{cat.title}</h4>
                      <p className={`text-xs ${isExpanded ? "text-blue-200" : "text-gray-500"}`}>
                        {completion.answered}/{completion.total} answered
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isComplete && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Done
                      </span>
                    )}
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180 text-white" : "text-gray-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 space-y-5">
                    {section.questions.map((question) => (
                      <div key={question.id} className="border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                        <div className="flex items-start gap-2 mb-3">
                          <p className="text-sm font-medium text-gray-800 flex-1">{question.text}</p>
                          <div className="tooltip-trigger flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <div className="tooltip-content">{question.tooltip}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {likertLabels.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setAssessmentAnswer(section.id, question.id, option.value)}
                              className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium transition-all ${
                                question.answer === option.value
                                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-600"
                              }`}
                              title={option.label}
                            >
                              {option.value}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1 px-0.5">
                          <span className="text-[10px] text-gray-400">Strongly Disagree</span>
                          <span className="text-[10px] text-gray-400">Strongly Agree</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <button
            onClick={handleSaveDraft}
            disabled={savingDraft}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {savingDraft ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handleSubmitAssessment}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Submit Assessment
          </button>
        </div>
      </div>

      {/* Right Sticky Panel */}
      <div className="w-72 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24">
          <AssessmentSummary />
        </div>
      </div>
    </div>
  );
}
