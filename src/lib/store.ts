import { createContext, useContext } from "react";
import type {
  AssessmentSection,
  SMEProfile,
  InventoryItem,
  SalesEntry,
  Page,
  AssessmentSubPage,
} from "./types";

export interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  assessmentSubPage: AssessmentSubPage;
  setAssessmentSubPage: (sub: AssessmentSubPage) => void;
  smeProfile: SMEProfile;
  setSmeProfile: (profile: SMEProfile) => void;
  assessmentSections: AssessmentSection[];
  setAssessmentAnswer: (
    sectionId: string,
    questionId: string,
    value: number
  ) => void;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  sales: SalesEntry[];
  setSales: React.Dispatch<React.SetStateAction<SalesEntry[]>>;
  userDropdownOpen: boolean;
  setUserDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
