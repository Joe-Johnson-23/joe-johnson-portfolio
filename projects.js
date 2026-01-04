const projects = [
    {
        title: "GradeCoin.io",
        category: "AI Application",
        description: "AI-powered coin grader for Morgan dollars using machine learning.",
        detailsTitle: "AI Coin Grading Platform",
        details: "Developed an AI-powered coin grading application that uses machine learning to analyze and grade Morgan dollars. The platform provides accurate, consistent grading assessments to help collectors and dealers evaluate their coins with confidence.",
        image: "images/gradecoin.png",
        techStack: ["AI", "Machine Learning", "React", "Python"],
        demoLink: "https://www.gradecoin.io",
        githubLink: null
    },
    {
        title: "Dollars and Cents",
        category: "E-Commerce",
        description: "Numismatic website for the brick and mortar coin shop in Rochester, IL.",
        detailsTitle: "Numismatic E-Commerce Platform",
        details: "Built a comprehensive e-commerce platform for a brick and mortar coin shop, featuring inventory management, product showcasing, and an intuitive shopping experience for coin collectors and enthusiasts.",
        image: "images/dollarsandcents.png",
        techStack: ["Web Development", "E-Commerce", "JavaScript"],
        demoLink: "https://www.dollarsandcents.io",
        githubLink: null
    },
    {
        title: "Infinite Spirals",
        category: "Interactive Simulation",
        description: "A mesmerizing double pendulum visualization demonstrating chaos theory.",
        detailsTitle: "Double Pendulum Physics Simulation",
        details: "Created an interactive double pendulum visualization that demonstrates chaos theory through physics simulation. Features multiple pendulums with customizable parameters, trail effects, gravity controls, and real-time angle adjustments. Small differences in initial conditions create dramatically different trajectories over time.",
        image: "images/infinitespiral.png",
        techStack: ["JavaScript", "React", "Physics", "Canvas"],
        demoLink: "https://joe-johnson-23.github.io/infinite-spiral",
        githubLink: "https://github.com/Joe-Johnson-23/infinite-spiral"
    },
    {
        title: "Health Insurance Dashboard",
        category: "Data Visualization",
        description: "Interactive dashboard exploring how education affects health insurance coverage.",
        detailsTitle: "Health & Education Analytics Dashboard",
        details: "Developed an interactive data visualization dashboard exploring the relationship between education levels and health insurance coverage in the United States (2010-2024). Features trend charts, stacked bar charts, radar comparisons, animated statistics, and data export capabilities. Built with React, Chart.js, and Framer Motion.",
        image: "images/healthdashboard.png",
        techStack: ["React", "Chart.js", "Data Visualization", "Framer Motion"],
        demoLink: "https://joe-johnson-23.github.io/health-insurance-dashboard/",
        githubLink: "https://github.com/Joe-Johnson-23/health-insurance-dashboard"
    }
];

function showProjectDetails(projectTitle) {
    const project = projects.find(p => p.title === projectTitle);
    if (!project || !project.details) return;

    const modal = document.getElementById('projectDetailsModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCategory = modal.querySelector('.modal-category');
    const modalDetailsTitle = modal.querySelector('.modal-details-title');
    const modalDetails = modal.querySelector('.modal-details');
    const modalTechStack = modal.querySelector('.modal-tech-stack');

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;

    if (project.detailsTitle) {
        modalDetailsTitle.textContent = project.detailsTitle;
        modalDetailsTitle.style.display = 'block';
    } else {
        modalDetailsTitle.style.display = 'none';
    }

    modalDetails.textContent = project.details;
    modalTechStack.innerHTML = project.techStack.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectDetails() {
    const modal = document.getElementById('projectDetailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectDetails();
    }
});

function createProjects() {
}

document.addEventListener('DOMContentLoaded', createProjects);
