// Assessment page handling
(function() {
    'use strict';

    const sections = [];
    let currentSmeId = '';

    document.addEventListener('DOMContentLoaded', function() {
        loadAssessmentData();
        document.getElementById('smeId').addEventListener('change', function(e) {
            currentSmeId = e.target.value;
            loadAssessmentData(currentSmeId);
        });
        document.getElementById('submit-assessment').addEventListener('click', submitAssessment);
        document.getElementById('reset-assessment').addEventListener('click', resetAssessment);
    });

    async function loadAssessmentData(smeId) {
        if (!smeId && document.getElementById('assessment-sections').children.length === 0) {
            smeId = null; // first load - get default sections
        } else if (!smeId) {
            return; // don't reload if no SME ID and already loaded
        }

        try {
            const data = await API.get('/api/assessment/data' + (smeId ? `?smeId=${smeId}` : ''));
            renderAssessment(data.sections);
            updateSummary(data.summary);
        } catch (error) {
            console.error('Failed to load assessment:', error);
            // For demo, use default sections
            renderDefaultSections();
        }
    }

    function renderDefaultSections() {
        const sectionsData = [
            {
                id: 'infrastructure',
                title: 'Infrastructure Readiness',
                icon: 'server',
                questions: [
                    { id: 'infra-1', text: 'Does your business have reliable internet connectivity?', tooltip: 'Consistent broadband or fiber connection.', answer: null },
                    { id: 'infra-2', text: 'Do you have adequate hardware (computers, servers, devices)?', tooltip: 'Modern devices capable of running business software.', answer: null },
                    { id: 'infra-3', text: 'Is your business using cloud-based services?', tooltip: 'Cloud platforms like Google Workspace, Microsoft 365.', answer: null },
                    { id: 'infra-4', text: 'Do you have dedicated IT support?', tooltip: 'Internal IT staff or external provider.', answer: null },
                    { id: 'infra-5', text: 'Is network infrastructure regularly maintained?', tooltip: 'Routine checks and updates.', answer: null }
                ]
            },
            {
                id: 'financial',
                title: 'Financial Readiness',
                icon: 'dollar',
                questions: [
                    { id: 'fin-1', text: 'Do you use digital accounting software?', tooltip: 'Tools like QuickBooks, Xero.', answer: null },
                    { id: 'fin-2', text: 'Do you accept digital payments?', tooltip: 'Mobile money, cards, online transfers.', answer: null },
                    { id: 'fin-3', text: 'Budget allocated for digital transformation?', tooltip: 'Funds set aside for tech investments.', answer: null },
                    { id: 'fin-4', text: 'Access to digital banking?', tooltip: 'Online banking, fintech services.', answer: null },
                    { id: 'fin-5', text: 'Are financial records digitized?', tooltip: 'Electronic record-keeping.', answer: null }
                ]
            },
            {
                id: 'skills',
                title: 'Digital Skills & Workforce',
                icon: 'users',
                questions: [
                    { id: 'skill-1', text: 'Basic digital literacy?', tooltip: 'Email, spreadsheets, documents.', answer: null },
                    { id: 'skill-2', text: 'Formal digital skills training?', tooltip: 'Workshops, certifications.', answer: null },
                    { id: 'skill-3', text: 'Collaboration tools?', tooltip: 'Slack, Teams, Zoom.', answer: null },
                    { id: 'skill-4', text: 'Digital marketing skills?', tooltip: 'Social media, SEO, email.', answer: null },
                    { id: 'skill-5', text: 'Culture of continuous learning?', tooltip: 'Encouragement for new skills.', answer: null }
                ]
            },
            {
                id: 'cybersecurity',
                title: 'Cybersecurity Preparedness',
                icon: 'shield',
                questions: [
                    { id: 'cyber-1', text: 'Documented cybersecurity policies?', tooltip: 'Written guidelines.', answer: null },
                    { id: 'cyber-2', text: 'Data encryption?', tooltip: 'Encryption for storage and transit.', answer: null },
                    { id: 'cyber-3', text: 'Security awareness training?', tooltip: 'Phishing, social engineering training.', answer: null },
                    { id: 'cyber-4', text: 'Endpoint protection?', tooltip: 'Antivirus, firewall, MDM.', answer: null },
                    { id: 'cyber-5', text: 'Business continuity plan?', tooltip: 'Disaster recovery plan.', answer: null }
                ]
            },
            {
                id: 'strategic',
                title: 'Strategic Readiness',
                icon: 'target',
                questions: [
                    { id: 'strat-1', text: 'Clear digital strategy?', tooltip: 'Roadmap for digital initiatives.', answer: null },
                    { id: 'strat-2', text: 'Customer feedback mechanisms?', tooltip: 'Digital feedback collection.', answer: null },
                    { id: 'strat-3', text: 'Online presence?', tooltip: 'Website and social media.', answer: null },
                    { id: 'strat-4', text: 'Agile operations?', tooltip: 'Flexibility to adapt.', answer: null },
                    { id: 'strat-5', text: 'Innovation culture?', tooltip: 'Encouraging new ideas.', answer: null }
                ]
            }
        ];
        renderAssessment(sectionsData);
        updateSummary({ totalQuestions: 25, answeredCount: 0, overallScore: 0, sectionScores: [] });
    }

    function renderAssessment(sectionsList) {
        const container = document.getElementById('assessment-sections');
        container.innerHTML = '';

        sectionsList.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'assessment-section';
            sectionEl.innerHTML = `
                <div class="section-header" onclick="toggleSection('${section.id}')">
                    <svg class="section-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                    <span class="section-title">${section.title}</span>
                    <span class="text-sm text-gray-500">0/${section.questions.length}</span>
                </div>
                <div class="section-content" id="section-${section.id}">
                    ${section.questions.map(q => renderQuestion(q)).join('')}
                </div>
            `;
            container.appendChild(sectionEl);
            sections.push({ id: section.id, questions: section.questions });
        });

        updateProgress();
    }

    function renderQuestion(question) {
        return `
            <div class="question-item">
                <div class="question-header">
                    <span class="question-text">${question.text}</span>
                    ${question.tooltip ? `
                        <span class="question-tooltip">
                            <svg class="tooltip-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="tooltip-text">${question.tooltip}</span>
                        </span>
                    ` : ''}
                </div>
                <div class="rating-options">
                    <button class="rating-btn" data-question="${question.id}" data-value="1">1</button>
                    <button class="rating-btn" data-question="${question.id}" data-value="2">2</button>
                    <button class="rating-btn" data-question="${question.id}" data-value="3">3</button>
                    <button class="rating-btn" data-question="${question.id}" data-value="4">4</button>
                    <button class="rating-btn" data-question="${question.id}" data-value="5">5</button>
                </div>
            </div>
        `;
    }

    // Initialize rating buttons after rendering
    setTimeout(() => {
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const questionId = this.getAttribute('data-question');
                const value = parseInt(this.getAttribute('data-value'));
                selectRating(questionId, value);
            });
        });
    }, 0);

    function selectRating(questionId, value) {
        // Update button states
        document.querySelectorAll(`[data-question="${questionId}"]`).forEach(btn => {
            const btnValue = parseInt(btn.getAttribute('data-value'));
            btn.classList.remove('selected');
            if (btnValue === value) {
                btn.classList.add('selected');
            } else if (btnValue < value) {
                btn.classList.add('empty');
            } else {
                btn.classList.remove('empty');
            }
        });

        updateProgress();
    }

    function updateProgress() {
        let answeredCount = 0;
        let totalQuestions = 0;
        let sectionIndex = 0;

        sections.forEach(section => {
            let sectionAnswered = 0;
            section.questions.forEach(q => {
                totalQuestions++;
                const selectedBtn = document.querySelector(`[data-question="${q.id}"].selected`);
                if (selectedBtn) {
                    sectionAnswered++;
                    answeredCount++;
                }
            });

            // Update section header
            const sectionEl = document.getElementById(`section-${section.id}`);
            if (sectionEl) {
                const header = sectionEl.previousElementSibling;
                const counter = header.querySelector('.text-sm.text-gray-500');
                if (counter) {
                    counter.textContent = `${sectionAnswered}/${section.questions.length}`;
                }
            }

            // Update section score in summary
            updateSectionScore(sectionIndex, sectionAnswered, section.questions.length);
            sectionIndex++;
        });

        document.getElementById('progress-text').textContent = `${answeredCount}/${totalQuestions}`;
        const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Enable/disable submit button
        document.getElementById('submit-assessment').disabled = answeredCount < totalQuestions;
    }

    function updateSectionScore(index, answered, total) {
        const scoresContainer = document.getElementById('section-scores');
        let item = scoresContainer.children[index];
        if (!item) {
            item = document.createElement('div');
            item.className = 'flex items-center justify-between text-sm';
            scoresContainer.appendChild(item);
        }
        const score = total > 0 ? Math.round((answered / total) * 100) : 0;
        item.innerHTML = `
            <span class="text-gray-600">${getSectionName(index)}</span>
            <span class="font-medium ${score === 100 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : 'text-amber-600'}">${score}%</span>
        `;
    }

    function getSectionName(index) {
        const names = ['Infrastructure', 'Financial', 'Skills', 'Cybersecurity', 'Strategic'];
        return names[index] || 'Section';
    }

    async function submitAssessment() {
        const smeId = document.getElementById('smeId').value;
        if (!smeId) {
            showToast('Please enter an SME ID', 'error');
            return;
        }

        const answers = {};
        sections.forEach(section => {
            section.questions.forEach(q => {
                const btn = document.querySelector(`[data-question="${q.id}"].selected`);
                answers[q.id] = btn ? parseInt(btn.getAttribute('data-value')) : null;
            });
        });

        try {
            await API.post('/api/assessment/answers', { smeId, answers });
            showToast('Assessment submitted successfully!', 'success');
        } catch (error) {
            console.error('Submission failed:', error);
            showToast('Failed to save assessment', 'error');
        }
    }

    function resetAssessment() {
        if (!confirmAction('Are you sure you want to clear all answers?')) return;

        const smeId = document.getElementById('smeId').value;
        if (smeId) {
            API.delete(`/api/assessment/clear?smeId=${smeId}`).then(() => {
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                document.querySelectorAll('.empty').forEach(el => el.classList.remove('empty'));
                updateProgress();
                showToast('Assessment reset', 'info');
            });
        } else {
            document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.empty').forEach(el => el.classList.remove('empty'));
            updateProgress();
        }
    }

    window.toggleSection = function(sectionId) {
        const content = document.getElementById(`section-${sectionId}`);
        const isHidden = content.style.display === 'none' || getComputedStyle(content).display === 'none';
        content.style.display = isHidden ? 'block' : 'none';
    }
})();
