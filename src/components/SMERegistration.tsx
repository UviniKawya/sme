"use client";

import { useState } from "react";
import { useAppContext } from "@/lib/store";

const businessTypes = [
  "Retail / Commerce",
  "Manufacturing",
  "Technology / IT Services",
  "Agriculture",
  "Healthcare",
  "Education",
  "Financial Services",
  "Construction",
  "Hospitality / Tourism",
  "Transport & Logistics",
  "Professional Services",
  "Other",
];

export default function SMERegistration() {
  const { smeProfile, setSmeProfile } = useAppContext();
  const [form, setForm] = useState(smeProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.smeId.trim()) errs.smeId = "SME ID is required";
    if (!form.businessType) errs.businessType = "Business type is required";
    if (!form.location) errs.location = "Location is required";
    if (!form.employees.trim()) errs.employees = "Number of employees is required";
    else if (isNaN(Number(form.employees)) || Number(form.employees) < 1)
      errs.employees = "Must be a valid positive number";
    if (!form.yearsOfOperation.trim()) errs.yearsOfOperation = "Years of operation is required";
    else if (isNaN(Number(form.yearsOfOperation)) || Number(form.yearsOfOperation) < 0)
      errs.yearsOfOperation = "Must be a valid number";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSmeProfile(form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">SME Registration Form</h3>
          <p className="text-sm text-gray-500 mt-1">
            Register your small or medium enterprise to begin the digital readiness assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* SME ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              SME ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.smeId}
              onChange={(e) => update("smeId", e.target.value)}
              placeholder="e.g., SME-2026-001"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.smeId ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-brand-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-colors`}
            />
            {errors.smeId && <p className="mt-1 text-xs text-red-600">{errors.smeId}</p>}
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.businessType ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-brand-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm bg-white transition-colors`}
            >
              <option value="">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.businessType && <p className="mt-1 text-xs text-red-600">{errors.businessType}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {(["Urban", "Rural"] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => update("location", loc)}
                  className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    form.location === loc
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
          </div>

          {/* Employees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Number of Employees <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={form.employees}
              onChange={(e) => update("employees", e.target.value)}
              placeholder="e.g., 25"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.employees ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-brand-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-colors`}
            />
            {errors.employees && <p className="mt-1 text-xs text-red-600">{errors.employees}</p>}
          </div>

          {/* Years of Operation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Years of Operation <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.yearsOfOperation}
              onChange={(e) => update("yearsOfOperation", e.target.value)}
              placeholder="e.g., 5"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.yearsOfOperation ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-brand-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-colors`}
            />
            {errors.yearsOfOperation && <p className="mt-1 text-xs text-red-600">{errors.yearsOfOperation}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
            >
              Register SME
            </button>
          </div>

          {submitted && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-emerald-800">SME registered successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
