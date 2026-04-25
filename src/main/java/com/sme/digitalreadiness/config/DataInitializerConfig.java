package com.sme.digitalreadiness.config;

import com.sme.digitalreadiness.model.AssessmentQuestion;
import com.sme.digitalreadiness.model.AssessmentSection;
import com.sme.digitalreadiness.repository.AssessmentQuestionRepository;
import com.sme.digitalreadiness.repository.AssessmentSectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializerConfig {

    @Bean
    CommandLineRunner initData(AssessmentSectionRepository sectionRepo,
                               AssessmentQuestionRepository questionRepo) {
        return args -> {
            if (sectionRepo.count() == 0) {
                // Infrastructure Readiness
                AssessmentSection infra = new AssessmentSection("infrastructure", "Infrastructure Readiness", "server", 1);
                infra.addQuestion(new AssessmentQuestion("infra-1", "Does your business have reliable internet connectivity?", "Consistent broadband or fiber connection with sufficient speed for business operations.", 1));
                infra.addQuestion(new AssessmentQuestion("infra-2", "Do you have adequate hardware (computers, servers, devices) for digital operations?", "Modern devices capable of running required business software and applications.", 2));
                infra.addQuestion(new AssessmentQuestion("infra-3", "Is your business using cloud-based services for data storage or applications?", "Cloud platforms like Google Workspace, Microsoft 365, AWS, or Azure for hosting or storage.", 3));
                infra.addQuestion(new AssessmentQuestion("infra-4", "Do you have a dedicated IT support resource or managed service provider?", "Internal IT staff or external provider for technical support and maintenance.", 4));
                infra.addQuestion(new AssessmentQuestion("infra-5", "Is your network infrastructure regularly maintained and updated?", "Routine checks, firmware updates, and hardware replacement schedules in place.", 5));
                sectionRepo.save(infra);

                // Financial Readiness
                AssessmentSection financial = new AssessmentSection("financial", "Financial Readiness", "dollar", 2);
                financial.addQuestion(new AssessmentQuestion("fin-1", "Do you use digital accounting or financial management software?", "Tools like QuickBooks, Xero, FreshBooks, or similar for bookkeeping and financial tracking.", 1));
                financial.addQuestion(new AssessmentQuestion("fin-2", "Does your business accept digital payments (mobile money, cards, online transfers)?", "Ability to receive payments through electronic channels beyond cash.", 2));
                financial.addQuestion(new AssessmentQuestion("fin-3", "Is there a dedicated budget allocated for digital transformation initiatives?", "Specific funds set aside for technology investments and digital tools.", 3));
                financial.addQuestion(new AssessmentQuestion("fin-4", "Do you have access to digital banking and financial services?", "Online banking, digital lending platforms, or fintech services for business finance.", 4));
                financial.addQuestion(new AssessmentQuestion("fin-5", "Are your financial records digitized and backed up?", "Electronic record-keeping with secure backup rather than paper-only records.", 5));
                sectionRepo.save(financial);

                // Digital Skills & Workforce
                AssessmentSection skills = new AssessmentSection("skills", "Digital Skills & Workforce", "users", 3);
                skills.addQuestion(new AssessmentQuestion("skill-1", "Do employees have basic digital literacy (email, spreadsheets, documents)?", "Ability to use common office productivity tools for daily tasks.", 1));
                skills.addQuestion(new AssessmentQuestion("skill-2", "Has your workforce received formal digital skills training in the past year?", "Structured training programs, workshops, or certifications on digital tools.", 2));
                skills.addQuestion(new AssessmentQuestion("skill-3", "Does your business use collaboration tools (Slack, Teams, Zoom)?", "Digital platforms for team communication, video conferencing, and project collaboration.", 3));
                skills.addQuestion(new AssessmentQuestion("skill-4", "Do you have staff capable of managing digital marketing (social media, SEO, email)?", "Skills in online marketing channels, content creation, and digital advertising.", 4));
                skills.addQuestion(new AssessmentQuestion("skill-5", "Is there a culture of continuous digital learning in your organization?", "Encouragement and resources for employees to learn new digital skills regularly.", 5));
                sectionRepo.save(skills);

                // Cybersecurity Preparedness
                AssessmentSection cybersecurity = new AssessmentSection("cybersecurity", "Cybersecurity Preparedness", "shield", 4);
                cybersecurity.addQuestion(new AssessmentQuestion("cyber-1", "Do you have documented cybersecurity policies and procedures?", "Written guidelines for password management, data handling, and incident response.", 1));
                cybersecurity.addQuestion(new AssessmentQuestion("cyber-2", "Is data encrypted in storage and transit?", "Using encryption for sensitive data at rest and HTTPS/TLS for data in transit.", 2));
                cybersecurity.addQuestion(new AssessmentQuestion("cyber-3", "Do employees receive regular cybersecurity awareness training?", "Training on phishing, social engineering, and safe online practices.", 3));
                cybersecurity.addQuestion(new AssessmentQuestion("cyber-4", "Do you have endpoint protection (antivirus, firewall, MDM)?", "Security software on all devices including servers, workstations, and mobile devices.", 4));
                cybersecurity.addQuestion(new AssessmentQuestion("cyber-5", "Is there a business continuity or disaster recovery plan in place?", "A documented plan for recovering operations after a cyber incident or system failure.", 5));
                sectionRepo.save(cybersecurity);

                // Strategic Readiness
                AssessmentSection strategic = new AssessmentSection("strategic", "Strategic Readiness", "target", 5);
                strategic.addQuestion(new AssessmentQuestion("strat-1", "Does your business have a clear digital transformation strategy?", "A documented roadmap with goals and milestones for digital initiatives.", 1));
                strategic.addQuestion(new AssessmentQuestion("strat-2", "Do you collect and utilize customer feedback digitally?", "Digital mechanisms for gathering and analyzing customer insights.", 2));
                strategic.addQuestion(new AssessmentQuestion("strat-3", "Is your business present online (website, social media)?", "Active digital presence that reaches customers.", 3));
                strategic.addQuestion(new AssessmentQuestion("strat-4", "Can your operations adapt quickly to digital changes?", "Agility in adopting new technologies and processes.", 4));
                strategic.addQuestion(new AssessmentQuestion("strat-5", "Do you foster innovation and experimentation?", "Culture that encourages trying new digital solutions.", 5));
                sectionRepo.save(strategic);

                System.out.println("✅ Assessment data seeded successfully!");
            }
        };
    }
}
