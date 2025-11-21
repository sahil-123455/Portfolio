import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Globe, Code, Briefcase, User, Mail, Zap, Sun, Moon, Linkedin, Github, FileText, ArrowLeft, ArrowRight, ArrowUp, Send, CheckCircle, MapPin, AtSign, BookOpen, Monitor, ArrowDown } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

/**
 * Custom Portfolio Replicating the Design & Effects.
 * Name: Sahil Gupta
 * Theme: Dark, Cosmic, Neon Gradient (Teal/Pink/Purple)
 * Features: Three.js 3D Background, Custom Cursor Glow, Scroll/State Interactions.
 *
 * NOTE for Local Setup:
 * 1. Ensure 'import * as THREE from 'three';' is at the very top of your file.
 * 2. Ensure your project images (e.g., /sensai_mockup.png) are in your /public directory.
 */

// --- CONFIGURATION & DUMMY DATA ---

const PORTFOLIO_DATA = {
  name: "Sahil Gupta",
  title: "B.Tech CSE Student & Full Stack Developer",
  tagline: "Passionate about creating innovative solutions and building the future of technology.",

  techStack: ["React", "Next.js", "Node.js", "Springboot", "Java", "JavaScript", "Python", "MySQL"], // Final Updated Tech Stack
  rotatingSkills: [
      { text: "SIH Finalist 2025", icon: Globe }
  ],
  aboutContent: {
    description: "I am a Final-year B.Tech student specializing in Full Stack Development with a robust foundation in data structures and object-oriented programming. My passion lies in building scalable, high-performance web applications using modern technologies like React, Node.js, Spring Boot, and MySQL. I thrive on solving complex, real-world problems, optimizing code for efficiency, and contributing clean, functional solutions to drive ambitious visions forward.",
    journey: [
      { title: "Industry Experience", desc: "Developed and maintained web applications using the Spring Boot framework, Java, React, and MySQL during my Full Stack internship." },
      { title: "Technical Skills", desc: "Possessing a strong foundation in core computer science principles, with a focus on scalable data structures and efficient, object-oriented programming." },
      { title: "Venture Explore", desc: "Specialized in architecting performanance, responsive web interfaces using React/Next.js and ensuring robust backend scalability with Node.js and Spring Boot." },
      { title: "SIH 2025 Finalist", desc: "Team Inno-Vision shortlisted for the Smart India Hackathon Grand Finale, tackling a critical cyber security challenge for the Ministry of Defence (MoD) – Army Cyber Group." },
    ],
    stats: [
      { value: "2+", label: "Months of Experience", icon: <FileText /> },
      { value: "4+", label: "Projects Completed", icon: <Briefcase /> },
    //   { value: "100+", label: "Github Contributions", icon: <Github /> },
      { value: "5+", label: "Certifications Achieved", icon: <CheckCircle /> },
    ],
    
  },
  skills: [
    { id: 'frontend', title: "Frontend Development", icon: <Code className="w-7 h-7 text-teal-400" />, desc: "Creating stunning user interfaces and experiences.", tags: ["HTML", "CSS", "TailwindCSS", "React.js", "Next.js", "Bootstrap"], items: [["HTML", 90], ["CSS", 90], ["TailwindCSS", 95], ["React.js", 85], ["Next.js", 80], ["Bootstrap", 80]] },
    { id: 'backend', title: "Backend Development", icon: <Zap className="w-7 h-7 text-purple-400" />, desc: "Building scalable and robust server-side applications.", tags: ["Springboot", "Node.js", "Express.js", "Rest API"], items: [["Springboot", 85], ["Node.js", 80], ["Express.js", 75], ["Rest API", 80]] },
    { id: 'database', title: "Database Architecture", icon: <Globe className="w-7 h-7 text-pink-400" />, desc: "Designing efficient and secure storage solutions.", tags: ["MySQL", "ORM", "Hibernate"], items: [["MySQL", 85], ["ORM", 80], ["Hibernate", 75]] },
    { id: 'languages', title: "Programming Languages", icon: <Code className="w-7 h-7 text-amber-400" />, desc: "Mastering fundamental programming capabilities.", tags: ["Java", "JavaScript", "Python", "C"], items: [["Java", 90], ["JavaScript", 85], ["Python", 75], ["C", 70]] },
  ],
  education: [
    { year: "2022-2026", degree: "B.Tech in Computer Science & Engineering", institution: "IMS Engineering College", desc: "Applying theoretical knowledge of computer science to build practical solutions. My coursework and personal projects focus on software development, algorithmic efficiency, and creating user-centric applications.", percentage: "77.02%" },
    { year: "2021-2022", degree: "Intermediate Education (12th Grade)", institution: "Model Higher Secondary School", desc: "Focused on Physics, Chemistry, and Mathematics (PCM). Developed strong analytical and problem-solving abilities.", percentage: "81%" },
    { year: "2019-2020", degree: "Secondary Education (10th Grade)", institution: "Chandmari Higher Secondary School", desc: "Completed secondary education with a strong performance in science and mathematics. Cultivated a passion for technology and coding.", percentage: "80%" },
  ],
  // UPDATED PROJECT ORDERING
  projects: [
    // 1. Sensai (Remains first)
    { id: 1, title: "Sensai - AI Career Coach", desc: "A powerful AI-driven platform providing personalized career coaching and interview preparation tools to accelerate professional growth.", tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Google's Gemini AI"], link: "https://sensai-aicoach.vercel.app/", modalDescription: "Sensai leverages the Gemini API to offer tailored advice, mock interviews, and skill gap analysis, making it an essential tool for career advancement in tech.", mockup: "/Sensai.png" },
    
    // 2. QuickShow (Was ID 3)
    { id: 3, title: "QuickShow - Movie Ticket Booking System", desc: "Refactored 1,200+ lines of legacy JS code into modern React components, contributing to a 37% reduction in page load times.", tags: ["React", "Tailwind CSS", "Clerk", "MERN Stack"], link: "https://quickk-showw-client-u3rt.vercel.app/", modalDescription: "Developed complex components (real-time seat map, TMDB filtering) that project inventory error reductions by 99%. Architected MERN system logic, supporting Clerk (Auth) and Ingest automation, accelerating checkout by 32% and reducing manual communication by over 80%.", mockup: "/Quick.png" },

    // 3. HealthConnect (Was ID 5)
    { id: 5, title: "HealthConnect", desc: "A full-featured healthcare appointment system simplifying doctor discovery and health service booking via search, booking, and video consultations.", tags: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript"], link: "https://healthconnect-sg.netlify.app/", modalDescription: "HealthConnect offers features like search and recommendations for nearby doctors, easy online appointment booking, video consultations, and lab test booking. The stack utilizes Node.js, Express.js, and MongoDB for a robust and scalable backend architecture.", mockup: "/health.png" },
    
    // 4. ShelfTrack (Was ID 2)
    { id: 2, title: "ShelfTrack - Library Management System", desc: "A comprehensive library system built to manage book inventory, member records, and borrowing history efficiently. Not deployed live.", tags: ["Spring Boot", "Thymeleaf", "JPA", "MySQL"], link: null, modalDescription: "ShelfTrack is a modern, responsive, and robust Library Management System built with Spring Boot and Thymeleaf. It allows library administrators to efficiently manage books, students, and issue records with real-time analytics. This project showcases full-stack development skills by automating day-to-day library tasks and providing a clean, user-friendly interface for different user roles.", mockup: "/Shelf.png" },

    // 5. Expense Tracker (Was ID 4)
    { id: 4, title: "Expense Tracker", desc: "A responsive, feature-rich daily expense tracker built with React Hooks and Tailwind CSS, demonstrating robust state management and optimization.", tags: ["React Hooks", "Tailwind CSS", "useMemo", "useCallback", "localStorage"], link: "https://expense-tracker-mu-two-19.vercel.app/", modalDescription: "The app comes with smart input handling and real-time validation. Optimized for performance using `useMemo()` and `useCallback()`, it maintains a responsive UI even as data grows. Features include a dynamic filtering system and a Dark Mode Toggle for enhanced UX/UI.", mockup: "/expense.png" },
  ],
  contact: {
    email: "sg2145984@gmail.com",
    location: "Ghaziabad, India",
    linkedin: "https://www.linkedin.com/in/sahil-gupta-baa310274/",
    github: "https://github.com/sahil-123455",
  },
  mockupImages: [ // Mockup images for projects without live links (ShelfTrack, which is now the 4th project in the list above)
      "Shelf1.png",
      "Shelf2.png",
      "Shelf3.jpg",
      "Shelf4.jpg",
  ]
};


// Custom Cursor Glow Effect
const CustomCursor = ({ theme }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // FIX: Increased opacity and reduced blur radius for better visibility
  const color = theme === 'dark' ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255, 165, 0, 0.7)'; // Increased base opacity
  const boxShadow = theme === 'dark' ? '0 0 3px #6366f1, 0 0 6px #6366f1' : '0 0 3px #ffa500, 0 0 6px #ffa500'; // Sharper shadow
  const opacity = 0.40; // Global opacity increased significantly for visibility
  const size = 16; // Reduced size slightly for better pointer feel

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[100] pointer-events-none rounded-full transition-opacity duration-300"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity, // Applied final opacity
        backgroundColor: color,
        boxShadow: boxShadow,
      }}
    />
  );
};

// Toast Notification Component
const ToastNotification = ({ message, show, type, onClose }) => {
    const props = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0%)' : 'translateX(100%)',
        config: { duration: 300 }
    });

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 4000); // Hide after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    const colors = {
        success: { bg: 'bg-green-600', icon: CheckCircle },
    };
    const { bg, icon: Icon } = colors[type];

    return (
        <animated.div 
            style={props}
            className="fixed bottom-6 right-6 z-[110] p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-white max-w-sm"
        >
            <div className={`p-2 rounded-full ${bg}`}>
                <Icon className="w-5 h-5" />
            </div>
            <p className="font-semibold">{message}</p>
            <button onClick={onClose} className="text-white/70 hover:text-white ml-auto">
                <X className="w-4 h-4" />
            </button>
        </animated.div>
    );
};

// --- THREE.JS COSMIC BACKGROUND COMPONENT ---

const ThreeDBackground = () => {
  const mountRef = useRef(null);
  
  const THREE = window.THREE; 

  const initThree = useCallback(() => {
    if (!mountRef.current || typeof THREE === 'undefined') return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = null;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // STAR/PARTICLE FIELD
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // NEON GEOMETRIC SHAPES (Replicating the floating objects)
    const colors = [0x00ffc8, 0x9333ea, 0xff0080, 0xfacc15]; // Teal, Violet, Pink, Amber
    const meshes = [];

    for (let i = 0; i < 5; i++) {
      const geometry = i % 2 === 0 ? new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.3, 0) : new THREE.BoxGeometry(Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3);
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        shininess: 50,
        transparent: true,
        opacity: 0.3,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      meshes.push(mesh);
      scene.add(mesh);
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffc8, 1);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x9333ea, 1);
    pointLight2.position.set(-3, -3, -3);
    scene.add(pointLight2);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      // --- SCROLL CHECK (if needed for scene control) ---
      // const scrollY = window.scrollY; 
      // camera.position.y = -scrollY * 0.001; // Example: Subtle vertical parallax effect
      
      const elapsedTime = clock.getElapsedTime();

      // Particle movement (subtle)
      particleMesh.rotation.y = elapsedTime * 0.01;

      // Mesh rotation and floating
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.008 + index * 0.001;
        
        // Gentle position change
        mesh.position.y += Math.sin(elapsedTime * 0.2 + index) * 0.001;
        mesh.position.x += Math.cos(elapsedTime * 0.15 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };

    // HANDLE RESIZE
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.children.forEach(child => {
        if (child.dispose) child.dispose();
      });
    };
  }, [THREE]); // Dependency added for safety in local environments

  useEffect(() => {
    // Only inject script if THREE is not globally available (for canvas environment)
    if (typeof window.THREE === 'undefined') {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => initThree();
      document.head.appendChild(script);
    } else {
      initThree();
    }
  }, [initThree]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 w-full h-full bg-black"
    />
  );
};

// --- MODAL COMPONENT ---
const ProjectModal = ({ project, show, onClose, isLight }) => {
    // Hooks must be called unconditionally at the top level
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 

    // Reset image index when modal is opened for a new project
    useEffect(() => {
        if (show) {
            setCurrentImageIndex(0);
        }
    }, [show, project]);

    const props = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0%)' : 'translateY(-10%)',
        config: { duration: 300 }
    });

    if (!show || !project) return null; // Check for project existence

    const modalBg = isLight ? 'bg-white' : 'bg-gray-900';
    const textColor = isLight ? 'text-gray-800' : 'text-gray-200';
    const textMuted = isLight ? 'text-gray-600' : 'text-gray-400';
    const cardBg = isLight ? 'bg-gray-100' : 'bg-gray-800';
    
    // Logic for image gallery (Project ID 2 is ShelfTrack)
    const isGallery = project.id === 2 && !project.link; 
    const images = PORTFOLIO_DATA.mockupImages;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <animated.div 
                style={props}
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${modalBg} p-6 md:p-10`}
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
                <div className="flex justify-between items-start mb-6 border-b border-gray-700 pb-4">
                    <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500`}>
                        {project.title}
                    </h2>
                    <button onClick={onClose} className={`p-2 rounded-full ${textMuted} hover:text-white hover:bg-red-500 transition-colors`}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className={`space-y-6 ${textColor}`}>
                    <p className={`text-lg leading-relaxed ${textMuted}`}>
                        {project.modalDescription || project.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-purple-600/20 text-purple-300 text-sm font-medium px-3 py-1 rounded-full border border-purple-500/50">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* BUTTONS: Code (always) */}
                    <div className="flex space-x-4 pt-4">
                        {/* Code Button (Always shows, links to GitHub profile) */}
                        <a
                            href={PORTFOLIO_DATA.contact.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 border shadow-md
                                ${isLight ? 'text-gray-800 border-gray-400 hover:bg-gray-100' : 'text-gray-300 border-gray-700 hover:bg-gray-700/50'}`}
                        >
                            Code <Code className="w-5 h-5 ml-3" />
                        </a>
                        {/* NOTE: Visit Site button removed from modal and moved to ProjectsSection */}
                    </div>


                    {/* IMAGE GALLERY FOR UN-DEPLOYED PROJECTS */}
                    {isGallery && (
                        <div className={`mt-8 p-4 rounded-xl ${cardBg} shadow-inner`}>
                            <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>Project Screenshots (Local Preview)</h3>
                            <div className="relative">
                                <img 
                                    src={images[currentImageIndex]} 
                                    alt={`${project.title} Screenshot ${currentImageIndex + 1}`} 
                                    className="w-full rounded-lg shadow-lg object-contain h-64 md:h-96" // Changed to object-contain
                                />
                                {/* Gallery Controls */}
                                <button onClick={prevImage} className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <button onClick={nextImage} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                            <p className={`text-sm text-center mt-3 ${textMuted}`}>{currentImageIndex + 1} / {images.length}</p>
                        </div>
                    )}
                </div>
            </animated.div>
        </div>
    );
};
// --- END MODAL COMPONENT ---


// --- UI COMPONENTS ---

const SectionTitle = ({ children, className = "", isLight }) => (
  <h2 className={`text-4xl sm:text-5xl font-extrabold ${isLight ? 'text-gray-800' : 'text-white'} text-center mb-16 ${className}`}>
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 border-b-4 border-indigo-500 pb-2">
      {children}
    </span>
  </h2>
);

const NavLink = ({ children, to, isLight }) => (
  <a
    href={`#${to}`}
    className={`py-2 px-3 transition-all duration-300 rounded-full text-sm font-medium
      ${isLight ? 'text-gray-700 hover:bg-gray-200 hover:text-teal-600' : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-400'}`
    }
  >
    {children}
  </a>
);

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = theme === 'light';

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const bgColor = isLight ? 'bg-white/80' : 'bg-gray-900/40';
  const shadowColor = isLight ? 'shadow-lg' : 'shadow-xl';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${bgColor} backdrop-blur-sm ${shadowColor}`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. Logo (Left) */}
          <div className="flex-shrink-0 z-10">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 cursor-pointer">
              SG
            </span>
          </div>

          {/* 2. Desktop Navigation (Centered) */}
          {/* This container pushes itself to the center by using flex grow on the left/right wrappers */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center">
            <nav className="space-x-2">
              {navItems.map(item => (
                <NavLink key={item.id} to={item.id} isLight={isLight}>{item.name}</NavLink>
              ))}
            </nav>
          </div>

          {/* 3. Social Icons & Theme Toggle (Right) */}
          {/* FIX: Ensure padding on the far right by ensuring the parent container uses px-4/sm:px-6/lg:px-8 */}
          <div className="flex items-center space-x-4 z-10">
             <div className="hidden md:flex space-x-3">
                <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors rounded-full ${isLight ? 'text-gray-600 hover:text-teal-600 bg-gray-100' : 'text-gray-400 hover:text-teal-400 bg-gray-700/50'}`}>
                    <Linkedin className="w-5 h-5" />
                </a>
                <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors rounded-full ${isLight ? 'text-gray-600 hover:text-teal-600 bg-gray-100' : 'text-gray-400 hover:text-teal-400 bg-gray-700/50'}`}>
                    <Github className="w-5 h-5" />
                </a>
             </div>
             {/* Theme Toggle Button */}
             <button onClick={toggleTheme} className={`p-2 transition-colors rounded-full ${isLight ? 'text-amber-500 hover:text-amber-600 bg-gray-100' : 'text-amber-400 hover:text-white bg-gray-700/50'}`}>
                {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
             </button>
             {/* Mobile Menu Button */}
             <div className="md:hidden">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md focus:outline-none ${isLight ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-teal-600 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ isLight }) => {
  const scrollRef = useRef(null);
  const [skillIndex, setSkillIndex] = useState(0);

  // Effect for cycling the skills text every 3 seconds
  useEffect(() => {
      const interval = setInterval(() => {
          setSkillIndex(prevIndex => 
              (prevIndex + 1) % PORTFOLIO_DATA.rotatingSkills.length
          );
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
  }, []);
  
  const currentSkill = PORTFOLIO_DATA.rotatingSkills[skillIndex];
  const IconComponent = currentSkill.icon;

  useEffect(() => {
    // Scroll effect (Placeholder for actual scroll logic)
    const handleScroll = () => {
      if (scrollRef.current) {
        // Simple opacity fade based on scroll position
        const scrollY = window.scrollY;
        scrollRef.current.style.opacity = Math.max(0, 1 - scrollY / 600);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
      <ThreeDBackground />
      <div ref={scrollRef} className="relative z-10 text-center p-6 max-w-4xl mx-auto transition-opacity duration-300 flex flex-col items-center justify-center h-full"> {/* Added flex-col and h-full for centering and layout control */}
        
        <div className="flex flex-col items-center justify-center flex-grow"> {/* Container for main content */}
            {/* Main Name with Gradient - FIXED TO SINGLE LINE */}
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold leading-tight mb-4 animate-fade-in whitespace-nowrap">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-pink-500 inline-block mt-6">
                {PORTFOLIO_DATA.name.split(' ')[0]}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 inline-block ml-4">
                {PORTFOLIO_DATA.name.split(' ')[1]}
            </span>
            </h1>
            {/* Title/Designation */}
            <h2 className={`text-xl sm:text-3xl lg:text-4xl font-light mt-2 mb-6 ${isLight ? 'text-gray-700' : 'text-gray-100'}`}>
            {PORTFOLIO_DATA.title}
            </h2>

            {/* Dynamic Skills Bubble */}
            <div className="flex justify-center mb-6 h-10"> {/* Fixed height to prevent layout shift */}
                <animated.span 
                    key={skillIndex} // Key forces re-render/animation
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-teal-300 bg-teal-500/20 backdrop-blur-md border border-teal-400/50 transition-transform duration-500 transform hover:scale-105"
                    style={useSpring({
                        opacity: 1,
                        transform: 'translateY(0px)',
                        from: { opacity: 0, transform: 'translateY(10px)' },
                        config: { duration: 500 }
                    })}
                >
                    <IconComponent className="w-4 h-4 mr-2" /> {currentSkill.text}
                </animated.span>
            </div>

            {/* Description/Quote */}
            <p className={`text-lg mb-2 max-w-xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            {PORTFOLIO_DATA.tagline}
            </p>
            <p className="text-xl font-medium text-purple-400 italic mb-10 transition-colors hover:text-teal-400 cursor-default">
            {PORTFOLIO_DATA.aboutQuote}
            </p>

            {/* View Projects Button */}
            <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full shadow-lg text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50
                bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-purple-500 transform hover:scale-105"
            >
            View My Projects
            </a>

            {/* Tech Stack Bubbles */}
            <div className="mt-8 max-w-4xl mx-auto"> {/* Reduced mt-12 to mt-8 */}
            <p className="text-gray-400 text-sm mb-3">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-2">
                {PORTFOLIO_DATA.techStack.map((tech, index) => (
                <span key={index} className="px-4 py-1 text-sm rounded-full text-indigo-300 bg-gray-700/50 hover:bg-indigo-500/30 transition-colors border border-indigo-500/50 cursor-default">
                    {tech}
                </span>
                ))}
            </div>
            </div>

            {/* Scroll Down Indicator - Fixed positioning and spacing */}
            <div className="mt-8 flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
                <ArrowDown className="w-6 h-6 text-teal-400 animate-bounce" />
            </div>
        </div>
    </div>
    </section>
  );
};

const AboutSection = ({ isLight }) => {
    const sectionBg = isLight ? 'bg-gray-100' : 'bg-gray-900';
    const cardBg = isLight ? 'bg-white' : 'bg-gray-800';
    const textColor = isLight ? 'text-gray-700' : 'text-gray-300';
    const titleColor = isLight ? 'text-gray-800' : 'text-white';
    
    return (
        <section id="about" className={`py-20 ${sectionBg} relative z-10`}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle isLight={isLight}>About Me</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left: Image Card */}
                    <div className="lg:col-span-1 flex justify-center lg:sticky lg:top-24">
                        <div className={`p-4 ${cardBg} rounded-3xl shadow-2xl border border-purple-500/50 transform transition-transform duration-500 group hover:scale-[1.02]`}>
                            {/* Image Placeholder with Neon Border */}
                            <div className="w-64 h-80 rounded-2xl overflow-hidden relative">
                            <img
                                src="/profile.jpg"
                                alt="Sahil Gupta Avatar"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" // Added scale on hover
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/256x320/6366F1/FFFFFF?text=Sahil+Gupta"; 
                                }}
                            />
                            <div className="absolute inset-0 border-4 border-transparent rounded-2xl group-hover:border-purple-400 transition-colors duration-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Description and Journey */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className={`text-lg leading-relaxed ${textColor} space-y-6`}>
                            <p className="text-xl font-semibold text-teal-400">
                            Hi, I'm {PORTFOLIO_DATA.name.split(' ')[0]} {PORTFOLIO_DATA.name.split(' ')[1]}, a passionate Software Developer.
                            </p>
                            <p>
                            {PORTFOLIO_DATA.aboutContent.description}
                            </p>
                          
                        </div>

                        {/* My Journey Timeline */}
                        <div>
                            <h3 className={`text-3xl font-bold mb-6 border-l-4 border-teal-400 pl-4 ${titleColor}`}>My Journey</h3>
                            <div className="space-y-6">
                            {PORTFOLIO_DATA.aboutContent.journey.map((item, index) => (
                                <div key={index} className={`p-4 rounded-xl shadow-lg border-l-4 border-purple-500/50 hover:border-teal-400 transition-all duration-300 ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`}>
                                <h4 className="text-xl font-semibold text-teal-400 mb-1">{item.title}</h4>
                                <p className={isLight ? 'text-gray-600' : 'text-gray-400'}>{item.desc}</p>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Stats Boxes */}
                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            {PORTFOLIO_DATA.aboutContent.stats.map((stat, index) => (
                            <div key={index} className={`p-5 rounded-xl shadow-xl border-t-4 transition-all duration-300 text-center
                                ${index === 1 ? 'bg-purple-800/40 border-purple-400' : isLight ? 'bg-gray-300 border-gray-400 hover:bg-gray-200' : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'}`}>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">
                                {stat.value}
                                </div>
                                <p className={isLight ? 'text-gray-700 text-sm mt-1' : 'text-gray-400 text-sm mt-1'}>{stat.label}</p>
                            </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SkillProgressBar = ({ name, percentage, isLight }) => {
    const props = useSpring({ width: `${percentage}%`, from: { width: '0%' } });
    const barBg = isLight ? 'bg-gray-300' : 'bg-gray-700';

    return (
        <div className="mb-3">
            <div className={`flex justify-between mb-1 text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                <span>{name}</span>
                <span>{percentage}%</span>
            </div>
            <div className={`w-full ${barBg} rounded-full h-2.5`}>
                <animated.div
                    className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 transition-width duration-1000"
                    style={props}
                />
            </div>
        </div>
    );
};

// Component for the Large Cycling Skill Card
const CyclingSkillCard = ({ skill, isActive, isLight }) => {
    const { opacity, transform } = useSpring({
        opacity: isActive ? 1 : 0,
        transform: `scale(${isActive ? 1 : 0.95})`,
        config: { duration: 300, tension: 300, friction: 30 }
    });

    if (!skill) return null;

    const IconComponent = skill.icon;
    const iconProps = { className: `w-12 h-12 ${isLight ? 'text-purple-600' : 'text-white'}`, color: isLight ? '#6b21a8' : '#fff' };
    const cardBg = isLight ? 'bg-white/90' : 'bg-gray-800/70';
    const descColor = isLight ? 'text-gray-600' : 'text-gray-400';
    const tagBg = isLight ? 'bg-teal-200/50 border-teal-600/50' : 'bg-teal-600/20 border-teal-400/50';

    return (
        <animated.div 
            style={{ opacity, transform }} 
            className={`absolute top-0 left-0 right-0 p-10  ${cardBg} rounded-3xl shadow-2xl border border-purple-500/50 backdrop-blur-md transition-all duration-500 flex flex-col items-center text-center`}
        >
            {/* Neon Icon */}
            <div className={`p-4 rounded-full mb-4 transition-all duration-300 
                ${isLight ? 'bg-purple-200/70 ring-2 ring-purple-500' : 'bg-purple-600/40 ring-4 ring-purple-500/50'}`}
            >
                {React.cloneElement(IconComponent, iconProps)}
            </div>

            <h3 className={`text-3xl font-bold mb-2 ${isLight ? 'text-gray-800' : 'text-white'}`}>{skill.title}</h3>
            <p className={`mb-6 italic ${descColor}`}>{skill.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
                {skill.tags.map((tag, index) => (
                    <span key={index} className={`px-3 py-1 text-sm rounded-full ${isLight ? 'text-teal-800' : 'text-teal-300'} ${tagBg}`}>
                        {tag}
                    </span>
                ))}
            </div>
        </animated.div>
    );
};


const SkillsSection = ({ isLight }) => {
    const orderedSkillIds = ['frontend', 'backend', 'database', 'languages']; // Adjusted order if needed
    const [activeSkillId, setActiveIndex] = useState(orderedSkillIds[0]);
    const [isPaused, setIsPaused] = useState(false);
    const autoCycleRef = useRef(null);
    const sectionBg = isLight ? 'bg-gray-100' : 'bg-gray-900';

    // Auto-cycling logic with pause/resume functionality
    useEffect(() => {
        if (isPaused) {
            if (autoCycleRef.current) clearInterval(autoCycleRef.current);
            return;
        }

        let currentIndex = orderedSkillIds.findIndex(id => id === activeSkillId);

        autoCycleRef.current = setInterval(() => {
            currentIndex = (currentIndex + 1) % orderedSkillIds.length;
            setActiveIndex(orderedSkillIds[currentIndex]);
        }, 3000); 

        return () => clearInterval(autoCycleRef.current);
    }, [isPaused, activeSkillId, orderedSkillIds.length]); 
    
    useEffect(() => {
        setIsPaused(false);
    }, []);

    const handleMouseEnter = (skillId) => {
        setIsPaused(true); 
        setActiveIndex(skillId); 
    };

    const handleMouseLeave = () => {
        setIsPaused(false); 
    };

    const renderSkillBox = (skill) => {
        const isActive = skill.id === activeSkillId;
        const baseBg = isLight ? 'bg-white' : 'bg-gray-800/70';
        const hoverClasses = isLight ? 'hover:scale-[1.02] hover:bg-gray-100' : 'hover:scale-[1.02] hover:bg-gray-700/50';
        const activeClasses = isActive 
            ? `bg-purple-800/40 ring-4 ring-purple-500/50 scale-[1.05] z-20 ${isLight ? 'bg-purple-100 border-purple-400' : ''}` 
            : `${baseBg} ${hoverClasses}`;
        const titleColor = isLight ? 'text-gray-800' : 'text-white';

        return (
            <div 
                key={skill.id} 
                className={`p-6 rounded-xl shadow-xl border border-gray-700 backdrop-blur-md transform transition-all duration-500 cursor-pointer ${activeClasses}`}
                onMouseEnter={() => handleMouseEnter(skill.id)}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center mb-4">
                    {skill.icon}
                    <h3 className={`ml-3 text-xl font-semibold ${titleColor}`}>{skill.title}</h3>
                </div>
                <div className="space-y-3">
                    {skill.items.map(([name, percentage]) => (
                        <SkillProgressBar key={name} name={name} percentage={percentage} isLight={isLight} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section id="skills" className={`py-20 ${sectionBg} relative z-10`}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle isLight={isLight}>Skills & Expertise</SectionTitle>
                <p className={`text-center ${isLight ? 'text-gray-600' : 'text-gray-400'} mb-12 italic`}>
                    Mastering the technologies that power the future of web and cloud expansion.
                </p>

                {/* Top Center Cycling Card */}
                {/* <div className="relative h-64 flex justify-center mb-20 max-w-2xl mx-auto">
                    {PORTFOLIO_DATA.skills
                        .filter(skill => orderedSkillIds.includes(skill.id))
                        .map(skill => (
                            <CyclingSkillCard 
                                key={skill.id} 
                                skill={skill} 
                                isActive={skill.id === activeSkillId} 
                                isLight={isLight}
                            />
                        ))}
                </div> */}

                {/* Dynamic Grid of Skill Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PORTFOLIO_DATA.skills.filter(skill => orderedSkillIds.includes(skill.id)).map(skill => (
                        renderSkillBox(skill)
                    ))}
                </div>
            </div>
        </section>
    );
};

const EducationSection = ({ isLight }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const education = PORTFOLIO_DATA.education;
  // Background set to be translucent over the fixed 3D canvas
  const sectionBg = isLight ? 'bg-white/90' : 'bg-black/90'; 
  const cardBg = isLight ? 'bg-gray-100/90' : 'bg-gray-800/70';
  const textColor = isLight ? 'text-gray-700' : 'text-gray-400';
  const percentageColor = isLight ? 'text-purple-600' : 'text-purple-400';

  return (
    <section id="education" className={`py-20 ${sectionBg} relative z-10 min-h-screen flex items-center`}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle isLight={isLight}>My Education </SectionTitle>
            
            <div className="flex flex-col lg:flex-row items-start justify-center">
                {/* Left Side: Timeline/Navigation (Simulating the scroll effect) */}
                <div className="lg:w-1/3 w-full mb-10 lg:mb-0 lg:pr-10 flex lg:flex-col justify-center space-x-4 lg:space-x-0 lg:space-y-8">
                    {education.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => setActiveIndex(index)}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 relative 
                                ${activeIndex === index ? 'text-teal-600 font-bold' : isLight ? 'text-gray-600 hover:text-gray-800' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <span className={`block w-4 h-4 rounded-full absolute -left-8 top-1/2 transform -translate-y-1/2 border-2 transition-all duration-500
                                ${activeIndex === index ? 'bg-teal-400 border-white ring-4 ring-teal-400/30' : 'bg-gray-700 border-gray-600'}`}/>
                            <h4 className="text-xl font-semibold">{item.year}</h4>
                            <p className="text-sm">{item.degree}</p>
                            {item.percentage && (
                                <p className={`text-sm ${percentageColor}`}>{item.percentage}</p>
                            )} {/* Display percentage */}
                        </div>
                    ))}
                </div>

                {/* Right Side: Content Card */}
                <div className="lg:w-2/3 w-full">
                    <div className={`p-8 ${cardBg} rounded-2xl shadow-2xl border border-purple-500/50 backdrop-blur-md`}>
                        <div className="flex items-start space-x-4">
                            <BookOpen className={`w-10 h-10 p-2 rounded-full flex-shrink-0 ${isLight ? 'text-purple-600 bg-purple-200' : 'text-purple-400 bg-purple-600/20'}`} />
                            <div>
                                <p className={`text-sm font-medium mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{education[activeIndex].year}</p>
                                <h3 className={`text-2xl font-bold ${isLight ? 'text-teal-600' : 'text-teal-400'}`}>{education[activeIndex].degree}</h3>
                                <p className={`text-lg font-medium mb-4 ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>{education[activeIndex].institution}</p>
                                <p className={textColor + ' leading-relaxed'}>{education[activeIndex].desc}</p>
                                {education[activeIndex].percentage && (
                                    <p className={`mt-2 text-lg font-semibold ${percentageColor}`}>Percentage: {education[activeIndex].percentage}</p>
                                )} {/* Display percentage inside card */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

const ProjectsSection = ({ isLight, openModal }) => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const totalProjects = PORTFOLIO_DATA.projects.length;
    const currentProject = PORTFOLIO_DATA.projects[currentProjectIndex];
    
    // Background set to be translucent over the fixed 3D canvas
    const sectionBg = isLight ? 'bg-white/90' : 'bg-black/90'; 
    const cardBg = isLight ? 'bg-gray-100/90' : 'bg-gray-800/70';
    const textColor = isLight ? 'text-gray-700' : 'text-gray-300';
    
    // FIX: Define numColor and navTextColor for both light and dark modes explicitly
    const numColor = isLight ? 'text-teal-700' : 'text-teal-400'; // Teal color for number numerator (e.g., '01')
    
    // FIX: Define navigation background colors explicitly for Light Mode
    const navBg = isLight ? 'bg-gray-200/80 hover:bg-gray-300' : 'bg-gray-800/50 hover:bg-gray-700/50';
    const navTextColor = isLight ? 'text-gray-700 hover:text-teal-600' : 'text-gray-400 hover:text-teal-400';

    const goToNext = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % totalProjects);
    };

    const goToPrev = () => {
        setCurrentProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    };

    const springProps = useSpring({
        opacity: 1,
        transform: 'translateY(0px)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        reset: true,
        key: currentProjectIndex,
    });
    
    // Determine if the current project has a live link
    const hasLiveLink = !!currentProject.link;

    return (
        <section id="projects" className={`py-20 ${sectionBg} relative z-10 min-h-screen flex items-center`}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle isLight={isLight}>My Projects</SectionTitle>

                <animated.div style={springProps} className="max-w-4xl mx-auto">
                    <div className={`p-8 rounded-3xl shadow-2xl border border-teal-500/50 backdrop-blur-md flex flex-col lg:flex-row items-center ${cardBg} group`}> {/* Added 'group' here */}
                        {/* Project Details */}
                        <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
                            <h3 className={`text-4xl font-extrabold mb-3 ${isLight ? 'text-gray-800' : 'text-white'}`}>
                                {currentProject.title}
                            </h3>
                            <p className={`text-lg mb-6 ${textColor}`}>{currentProject.desc}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentProject.tags.map((tag, tagIndex) => (
                                    <span 
                                        key={tagIndex} 
                                        className={`text-sm font-medium px-3 py-1 rounded-full border 
                                            ${isLight 
                                                ? 'bg-purple-100 text-purple-700 border-purple-300' // LIGHT MODE STYLES
                                                : 'bg-purple-600/20 text-purple-300 border-purple-500/50' // DARK MODE STYLES
                                            }`
                                        }
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex space-x-4">
                                <button
                                    className="text-white bg-teal-600/90 px-5 py-2 rounded-full hover:bg-teal-700 transition duration-300 text-lg shadow-md hover:shadow-lg"
                                    onClick={() => openModal(currentProject)} // Open Modal on click
                                >
                                    View Details
                                </button>
                                
                                {/* NEW: Live Link Button (Next to View Details) */}
                                {hasLiveLink && (
                                    <a
                                        href={currentProject.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center px-5 py-2 text-lg font-medium rounded-full transition-all duration-300 border shadow-md
                                            ${isLight ? 'text-teal-600 border-teal-600 hover:bg-teal-600/10' : 'text-teal-400 border-teal-400 hover:bg-teal-400/20'}`}
                                    >
                                        Visit Site <Globe className="w-5 h-5 ml-3" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Mockup Placeholder */}
                        <div className="lg:w-1/2 w-full flex justify-center items-center">
                            {/* Container: Relative, Aspect-Video, Overflow Hidden */}
                            <div className="w-full relative rounded-xl flex items-center justify-center text-gray-500 font-mono text-sm shadow-inner overflow-hidden aspect-video">
                                <img 
                                    src={currentProject.mockup} // Source points to project image URL/path
                                    alt={`${currentProject.title} Mockup`} 
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.05]" // Added group-hover:scale-[1.05]
                                    // Use onError fallback to show the placeholder text if the image link fails
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/800x450/1E293B/9CA3AF?text=Image+Not+Found"; // Updated placeholder size for 16:9
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </animated.div>

                {/* Navigation Controls (Number System) */}
                <div className="flex justify-center items-center space-x-6 mt-12">
                    <button onClick={goToPrev} className={`p-3 transition-colors rounded-full shadow-lg ${navBg} ${navTextColor}`}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    
                    <div className={`text-2xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
                        <span className={numColor}>{String(currentProjectIndex + 1).padStart(2, '0')}</span> 
                        <span className={isLight ? 'text-gray-500' : 'text-gray-500'}> / </span> {/* Gray text for separator */}
                        <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>{String(totalProjects).padStart(2, '0')}</span> {/* Gray text for denominator */}
                    </div>

                    <button onClick={goToNext} className={`p-3 transition-colors rounded-full shadow-lg ${navBg} ${navTextColor}`}>
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

const ContactSection = ({ isLight, showToast }) => {
    const formRef = useRef(null);

    const sectionBg = isLight ? 'bg-gray-100' : 'bg-gray-900';
    const cardBg = isLight ? 'bg-white/90' : 'bg-gray-800/80';
    const textColor = isLight ? 'text-gray-700' : 'text-gray-300';
    const inputBg = isLight ? 'bg-gray-200' : 'bg-gray-700/50';
    const inputBorder = isLight ? 'border-gray-400' : 'border-gray-600';
    const inputFocus = isLight ? 'focus:ring-teal-600 focus:border-teal-600' : 'focus:ring-teal-500 focus:border-teal-500';
    const inputPlaceholder = isLight ? 'placeholder-gray-600' : 'placeholder-gray-400';
    const titleColor = isLight ? 'text-gray-800' : 'text-white';
    
    // Function to scroll to the form when the email link is clicked
    const scrollToForm = (e) => {
        e.preventDefault(); // Prevent default mailto: link behavior
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation of sending the message
        console.log("Form Submitted:", {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        });
        
        // Show the toast notification
        showToast("Message Sent Successfully!");
        
        // Clear the form
        e.target.reset();
    };

    return (
        <section id="contact" className={`py-20 ${sectionBg} relative z-10`}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className={`text-4xl sm:text-5xl font-extrabold text-center mb-6 ${titleColor}`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
                        Let's Connect
                    </span>
                </h2>
                <p className={`text-center ${textColor} text-lg mb-12`}>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
                </p>

                <div className="flex justify-center">
                    <div className={`p-8 rounded-3xl shadow-2xl border border-purple-500/50 backdrop-blur-md max-w-4xl w-full ${cardBg}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Left Side: Text and Details */}
                            <div>
                                <h3 className={`text-3xl font-bold mb-4 ${titleColor}`}>Let's build the future together.</h3>
                                <p className={`mb-8 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Have a project in mind or just want to say hi? My inbox is always open.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className={`flex items-center ${textColor}`}>
                                        {/* Clicking this button/div now SCROLLS to the form */}
                                        <button 
                                            type="button" 
                                            onClick={scrollToForm}
                                            className="flex items-center group cursor-pointer p-1 -ml-1 rounded transition-colors"
                                        >
                                            <AtSign className="w-5 h-5 mr-3 text-teal-400 group-hover:text-teal-300" />
                                            <span className="text-lg group-hover:text-teal-400 transition-colors">{PORTFOLIO_DATA.contact.email}</span>
                                        </button>
                                    </div>
                                    <div className={`flex items-center ${textColor}`}>
                                        <MapPin className="w-5 h-5 mr-3 text-teal-400" />
                                        <span className="text-lg">{PORTFOLIO_DATA.contact.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Contact Form (Always Visible) */}
                            <form 
                                ref={formRef} // Attach ref for scrolling
                                className={`space-y-4 transition-opacity duration-500`}
                                onSubmit={handleSubmit}
                            >
                                <input name="name" type="text" placeholder="Name" className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 py-3 ${isLight ? 'text-gray-800' : 'text-white'} ${inputPlaceholder} ${inputFocus} transition-all`} required />
                                <input name="email" type="email" placeholder="Email" className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 py-3 ${isLight ? 'text-gray-800' : 'text-white'} ${inputPlaceholder} ${inputFocus} transition-all`} required />
                                <textarea name="message" placeholder="Message" rows="4" className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 py-3 ${isLight ? 'text-gray-800' : 'text-white'} ${inputPlaceholder} ${inputFocus} transition-all resize-none`} required />
                                
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50
                                    bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 focus:ring-teal-500 transform hover:scale-[1.01]"
                                >
                                    Send Message <Send className="w-5 h-5 ml-3" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = ({ isLight }) => {
    const textColor = isLight ? 'text-gray-600' : 'text-gray-500';
    const linkClasses = isLight ? 'text-gray-600 border-gray-400 hover:text-teal-600 hover:border-teal-600 hover:shadow-teal-600/30' : 'text-gray-400 border-gray-700 hover:text-teal-400 hover:border-teal-400 hover:shadow-teal-500/30';
    
    // Function to scroll to the contact section (same as used in the ContactSection)
    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <footer className={`py-10 relative z-10 border-t ${isLight ? 'bg-white border-gray-300' : 'bg-black border-gray-800'}`}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                
                <h2 className={`text-3xl sm:text-4xl font-extrabold text-center mb-8 ${isLight ? 'text-gray-800' : 'text-white'}`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-teal-400">
                        Start a Conversation
                    </span>
                </h2>

                <div className="flex justify-center space-x-6 mb-8">
                    <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full border transition-all duration-300 hover:shadow-md ${linkClasses}`}>
                        <Github className="w-6 h-6" />
                    </a>
                    <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full border transition-all duration-300 hover:shadow-md ${linkClasses}`}>
                        <Linkedin className="w-6 h-6" />
                    </a>
                    {/* UPDATED: Mail icon now calls the scroll function */}
                    <button onClick={scrollToContact} className={`p-4 rounded-full border transition-all duration-300 hover:shadow-md ${linkClasses}`}>
                        <Mail className="w-6 h-6" />
                    </button>
                </div>

                <hr className={`mb-6 max-w-lg mx-auto ${isLight ? 'border-gray-300' : 'border-gray-700/50'}`} />

                <p className={`${textColor} text-sm`}>
                    &copy; {new Date().getFullYear()} Sahil Gupta. All rights reserved.
                </p>
                <p className={`${textColor} text-sm mt-1 flex justify-center items-center`}>
                    Designed & Built with <span className="mx-1 text-red-500">❤️</span>
                </p>

                {/* Scroll to Top Button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-xl hover:bg-purple-700 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            </div>
        </footer>
    );
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [modalProject, setModalProject] = useState(null); // State for project currently in modal

  const isLight = theme === 'light';
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const showToast = (message, type = 'success') => setToast({ show: true, message, type });
  const closeModal = () => setModalProject(null);
  const openModal = (project) => setModalProject(project);
  const closeToast = useCallback(() => setToast({ ...toast, show: false }), [toast]);

  useEffect(() => {
    // Inject custom font for modern aesthetic
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className={`min-h-screen ${isLight ? 'bg-white' : 'bg-black'} font-inter antialiased transition-colors duration-500`}>
      <style>{`
        /* Global Background Style */
        body { 
          background-color: ${isLight ? '#fff' : '#000'}; 
          cursor: none; /* Hide default cursor */
        }
        /* Custom Keyframes for fade-in effect */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
      `}</style>
      
      <CustomCursor theme={theme} />
      <ThreeDBackground />
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <HeroSection isLight={isLight} />
        <AboutSection isLight={isLight} />
        <SkillsSection isLight={isLight} />
        <ProjectsSection isLight={isLight} openModal={openModal} />
        <EducationSection isLight={isLight} />
        <ContactSection isLight={isLight} showToast={showToast} />
        <Footer isLight={isLight} />
      </main>
      
      <ProjectModal
          project={modalProject}
          show={!!modalProject}
          onClose={closeModal}
          isLight={isLight}
      />
      
      <ToastNotification 
        message={toast.message} 
        show={toast.show} 
        type={toast.type} 
        onClose={closeToast} 
      />
    </div>
  );
};

export default App;