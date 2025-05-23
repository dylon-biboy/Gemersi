import React, { useState, useEffect, useRef, useCallback } from 'react';

// Project data structure with gallery images - Defined once at the top level
const projectCategories = {
  Production: [
    {
      id: 'prod-1',
      title: 'Editorial Photography',
      description: 'Capturing the essence of fashion and lifestyle for leading publications, focusing on narrative and visual impact.',
      galleryImages: [
        'https://placehold.co/1920x1080/000000/FFFFFF?text=Fashion+Editorial+Shot+1', // [Hình ảnh chụp biên tập thời trang 1]
        'https://placehold.co/1920x1080/1A1A1A/E0E0E0?text=Fashion+Editorial+Shot+2', // [Hình ảnh chụp biên tập thời trang 2]
        'https://placehold.co/1920x1080/2A2A2A/E0E0E0?text=Fashion+Editorial+Shot+3', // [Hình ảnh chụp biên tập thời trang 3]
        'https://placehold.co/1920x1080/3A3A3A/E0E0E0?text=Fashion+Editorial+Shot+4', // [Hình ảnh chụp biên tập thời trang 4]
      ],
    },
    {
      id: 'prod-2',
      title: 'Commercial Campaigns',
      description: 'Visually compelling campaigns that elevate brands, engage audiences, and drive market presence through innovative imagery.',
      galleryImages: [
        'https://placehold.co/1920x1080/4A4A4A/E0E0E0?text=Commercial+Campaign+1', // [Hình ảnh chiến dịch thương mại 1]
        'https://placehold.co/1920x1080/5A5A5A/E0E0E0?text=Commercial+Campaign+2', // [Hình ảnh chiến dịch thương mại 2]
        'https://placehold.co/1920x1080/6A6A6A/E0E0E0?text=Commercial+Campaign+3', // [Hình ảnh chiến dịch thương mại 3]
      ],
    },
    {
      id: 'prod-3',
      title: 'Product Showcase',
      description: 'Highlighting product details and aesthetics with precision and creativity, ensuring every feature is presented artfully.',
      galleryImages: [
        'https://placehold.co/1920x1080/7A7A7A/E0E0E0?text=Product+Showcase+1', // [Hình ảnh trưng bày sản phẩm 1]
        'https://placehold.co/1920x1080/8A8A8A/E0E0E0?text=Product+Showcase+2', // [Hình ảnh trưng bày sản phẩm 2]
      ],
    },
  ],
  'Art Direction': [
    {
      id: 'art-1',
      title: 'Concept Development',
      description: 'Crafting unique visual concepts that define the narrative and aesthetic direction of each project, from inception to execution.',
      galleryImages: [
        'https://placehold.co/1920x1080/9A9A9A/E0E0E0?text=Art+Direction+Concept+1', // [Hình ảnh phát triển ý tưởng nghệ thuật 1]
        'https://placehold.co/1920x1080/A0A0A0/E0E0E0?text=Art+Direction+Concept+2', // [Hình ảnh phát triển ý tưởng nghệ thuật 2]
      ],
    },
    {
      id: 'art-2',
      title: 'Set Design & Styling',
      description: 'Transforming spaces and styling elements to create the perfect visual backdrop, enhancing the artistic integrity of the shoot.',
      galleryImages: [
        'https://placehold.co/1920x1080/B0B0B0/E0E0E0?text=Set+Design+Styling+1', // [Hình ảnh thiết kế và tạo kiểu bối cảnh 1]
        'https://placehold.co/1920x1080/C0C0C0/E0E0E0?text=Set+Design+Styling+2', // [Hình ảnh thiết kế và tạo kiểu bối cảnh 2]
      ],
    },
    {
      id: 'art-3',
      title: 'Visual Storytelling',
      description: 'Guiding the visual flow to tell a compelling story through a series of images, ensuring emotional resonance and artistic depth.',
      galleryImages: [
        'https://placehold.co/1920x1080/D0D0D0/E0E0E0?text=Visual+Storytelling+1', // [Hình ảnh kể chuyện bằng hình ảnh 1]
        'https://placehold.co/1920x1080/E0E0E0/333333?text=Visual+Storytelling+2', // [Hình ảnh kể chuyện bằng hình ảnh 2]
      ],
    },
  ],
  Branding: [
    {
      id: 'brand-1',
      title: 'Brand Identity Visuals',
      description: 'Developing visual assets that embody a brand\'s core values and aesthetic, creating a cohesive and memorable identity.',
      galleryImages: [
        'https://placehold.co/1920x1080/333333/E0E0E0?text=Brand+Identity+Visuals+1', // [Hình ảnh nhận diện thương hiệu 1]
        'https://placehold.co/1920x1080/444444/E0E0E0?text=Brand+Identity+Visuals+2', // [Hình ảnh nhận diện thương hiệu 2]
      ],
    },
    {
      id: 'brand-2',
      title: 'Brand Guideline Creation',
      description: 'Establishing comprehensive visual guidelines for consistent brand representation across all platforms and media.',
      galleryImages: [
        'https://placehold.co/1920x1080/555555/E0E0E0?text=Brand+Guideline+Creation+1', // [Hình ảnh tạo hướng dẫn thương hiệu 1]
        'https://placehold.co/1920x1080/666666/E0E0E0?text=Brand+Guideline+Creation+2', // [Hình ảnh tạo hướng dẫn thương hiệu 2]
      ],
    },
  ],
  Design: [
    {
      id: 'design-1',
      title: 'Graphic Design for Print',
      description: 'Creating stunning print materials that reflect high-end design principles, from editorial layouts to luxury brochures.',
      galleryImages: [
        'https://placehold.co/1920x1080/777777/E0E0E0?text=Graphic+Design+Print+1', // [Hình ảnh thiết kế đồ họa cho in ấn 1]
        'https://placehold.co/1920x1080/888888/E0E0E0?text=Graphic+Design+Print+2', // [Hình ảnh thiết kế đồ họa cho in ấn 2]
      ],
    },
    {
      id: 'design-2',
      title: 'Digital Asset Design',
      description: 'Designing engaging visual content for digital platforms and online presence, optimized for modern user experiences.',
      galleryImages: [
        'https://placehold.co/1920x1080/999999/E0E0E0?text=Digital+Asset+Design+1', // [Hình ảnh thiết kế tài sản số 1]
        'https://placehold.co/1920x1080/AAAAAA/E0E0E0?text=Digital+Asset+Design+2', // [Hình ảnh thiết kế tài sản số 2]
      ],
    },
  ],
};


// Home Section Component with Scroll Effects
const HomeSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.scrollHeight; // Total scrollable height of the section
      const viewportHeight = window.innerHeight;

      // Calculate the scroll progress within the *entire* home section's scrollable range
      // This range is from the top of the section until the end of the last image's display
      const totalScrollRange = sectionHeight - viewportHeight;
      let currentScroll = scrollY - sectionTop; // Scroll relative to the top of the section

      if (totalScrollRange > 0) {
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollRange));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0); // No scrollable range
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Define the scroll phases for each image to control timing
  // Each phase is now 1/3 of the total scroll range (0-1)
  const image1PhaseEnd = 0.33;
  const image2PhaseStart = 0.33;
  const image2PhaseEnd = 0.66;
  const image3PhaseStart = 0.66;
  const image3PhaseEnd = 1.0;

  // Calculate individual image progress within their respective phases
  const image1Progress = Math.min(1, scrollProgress / image1PhaseEnd);
  const image2Progress = Math.max(0, Math.min(1, (scrollProgress - image2PhaseStart) / (image2PhaseEnd - image2PhaseStart)));
  const image3Progress = Math.max(0, Math.min(1, (scrollProgress - image3PhaseStart) / (image3PhaseEnd - image3PhaseStart)));

  // Image 1: Fades out and moves up
  const image1Opacity = 1 - image1Progress;
  const image1Transform = `translateY(${image1Progress * -50}vh)`; // Moves up 50vh

  // Image 2: Slides from right, ends with 10% gap on left
  const image2Opacity = image2Progress;
  const image2Transform = `translateX(${100 - (image2Progress * 100)}%)`;

  // Image 3: Slides from left, positioned 1/10 from right, with tagline */}
  const image3Opacity = image3Progress;
  const image3Transform = `translateX(${-100 + (image3Progress * 100)}%)`;


  return (
    <section ref={sectionRef} className="relative w-full min-h-[300vh] overflow-hidden bg-white"> {/* Adjusted min-h to 300vh to ensure content fills the scroll */}
      {/* Image 1: Full bleed, fades out on scroll */}
      <div
        className="absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center transition-opacity duration-500 ease-out"
        style={{ opacity: image1Opacity, transform: image1Transform }}
      >
        <img
          src="https://placehold.co/1920x1080/000000/FFFFFF?text=Where+Image+Becomes+Iconic"
          alt="Gemersi Home Image 1 - Iconic"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/000000/FFFFFF?text=Where+Image+Becomes+Iconic"; }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-40 p-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-wide">
            Where Image Becomes Iconic
          </h1>
        </div>
      </div>

      {/* Image 2: Slides from right, positioned 1/10 from left, with tagline */}
      <div
        className="absolute top-[100vh] left-0 w-full h-[100vh] flex items-center justify-end transition-opacity duration-500 ease-out"
        style={{ opacity: image2Opacity, transform: image2Transform }}
      >
        <img
          src="https://placehold.co/1920x1080/1A1A1A/FFFFFF?text=Fashion+Art+Image+2"
          alt="Gemersi Home Image 2 - Right Aligned"
          className="w-[90%] h-full object-cover" // Occupies 90% width
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/1A1A1A/FFFFFF?text=Fashion+Art+Image+2"; }}
        />
        <div className="absolute left-0 w-[10%] h-full flex items-center justify-center text-center text-gray-900">
          <p className="font-serif text-xl font-bold tracking-widest rotate-90 whitespace-nowrap">
            Artistry in Every Frame
          </p>
        </div>
      </div>

      {/* Image 3: Slides from left, positioned 1/10 from right, with tagline */}
      <div
        className="absolute top-[200vh] left-0 w-full h-[100vh] flex items-center justify-start transition-opacity duration-500 ease-out"
        style={{ opacity: image3Opacity, transform: image3Transform }}
      >
        <img
          src="https://placehold.co/1920x1080/2A2A2A/FFFFFF?text=Fashion+Art+Image+3"
          alt="Gemersi Home Image 3 - Left Aligned"
          className="w-[90%] h-full object-cover" // Occupies 90% width
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/2A2A2A/FFFFFF?text=Fashion+Art+Image+3"; }}
          />
        <div className="absolute right-0 w-[10%] h-full flex items-center justify-center text-center text-gray-900">
          <p className="font-serif text-xl font-bold tracking-widest rotate-90 whitespace-nowrap">
            Artistry in Every Frame
          </p>
        </div>
      </div>
    </section>
  );
};

// Project Detail View Component
const ProjectDetailView = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Reset index when project changes
    setCurrentImageIndex(0);
  }, [project]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % project.galleryImages.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + project.galleryImages.length) % project.galleryImages.length
    );
  };

  // Scroll to current image when index changes
  useEffect(() => {
    if (galleryRef.current) {
      // Calculate scroll position based on current image index and image width
      // Each image is now 40% of the container width (100% / 2.5 images)
      const imageWidth = galleryRef.current.offsetWidth * 0.4; // 40% of the gallery container's width
      galleryRef.current.scrollTo({
        left: currentImageIndex * imageWidth,
        behavior: 'smooth',
      });
    }
  }, [currentImageIndex]);


  if (!project) return null;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-white pt-24">
      <div className="w-full text-center mb-8 px-6">
        <p className="font-sans text-sm text-gray-600 mb-2 tracking-wider uppercase">
          {project.title}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-wide">
          {project.title}
        </h1>
        <p className="font-sans text-md text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="relative w-full overflow-hidden px-6"> {/* Added horizontal padding */}
        <div ref={galleryRef} className="flex overflow-x-scroll snap-x snap-mandatory w-full py-4 space-x-4 custom-scrollbar"> {/* Added space-x-4 for gap */}
          {project.galleryImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(40%-1rem)] h-[70vh] snap-start relative"> {/* Adjusted width for 2.5 images + gap */}
              <img
                src={image}
                alt={`${project.title} Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1920x1080/CCCCCC/000000?text=${encodeURIComponent(project.title)}+${index + 1}`; }}
              />
            </div>
          ))}
        </div>

        {/* Custom scrollbar for better visibility (Tailwind doesn't have direct scrollbar styling) */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>

        {/* Navigation Buttons */}
        {project.galleryImages.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

// About Us Section Component
const AboutUsSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dylon Nguyen',
      role: 'CEO & Project Manager',
      bio: 'Leading the vision and execution of every project, ensuring artistic integrity and client satisfaction.',
      imageUrl: 'https://placehold.co/300x500/000000/FFFFFF?text=Dylon+Nguyen+Portrait', // [Hình ảnh chân dung Dylon Nguyen]
      social: {
        // Removed social media links
      }
    },
    {
      id: 2,
      name: 'Andy',
      role: 'Photographer & Retoucher',
      bio: 'Capturing moments with precision and enhancing them with a meticulous eye for detail in post-production.',
      imageUrl: 'https://placehold.co/300x500/1A1A1A/FFFFFF?text=Andy+Portrait', // [Hình ảnh chân dung Andy]
      social: {
        // Removed social media links
      }
    },
    {
      id: 3,
      name: 'Stanley',
      role: 'Creative Art Director',
      bio: 'Crafting unique visual narratives and guiding the artistic direction to achieve compelling results.',
      imageUrl: 'https://placehold.co/300x500/2A2A2A/FFFFFF?text=Stanley+Portrait', // [Hình ảnh chân dung Stanley]
      social: {
        // Removed social media links
      }
    },
    {
      id: 4,
      name: 'Van',
      role: 'Project Assistant',
      bio: 'Supporting project coordination and ensuring seamless operations from planning to delivery.',
      imageUrl: 'https://placehold.co/300x500/3A3A3A/FFFFFF?text=Van+Portrait', // [Hình ảnh chân dung Van]
      social: {
        // Removed social media links
      }
    },
    {
      id: 5,
      name: 'Andrei',
      role: 'Designer',
      bio: 'Bringing concepts to life through innovative graphic and visual design solutions.',
      imageUrl: 'https://placehold.co/300x500/4A4A4A/FFFFFF?text=Andrei+Portrait', // [Hình ảnh chân dung Andrei]
      social: {
        // Removed social media links
      }
    },
    {
      id: 6,
      name: 'No Name',
      role: 'Marketing Executive',
      bio: 'Strategizing and executing marketing initiatives to expand our reach and connect with new audiences.',
      imageUrl: 'https://placehold.co/300x500/5A5A5A/FFFFFF?text=No+Name+Portrait', // [Hình ảnh chân dung No Name]
      social: {
        // Removed social media links
      }
    },
  ];

  return (
    <section className="bg-white p-8">
      <h2 className="font-serif text-5xl font-bold text-gray-900 mb-12 text-center tracking-wide relative">
        GEMERSI{' '}
        <span className="font-serif text-red-600 font-light text-3xl absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap">
          Team
        </span>
      </h2>
      <p className="font-sans text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto leading-relaxed mt-16"> {/* Added mt-16 to account for the "Team" text */}
        Gemersi is a collective of passionate artists and visual storytellers dedicated to creating impactful and elegant imagery. We believe in the power of visuals to communicate, inspire, and connect.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {teamMembers.map((member) => (
            <div key={member.id} className="bg-white text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-auto object-cover aspect-[3/5] grayscale hover:grayscale-0 transition-all duration-300 ease-in-out" // 3x5 ratio, grayscale
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x500/CCCCCC/000000?text=${encodeURIComponent(member.name)}`; }}
              />
              <div className="p-4">
                <h3 className="font-serif text-xl font-medium text-gray-900 mb-1 tracking-wide">{member.name}</h3>
                <p className="font-sans text-red-600 font-light mb-4 text-sm tracking-widest uppercase">{member.role}</p>
                {/* Removed social media links as requested */}
              </div>
            </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => (
  <section className="bg-white p-8 text-center">
    <h2 className="font-serif text-5xl font-bold text-gray-900 mb-12 tracking-wide">
      Contact
    </h2>
    <div className="max-w-xl mx-auto bg-white p-8 border border-gray-200">
      <div className="space-y-6 text-gray-700 text-lg">
        <p className="flex items-center justify-center space-x-3">
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.05 3.555L11.999 15.5 23.95 3.555 12 0 .05 3.555zM0 4.05v15.9L8.3 12.05 0 4.05zm24 0L15.7 12.05 24 19.95V4.05zM12 17.5l-8.3-8.3-3.7 3.7V24h24v-7.05l-3.7-3.7L12 17.5z"/></svg>
          <span>info@gemersi.com</span>
        </p>
        <p className="flex items-center justify-center space-x-3">
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/></svg>
          <span>+84 123 456 789</span>
        </p>
        <p className="flex items-center justify-center space-x-3">
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          <span>123 Art Street, District 1, Ho Chi Minh City, Vietnam</span>
        </p>
      </div>
      <div className="flex justify-center space-x-6 mt-8">
        {/* Removed social media links as requested */}
      </div>
    </div>
  </section>
);

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home'); // State to manage active section
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [activeProjectCategory, setActiveProjectCategory] = useState(null); // State for project category hover
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project detail

  // Function to handle navigation to project details
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveSection('project-detail'); // Set active section to a dedicated project detail view
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  // Function to render different sections based on activeSection state
  const renderSection = () => {
    if (activeSection === 'project-detail' && selectedProject) {
      return <ProjectDetailView project={selectedProject} />;
    }
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutUsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter antialiased text-gray-900">
      {/* Header */}
      <header className="bg-white py-6 sticky top-0 z-50 border-b border-gray-100">
        <nav className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-serif text-4xl font-bold text-gray-900 tracking-wider" onClick={() => { setActiveSection('home'); setSelectedProject(null); }}>
            GEMERSI
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-10">
            <li>
              <button
                onClick={() => { setActiveSection('home'); setSelectedProject(null); }}
                className={`text-lg font-medium tracking-wide hover:text-red-600 transition duration-300 ${activeSection === 'home' ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1' : ''}`}
              >
                Home
              </button>
            </li>
            {Object.keys(projectCategories).map((category) => (
              <li
                key={category}
                className="relative group h-full flex items-center" // Added h-full and flex items-center for better hover area
                onMouseEnter={() => setActiveProjectCategory(category)}
                onMouseLeave={() => setActiveProjectCategory(null)}
              >
                <button
                  className={`text-lg font-medium tracking-wide hover:text-red-600 transition duration-300 ${activeProjectCategory === category || (activeSection === 'project-detail' && projectCategories[category].some(p => p.id === selectedProject?.id)) ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1' : ''}`}
                >
                  {category}
                </button>
                {activeProjectCategory === category && (
                  // The dropdown list
                  <ul className="absolute left-0 top-full w-60 bg-white border border-gray-100 shadow-lg py-2 z-50">
                    {projectCategories[category].map((project) => (
                      <li key={project.id}>
                        <button
                          onClick={() => handleProjectClick(project)}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-red-600 transition duration-200 text-md"
                        >
                          {project.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => { setActiveSection('about'); setSelectedProject(null); }}
                className={`text-lg font-medium tracking-wide hover:text-red-600 transition duration-300 ${activeSection === 'about' ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1' : ''}`}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('contact'); setSelectedProject(null); }}
                className={`text-lg font-medium tracking-wide hover:text-red-600 transition duration-300 ${activeSection === 'contact' ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1' : ''}`}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4 mt-4 mx-4 border border-gray-100">
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <button
                  onClick={() => { setActiveSection('home'); setSelectedProject(null); setIsMobileMenuOpen(false); }}
                  className="text-lg font-medium text-gray-700 hover:text-red-600 transition duration-300"
                >
                  Home
                </button>
              </li>
              {Object.keys(projectCategories).map((category) => (
                <li key={category} className="w-full text-center">
                  <button
                    onClick={() => {
                      setActiveProjectCategory(activeProjectCategory === category ? null : category); // Toggle dropdown on mobile
                    }}
                    className="text-lg font-medium text-gray-700 hover:text-red-600 transition duration-300 py-2"
                  >
                    {category}
                  </button>
                  {activeProjectCategory === category && (
                    <ul className="pl-4 pt-2 space-y-2">
                      {projectCategories[category].map((project) => (
                        <li key={project.id}>
                          <button
                            onClick={() => handleProjectClick(project)}
                            className="block w-full text-center px-4 py-1 text-gray-600 hover:text-red-600 transition duration-200 text-md"
                          >
                            {project.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={() => { setActiveSection('about'); setSelectedProject(null); setIsMobileMenuOpen(false); }}
                  className="text-lg font-medium text-gray-700 hover:text-red-600 transition duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('contact'); setSelectedProject(null); setIsMobileMenuOpen(false); }}
                  className="text-lg font-medium text-gray-700 hover:text-red-600 transition duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-0 py-0"> {/* Removed padding for full bleed */}
        {renderSection()}
      </main>

      {/* Footer - Only Copyright */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gemersi</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
