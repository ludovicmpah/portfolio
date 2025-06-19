/*
   Portfolio - Spécialiste en Audit Financier
   script.js - Fonctionnalités interactives
*/

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION MOBILE =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu on burger click
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
            
            // Animation des lignes du burger
            const lines = burger.querySelectorAll('div');
            lines.forEach(line => line.classList.toggle('active'));
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // ===== MODAL PROJETS =====
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalDesc = document.getElementById('modal-description');
    const modalDownload = document.getElementById('modal-download');
    const modalOpen = document.getElementById('modal-open');
    
    // Données des projets (simulation d'une base de données)
    const projectsData = [
        {
            id: 1,
            title: "Tableau de Bord RH",
            imgSrc: "assets/images/image_01.png",
            description: "Ce tableau de bord offre une vue d'ensemble synthétique des effectifs, de l'âge moyen, de la rémunération et de la dynamique d'embauche. Il présente une répartition des effectifs et de la masse salariale par service, des embauches par année, une ventilation par sexe, et une classification par catégories socio-professionnelles.",
            downloadLink: "#",
            googleSheetLink: "https://docs.google.com/spreadsheets/d/189yGuWuI0TCJGubWfQFHhmntzmMcfKk4ZfejwwCDGns/edit?usp=sharing"
        },
        {
            id: 2,
            title: "Tableau de Bord des Ventes",
            imgSrc: "assets/images/image_02.png",
            description: "Ce tableau de bord permet une analyse en temps réel de l'activité commerciale d'une entreprise en suivant la performance des ventes par mois, en évaluant l'efficacité des différents canaux (magasin vs téléphone), en identifiant les vendeurs les plus performants, en analysant la répartition des recettes par article et par pays, tout en assurant le suivi des paiements grâce à l'indicateur « reste à payer » et en proposant un tableau détaillé des transactions avec toutes les informations clés (date, article, canal, nombre de ventes, recettes, CA attendu, reste à payer, pays et vendeur).",
            downloadLink: "#",
            googleSheetLink: "https://docs.google.com/spreadsheets/d/1_vRnqWU3swMNC1UASydRhqJLnrrOukCOJ6Nli2LUwgg/edit?usp=sharing"
        },
        {
            id: 3,
            title: "Tableau de Bord de Suivi des Dépenses",
            imgSrc: "assets/images/image_03.png",
            description: "Ce tableau de bord permet une gestion financière détaillée en offrant une vue claire de l'équilibre entre revenus et dépenses, une analyse des postes de dépenses par catégories et sous-catégories, un suivi mensuel des flux financiers, ainsi qu'une distinction entre les sources de fonds pour optimiser la trésorerie et l'usage du crédit.",
            downloadLink: "#",
            googleSheetLink: "https://docs.google.com/spreadsheets/d/12ryDAnWpRwdIfjd9AVJ7kaJVA6oOzkSluXoPs8XvmN4/edit?usp=sharing"
        },
        {
            id: 4,
            title: "Suivi de Trésorerie",
            imgSrc: "assets/images/image_04.png",
            description: "Ce tableau de bord offre aux équipes commerciales une vue synthétique et interactive des performances des points de vente, en facilitant l'analyse de la fréquentation, des ventes, des tendances annuelles et de la répartition des clients par localité.",
            downloadLink: "#",
            googleSheetLink: "https://docs.google.com/spreadsheets/d/1CuPn3w1p056QkNf4YeN25Lhlk7MlWlL8jPHpo3IWcXw/edit?usp=sharing"
        }
    ];
    
    // Ouvrir le modal au clic sur une card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                modalTitle.textContent = project.title;
                modalImg.src = project.imgSrc;
                modalImg.alt = project.title;
                modalDesc.textContent = project.description;
                modalDownload.href = project.downloadLink;
                modalOpen.href = project.googleSheetLink;
                
                // Afficher le modal avec animation
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Empêcher le scroll
            }
        });
    });
    
    // Fermer le modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll
        });
    }
    
    // Fermer le modal en cliquant en dehors du contenu
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== VALIDATION DU FORMULAIRE =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs des champs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Réinitialiser les messages d'erreur
            document.getElementById('name-error').textContent = '';
            document.getElementById('email-error').textContent = '';
            document.getElementById('message-error').textContent = '';
            
            // Valider les champs
            let isValid = true;
            
            if (name === '') {
                document.getElementById('name-error').textContent = 'Veuillez entrer votre nom';
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('email-error').textContent = 'Veuillez entrer votre email';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Veuillez entrer un email valide';
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('message-error').textContent = 'Veuillez entrer votre message';
                isValid = false;
            }
            
            // Si le formulaire est valide, ouvrir Outlook
            if (isValid) {
                // Préparer le sujet et le corps du message pour l'email
                const subject = 'Contact depuis le Portfolio - ' + name;
                const body = 'Nom: ' + name + '\n\nEmail: ' + email + '\n\nMessage: ' + message;
                
                // Créer l'URL mailto
                const mailtoUrl = 'mailto:ludompah@gmail.com' + 
                                  '?subject=' + encodeURIComponent(subject) + 
                                  '&body=' + encodeURIComponent(body);
                
                // Animation de chargement (optionnel)
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Ouverture d\'Outlook...';
                submitBtn.disabled = true;
                
                // Ouvrir la fenêtre d'email
                window.location.href = mailtoUrl;
                
                // Réinitialiser le formulaire et restaurer le bouton après un court délai
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }
    
    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===== ANIMATION AU SCROLL =====
    // Animation des barres de compétences lorsqu'elles sont visibles
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Observer pour déclencher les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Récupérer la largeur définie en CSS
                const width = entry.target.style.width;
                
                // Réinitialiser d'abord à 0
                entry.target.style.width = '0';
                
                // Puis animer vers la largeur cible
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                
                // Ne plus observer cet élément une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observer chaque barre de compétence
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Animation des cards de projets au scroll
    const projectCards2 = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour chaque card
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, index * 100);
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observer chaque card de projet
    projectCards2.forEach(card => {
        projectObserver.observe(card);
    });
});
