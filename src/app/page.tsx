"use client";

import { useState } from "react";
import { AppContext } from "@/lib/store";
import { defaultAssessmentSections } from "@/lib/assessment-data";
import type { AssessmentSection, SMEProfile, InventoryItem, SalesEntry, Page, AssessmentSubPage } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import Dashboard from "@/components/Dashboard";
import SMERegistration from "@/components/SMERegistration";
import Assessment from "@/components/Assessment";
import Inventory from "@/components/Inventory";
import Sales from "@/components/Sales";

const defaultInventory: InventoryItem[] = [
  { id: "inv-1", name: "Office Printer Paper (A4)", quantity: 5, lowStockThreshold: 20 },
  { id: "inv-2", name: "USB-C Cables", quantity: 45, lowStockThreshold: 10 },
  { id: "inv-3", name: "Wireless Mouse", quantity: 8, lowStockThreshold: 15 },
  { id: "inv-4", name: "Network Switch (8-port)", quantity: 12, lowStockThreshold: 5 },
];

const defaultSales: SalesEntry[] = [
  { id: "sale-1", invoiceNumber: "INV-2026-001", customerName: "Acme Corp", amount: 2500, date: "2026-03-20", paymentStatus: "Paid" },
  { id: "sale-2", invoiceNumber: "INV-2026-002", customerName: "TechStart Ltd", amount: 1800, date: "2026-03-22", paymentStatus: "Pending" },
  { id: "sale-3", invoiceNumber: "INV-2026-003", customerName: "GreenFoods Inc", amount: 950, date: "2026-03-24", paymentStatus: "Overdue" },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [assessmentSubPage, setAssessmentSubPage] = useState<AssessmentSubPage>("overview");
  const [smeProfile, setSmeProfile] = useState<SMEProfile>({
    smeId: "",
    businessType: "",
    location: "Urban",
    employees: "",
    yearsOfOperation: "",
  });
  const [assessmentSections, setAssessmentSections] = useState<AssessmentSection[]>(
    defaultAssessmentSections.map((s) => ({
      ...s,
      questions: s.questions.map((q) => ({ ...q })),
    }))
  );
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory);
  const [sales, setSales] = useState<SalesEntry[]>(defaultSales);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const setAssessmentAnswer = (sectionId: string, questionId: string, value: number) => {
    setAssessmentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, answer: value } : q
              ),
            }
          : section
      )
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "registration":
        return <SMERegistration />;
      case "assessment":
        return <Assessment />;
      case "inventory":
        return <Inventory />;
      case "sales":
        return <Sales />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        assessmentSubPage,
        setAssessmentSubPage,
        smeProfile,
        setSmeProfile,
        assessmentSections,
        setAssessmentAnswer,
        inventory,
        setInventory,
        sales,
        setSales,
        userDropdownOpen,
        setUserDropdownOpen,
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <TopNav />
        <main
          className="ml-64 pt-16 p-6"
          onClick={() => setUserDropdownOpen(false)}
        >
          {renderPage()}
        </main>
      </div>
    </AppContext.Provider>
  );
}
