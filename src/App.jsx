import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Linkedin, Mail, ExternalLink, User, Briefcase, Code, Award, Download, Moon, Sun } from 'lucide-react';
//  keerthi
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'awards', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">Portfolio</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'projects', 'awards', 'contact'].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`capitalize ${activeSection === section ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
              >
                {section}
              </motion.button>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`hamburger ${menuOpen ? 'open' : ''}`}
            >
              <span className={`block w-6 h-0.5 mb-1.5 ${darkMode ? 'bg-white' : 'bg-black'}`}></span>
              <span className={`block w-6 h-0.5 mb-1.5 ${darkMode ? 'bg-white' : 'bg-black'}`}></span>
              <span className={`block w-6 h-0.5 ${darkMode ? 'bg-white' : 'bg-black'}`}></span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {['home', 'about', 'skills', 'projects', 'awards', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize text-left py-2 ${activeSection === section ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className={`min-h-screen flex items-center justify-center pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-lg mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              John Doe
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                Frontend Developer & UI/UX Designer
              </span>
            </motion.p>
            <motion.p 
              className="text-lg mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Creating beautiful, responsive, and user-friendly web experiences with modern technologies.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full flex items-center gap-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <Download size={18} /> Download CV
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 ${darkMode ? 'border-blue-600' : 'border-blue-500'}`}
            >
              <img 
                src="/api/placeholder/400/400" 
                alt="Profile" 
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <div className={`h-1 w-20 mx-auto ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className={`relative rounded-lg overflow-hidden shadow-xl ${darkMode ? 'shadow-gray-700' : 'shadow-gray-300'}`}>
                <img 
                  src="/api/placeholder/600/800" 
                  alt="About Me" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
              <p className="mb-4">
                I'm a passionate Frontend Developer with 5 years of experience creating modern and responsive web applications. 
                My journey in web development started in 2018, and since then, I've been constantly learning and improving my skills.
              </p>
              <p className="mb-6">
                I specialize in React.js, Tailwind CSS, and modern JavaScript. I love creating intuitive user interfaces and smooth user experiences. 
                My approach combines clean code with creative design to build applications that are both functional and beautiful.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">Name:</h4>
                  <p>John Doe</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email:</h4>
                  <p>john.doe@example.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">From:</h4>
                  <p>San Francisco, CA</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Experience:</h4>
                  <p>5+ Years</p>
                </div>
              </div>
              
              <motion.div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {/* <GitHub size={20} /> */}
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Mail size={20} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">My Skills</h2>
            <div className={`h-1 w-20 mx-auto ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <p className="mt-4 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to create amazing web experiences.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { name: "HTML5", percentage: 95 },
              { name: "CSS3", percentage: 90 },
              { name: "JavaScript", percentage: 85 },
              { name: "React.js", percentage: 90 },
              { name: "Tailwind CSS", percentage: 85 },
              { name: "TypeScript", percentage: 75 },
              { name: "Next.js", percentage: 80 },
              { name: "Framer Motion", percentage: 70 },
              { name: "Git", percentage: 85 },
              { name: "Figma", percentage: 80 },
              { name: "Node.js", percentage: 65 },
              { name: "Responsive Design", percentage: 90 }
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-md'}`}
              >
                <h3 className="font-semibold mb-4 text-lg">{skill.name}</h3>
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className={`h-full rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  ></motion.div>
                </div>
                <p className="mt-2 text-sm text-right">{skill.percentage}%</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">My Projects</h2>
            <div className={`h-1 w-20 mx-auto ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <p className="mt-4 max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each one demonstrates different skills and technologies.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: "E-commerce Website",
                description: "A fully responsive e-commerce platform built with React.js and Tailwind CSS, featuring product filtering, shopping cart, and checkout functionality.",
                image: "/api/placeholder/600/400",
                tech: ["React.js", "Tailwind CSS", "Redux", "Firebase"]
              },
              {
                title: "Task Management App",
                description: "A drag-and-drop task management application with user authentication, task categories, and progress tracking.",
                image: "/api/placeholder/600/400",
                tech: ["React.js", "TypeScript", "Firebase", "Framer Motion"]
              },
              {
                title: "Portfolio Website",
                description: "A creative portfolio website for a digital artist, featuring smooth animations and an image gallery.",
                image: "/api/placeholder/600/400",
                tech: ["Next.js", "Tailwind CSS", "Framer Motion"]
              },
              {
                title: "Weather Dashboard",
                description: "A weather application that displays current weather and forecasts for multiple locations, with interactive charts.",
                image: "/api/placeholder/600/400",
                tech: ["React.js", "Tailwind CSS", "Chart.js", "OpenWeather API"]
              },
              {
                title: "Recipe Finder",
                description: "A web application for finding recipes based on available ingredients, with filtering options and saving favorites.",
                image: "/api/placeholder/600/400",
                tech: ["React.js", "CSS Modules", "Recipe API"]
              },
              {
                title: "Social Media Dashboard",
                description: "An admin dashboard for managing social media accounts, with analytics, content scheduling, and engagement tracking.",
                image: "/api/placeholder/600/400",
                tech: ["React.js", "Tailwind CSS", "Redux", "Chart.js"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700 shadow-gray-900' : 'bg-white shadow-gray-200'}`}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1 text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      {/* <GitHub size={16} /> View Code */}
                      view code
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1 text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section 
        id="awards" 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Awards & Achievements</h2>
            <div className={`h-1 w-20 mx-auto ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <p className="mt-4 max-w-2xl mx-auto">
              Recognition and accomplishments throughout my career as a developer.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: "Best Web Design Award",
                organization: "Web Design Conference 2023",
                description: "Recognized for innovative design approach and seamless user experience in the E-commerce Website project."
              },
              {
                title: "Developer of the Year",
                organization: "Tech Innovators Association",
                description: "Awarded for contributions to open-source projects and leadership in the developer community."
              },
              {
                title: "Hackathon Winner",
                organization: "CodeFest 2022",
                description: "First place in a 48-hour hackathon, building a solution for remote education accessibility."
              },
              {
                title: "Frontend Excellence Certificate",
                organization: "React Summit",
                description: "Recognized for advanced implementation of React patterns and state management."
              }
            ].map((award, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-lg flex gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} flex items-center justify-center`}>
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{award.title}</h3>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{award.organization}</p>
                  <p>{award.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className={`h-1 w-20 mx-auto ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <p className="mt-4 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Feel free to reach out!
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              className="md:w-1/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
                      <Linkedin size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">LinkedIn</h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>linkedin.com/in/johndoe</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
                      {/* <GitHub size={24} className="text-white" /> */}
                      
                    </div>
                    <div>
                      <h3 className="font-semibold">GitHub</h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>github.com/johndoe</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            ></motion.div>

<form className={`space-y-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-lg`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg outline-none ${
                        darkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-blue-500' 
                          : 'bg-white border border-gray-300 focus:border-blue-500'
                      }`}
                    />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg outline-none ${
                        darkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-blue-500' 
                          : 'bg-white border border-gray-300 focus:border-blue-500'
                      }`}
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="block mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className={`w-full px-4 py-3 rounded-lg outline-none ${
                      darkMode 
                        ? 'bg-gray-800 border border-gray-700 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 focus:border-blue-500'
                    }`}
                  />
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="block mb-2 font-medium">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-lg outline-none resize-none ${
                      darkMode 
                        ? 'bg-gray-800 border border-gray-700 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 focus:border-blue-500'
                    }`}
                  ></textarea>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}
                >
                  Send Message
                </motion.button>
              </form>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2 md:mb-0">John Doe</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-4"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-blue-400"
              >
                {/* <GitHub size={20} /> */}
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-blue-400"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-blue-400"
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-center text-gray-400 text-sm"
          >
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => scrollToSection('home')}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center shadow-lg z-50`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </div>
  );
}

export default App;