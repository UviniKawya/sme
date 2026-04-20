"use client";

import { useAppContext } from "@/lib/store";

function CircularProgress({ value, size = 100, strokeWidth = 8, color = "#3b82f6" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="progress-text text-xl text-white">{value}%</span>
    </div>
  );
}

function getSectionScore(section: { questions: { answer: number | null }[] }) {
  const answered = section.questions.filter((q) => q.answer !== null);
  if (answered.length === 0) return null;
  const sum = answered.reduce((acc, q) => acc + (q.answer as number), 0);
  return Math.round((sum / (answered.length * 5)) * 100);
}

function getOverallScore(sections: ReturnType<typeof useAppContext>["assessmentSections"]) {
  let totalAnswered = 0;
  let totalScore = 0;
  for (const section of sections) {
    for (const q of section.questions) {
      if (q.answer !== null) {
        totalAnswered++;
        totalScore += q.answer;
      }
    }
  }
  if (totalAnswered === 0) return 0;
  return Math.round((totalScore / (totalAnswered * 5)) * 100);
}

function getLevel(score: number) {
  if (score >= 70) return { label: "High Readiness", color: "text-emerald-300", bg: "bg-emerald-500/30 border-emerald-400/50", barColor: "#34d399" };
  if (score >= 40) return { label: "Moderate", color: "text-amber-300", bg: "bg-amber-500/30 border-amber-400/50", barColor: "#fbbf24" };
  if (score > 0) return { label: "Low Readiness", color: "text-red-300", bg: "bg-red-500/30 border-red-400/50", barColor: "#f87171" };
  return { label: "Not Started", color: "text-gray-400", bg: "bg-gray-500/30 border-gray-400/50", barColor: "#9ca3af" };
}

const sectionLabels: Record<string, string> = {
  infrastructure: "Infrastructure",
  financial: "Financial",
  skills: "Skills & Workforce",
  strategic: "Strategic Planning",
  cybersecurity: "Cybersecurity",
};

export default function AssessmentSummary() {
  const { assessmentSections } = useAppContext();
  const overall = getOverallScore(assessmentSections);
  const level = getLevel(overall);

  const totalQuestions = assessmentSections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredQuestions = assessmentSections.reduce(
    (acc, s) => acc + s.questions.filter((q) => q.answer !== null).length,
    0
  );
  const completionPct = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="space-y-4 bg-[#1e3a8a] rounded-xl p-4">
      {/* Overall Score */}
      <div className="bg-white/10 rounded-xl border border-white/20 shadow-sm p-4 text-center">
        <h4 className="text-sm font-semibold text-white mb-3">Overall Readiness</h4>
        <CircularProgress value={overall} size={100} strokeWidth={8} color={level.barColor} />
        <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${level.bg} ${level.color}`}>
          {level.label}
        </div>
        <p className="text-xs text-gray-300 mt-2">
          {answeredQuestions} of {totalQuestions} questions answered
        </p>
      </div>

      {/* Completion */}
      <div className="bg-white/10 rounded-xl border border-white/20 shadow-sm p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Completion</h4>
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-300 mt-2">{completionPct}% complete</p>
      </div>

      {/* Section Scores */}
      <div className="bg-white/10 rounded-xl border border-white/20 shadow-sm p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Category Scores</h4>
        <div className="space-y-3">
          {assessmentSections.map((section) => {
            const score = getSectionScore(section);
            const answered = section.questions.filter((q) => q.answer !== null).length;
            const total = section.questions.length;
            const lvl = getLevel(score ?? 0);
            return (
              <div key={section.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-200">
                    {sectionLabels[section.id] ?? section.title}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {score !== null ? `${score}%` : "—"}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${score ?? 0}%`,
                      backgroundColor: lvl.barColor,
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {answered}/{total} answered
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}