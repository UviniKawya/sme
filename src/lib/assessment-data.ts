import type { AssessmentSection } from "./types";

export const defaultAssessmentSections: AssessmentSection[] = [
  {
    id: "infrastructure",
    title: "Infrastructure Readiness",
    icon: "server",
    questions: [
      {
        id: "infra-1",
        text: "Does your business have reliable internet connectivity?",
        tooltip: "Consistent broadband or fiber connection with sufficient speed for business operations.",
        answer: null,
      },
      {
        id: "infra-2",
        text: "Do you have adequate hardware (computers, servers, devices) for digital operations?",
        tooltip: "Modern devices capable of running required business software and applications.",
        answer: null,
      },
      {
        id: "infra-3",
        text: "Is your business using cloud-based services for data storage or applications?",
        tooltip: "Cloud platforms like Google Workspace, Microsoft 365, AWS, or Azure for hosting or storage.",
        answer: null,
      },
      {
        id: "infra-4",
        text: "Do you have a dedicated IT support resource or managed service provider?",
        tooltip: "Internal IT staff or external provider for technical support and maintenance.",
        answer: null,
      },
      {
        id: "infra-5",
        text: "Is your network infrastructure regularly maintained and updated?",
        tooltip: "Routine checks, firmware updates, and hardware replacement schedules in place.",
        answer: null,
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Readiness",
    icon: "dollar",
    questions: [
      {
        id: "fin-1",
        text: "Do you use digital accounting or financial management software?",
        tooltip: "Tools like QuickBooks, Xero, FreshBooks, or similar for bookkeeping and financial tracking.",
        answer: null,
      },
      {
        id: "fin-2",
        text: "Does your business accept digital payments (mobile money, cards, online transfers)?",
        tooltip: "Ability to receive payments through electronic channels beyond cash.",
        answer: null,
      },
      {
        id: "fin-3",
        text: "Is there a dedicated budget allocated for digital transformation initiatives?",
        tooltip: "Specific funds set aside for technology investments and digital tools.",
        answer: null,
      },
      {
        id: "fin-4",
        text: "Do you have access to digital banking and financial services?",
        tooltip: "Online banking, digital lending platforms, or fintech services for business finance.",
        answer: null,
      },
      {
        id: "fin-5",
        text: "Are your financial records digitized and backed up?",
        tooltip: "Electronic record-keeping with secure backup rather than paper-only records.",
        answer: null,
      },
    ],
  },
  {
    id: "skills",
    title: "Digital Skills & Workforce",
    icon: "users",
    questions: [
      {
        id: "skill-1",
        text: "Do employees have basic digital literacy (email, spreadsheets, documents)?",
        tooltip: "Ability to use common office productivity tools for daily tasks.",
        answer: null,
      },
      {
        id: "skill-2",
        text: "Has your workforce received formal digital skills training in the past year?",
        tooltip: "Structured training programs, workshops, or certifications on digital tools.",
        answer: null,
      },
      {
        id: "skill-3",
        text: "Does your business use collaboration tools (Slack, Teams, Zoom)?",
        tooltip: "Digital platforms for team communication, video conferencing, and project collaboration.",
        answer: null,
      },
      {
        id: "skill-4",
        text: "Do you have staff capable of managing digital marketing (social media, SEO, email)?",
        tooltip: "Skills in online marketing channels, content creation, and digital advertising.",
        answer: null,
      },
      {
        id: "skill-5",
        text: "Is there a culture of continuous digital learning in your organization?",
        tooltip: "Encouragement and resources for employees to learn new digital skills regularly.",
        answer: null,
      },
    ],
  },
  {
    id: "strategic",
    title: "Strategic Planning",
    icon: "target",
    questions: [
      {
        id: "strat-1",
        text: "Does your business have a documented digital strategy or roadmap?",
        tooltip: "A written plan outlining digital goals, timelines, and investment priorities.",
        answer: null,
      },
      {
        id: "strat-2",
        text: "Do you use data analytics to inform business decisions?",
        tooltip: "Using data from sales, customers, or operations to guide strategy and operations.",
        answer: null,
      },
      {
        id: "strat-3",
        text: "Does your business have an online presence (website, social media profiles)?",
        tooltip: "Active website and/or social media channels for customer engagement and brand visibility.",
        answer: null,
      },
      {
        id: "strat-4",
        text: "Have you identified key digital transformation goals for the next 12 months?",
        tooltip: "Clear objectives for adopting or improving digital capabilities in the near term.",
        answer: null,
      },
      {
        id: "strat-5",
        text: "Do you benchmark your digital maturity against industry peers or standards?",
        tooltip: "Comparing your digital capabilities with competitors or recognized frameworks.",
        answer: null,
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Preparedness",
    icon: "shield",
    questions: [
      {
        id: "cyber-1",
        text: "Do you have documented cybersecurity policies and procedures?",
        tooltip: "Written guidelines for password management, data handling, and incident response.",
        answer: null,
      },
      {
        id: "cyber-2",
        text: "Is data encrypted in storage and transit?",
        tooltip: "Using encryption for sensitive data at rest and HTTPS/TLS for data in transit.",
        answer: null,
      },
      {
        id: "cyber-3",
        text: "Do employees receive regular cybersecurity awareness training?",
        tooltip: "Training on phishing, social engineering, and safe online practices.",
        answer: null,
      },
      {
        id: "cyber-4",
        text: "Do you have endpoint protection (antivirus, firewall, MDM)?",
        tooltip: "Security software on all devices including servers, workstations, and mobile devices.",
        answer: null,
      },
      {
        id: "cyber-5",
        text: "Is there a business continuity or disaster recovery plan in place?",
        tooltip: "A documented plan for recovering operations after a cyber incident or system failure.",
        answer: null,
      },
    ],
  },
];
