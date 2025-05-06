document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    });

    // Navigation
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Active section indicator
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Typing Animation
    const typed = new Typed('.typing', {
        strings: ['Web Developer', 'UI/UX Designer', 'Graphic Designer', 'Freelancer'],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });

    // Project Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectBoxes.forEach(box => {
                if (filter === 'all' || box.getAttribute('data-category') === filter) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });

    // Skills Animation
    const skillBars = document.querySelectorAll('.bar span');
    window.addEventListener('scroll', function() {
        if (window.scrollY > document.querySelector('#skills').offsetTop - 400) {
            skillBars.forEach(bar => {
                const width = bar.parentElement.querySelector('h3 span').textContent;
                bar.style.width = width;
                bar.style.opacity = 1;
            });
        }
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });
    }

    // 3D Background with Three.js
    initThreeJS();

    // GSAP Animations
    initAnimations();
});

function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }

    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff4d5a,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
        wireframe: false
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff4d5a, 1, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded');
        return;
    }

    // Home section animation
    gsap.from('.home-content .text h1', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.home-content .text h2', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.8
    });

    gsap.from('.home-content .text p', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 1.1
    });

    gsap.from('.social-icons a', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 1.4,
        stagger: 0.1
    });

    gsap.from('.home-content .btn', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 1.7,
        stagger: 0.1
    });

    gsap.from('.home-content .image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.5
    });

    // Section animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        }
    });

    // Project animations
    const projects = document.querySelectorAll('.project-box');
    projects.forEach(project => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.1
        });
    });

    // Skills animations
    const skills = document.querySelectorAll('.icon-box');
    skills.forEach(skill => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.1
        });
    });
}