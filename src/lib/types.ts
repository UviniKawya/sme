export interface AssessmentQuestion {
  id: string;
  text: string;
  tooltip: string;
  answer: number | null;
}

export interface AssessmentSection {
  id: string;
  title: string;
  icon: string;
  questions: AssessmentQuestion[];
}

export interface SMEProfile {
  smeId: string;
  businessType: string;
  location: "Urban" | "Rural";
  employees: string;
  yearsOfOperation: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  lowStockThreshold: number;
}

export interface SalesEntry {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  date: string;
  paymentStatus: "Paid" | "Pending" | "Overdue";
}

export type Page =
  | "dashboard"
  | "registration"
  | "assessment"
  | "inventory"
  | "sales";

export type AssessmentSubPage =
  | "overview"
  | "infrastructure"
  | "financial"
  | "skills"
  | "strategic"
  | "cybersecurity";
