function loadData() {
    // With data.js, the data is already available globally
    console.log("Data loaded from data.js");
    render('experience');
}

function render(mode) {
    const container = document.getElementById('experience-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'experience') {
        renderExperience(container);
    } else if (mode === 'education') {
        renderEducation(container);
    } else if (mode === 'skills') {
        renderSkills(container);
    } else if (mode === 'contact') {
        renderContact(container);
    }
}

function renderExperience(container) {
    const experiences = experiencesData;
    if (!experiences || experiences.length === 0) return;
    
    const sortedExp = [...experiences].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    
    sortedExp.forEach(exp => {
        const card = document.createElement('article');
        card.className = 'experience-card';
        card.onclick = () => toggleCard(card);
        
        const listItems = exp.details.map((detail) => {
            const parts = detail.split(':');
            if (parts.length > 1) {
                return `<li><strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}</li>`;
            }
            return `<li>${detail.trim()}</li>`;
        }).join('');

        const logoHtml = exp.logo ? `<img src="${exp.logo}" class="company-logo" alt="${exp.company} logo">` : '<div class="company-logo-placeholder"></div>';

        card.innerHTML = `
            <div class="exp-header">
                <h4 class="title-with-break">${exp.title}</h4>
                <span class="exp-period">${exp.period}</span>
            </div>
            <div class="exp-company-row">
                ${logoHtml}
                <div class="exp-company">${exp.company}</div>
            </div>
            <div class="card-hint">Key Contributions <span class="arrow">▼</span></div>
            <div class="expanded-content">
                <ul>${listItems}</ul>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderEducation(container) {
    const education = educationData;
    const list = document.createElement('div');
    list.className = 'education-list';
    
    education.forEach(edu => {
        const card = document.createElement('div');
        card.className = 'education-card static-card'; // Add static-card class
        
        card.innerHTML = `
            <div class="edu-header">
                <h4>${edu.degree}</h4>
            </div>
            <div class="edu-institution">${edu.institution}</div>
            <div class="edu-year">${edu.year}</div>
            <div class="edu-details-visible">
                ${edu.details}
            </div>
        `;
        list.appendChild(card);
    });
    container.appendChild(list);
}

function renderSkills(container) {
    const skills = skillsData;
    const grid = document.createElement('div');
    grid.className = 'skills-grid-ux';
    
    const icons = {
        leadership: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        digital: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
        finance: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        languages: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    };

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card-ux';
        
        const listItems = skill.details.map(detail => `<li>${detail}</li>`).join('');

        card.innerHTML = `
            <div class="skill-icon-container">${icons[skill.icon] || ''}</div>
            <h3>${skill.category}</h3>
            <ul>${listItems}</ul>
        `;
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderContact(container) {
    container.innerHTML = `
        <div class="contact-section-advanced">
            <div class="contact-link">
                <strong>Email:</strong> <a href="mailto:hnattawee@gmail.com">hnattawee@gmail.com</a>
            </div>
            <div class="contact-link">
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nattawee-h-48908b92/" target="_blank">View Profile</a>
            </div>
            <div class="contact-link">
                <strong>GitHub:</strong> <span class="placeholder">[Coming Soon]</span>
            </div>
            <div class="contact-link">
                <strong>Website:</strong> <span class="placeholder">[Coming Soon]</span>
            </div>
        </div>
    `;
}

function toggleCard(element) {
    const content = element.querySelector('.expanded-content');
    const isExpanded = element.classList.contains('expanded');
    
    if (isExpanded) {
        element.classList.remove('expanded');
        content.style.display = "none";
    } else {
        element.classList.add('expanded');
        content.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    const toggles = document.getElementById('experience-toggles');
    if (toggles) {
        toggles.addEventListener('click', (e) => {
            const btn = e.target.closest('.toggle-btn');
            if (btn) {
                render(btn.dataset.mode);
            }
        });
    }
});

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorDisplay = document.getElementById('login-error');
    const password = "Welcome2026";
    
    if (input === password) {
        const loginCard = document.getElementById('login-card');
        const welcomeMsg = document.getElementById('welcome-message');
        const overlay = document.getElementById('login-overlay');
        const mainContent = document.getElementById('main-content');
        
        // 1. Fade out login card
        loginCard.classList.add('fade-out');
        
        setTimeout(() => {
            loginCard.style.display = 'none';
            welcomeMsg.style.display = 'block';
            
            // 2. Trigger welcome message fade in
            setTimeout(() => {
                welcomeMsg.classList.add('fade-in');
            }, 50);

            // 3. Show welcome message for 5 seconds (as requested)
            setTimeout(() => {
                welcomeMsg.style.opacity = '0';
                
                // 4. Fade in main content
                setTimeout(() => {
                    overlay.style.display = 'none';
                    mainContent.style.display = 'block';
                    document.body.classList.remove('locked');
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 50);
                }, 1000); // Slightly longer fade for main content
            }, 5000); // Display for 5s
        }, 500);
    } else {
        errorDisplay.textContent = 'Incorrect password. Please try again.';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

function handleLoginKeyPress(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}