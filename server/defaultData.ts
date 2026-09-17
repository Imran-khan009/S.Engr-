import { FullSiteData } from '../src/types';

export const defaultSiteData: FullSiteData = {
  settings: {
    brandName: "S • ENGR",
    professionalName: "Engr. Imran Khan",
    positioning: "Technology • IoT • Creative Design • Digital Marketing • Construction & Design • Teaching",
    brandConcept: "Learn • Create • Build • Teach • Hire",
    heroHeading: "BUILD. DESIGN. TEACH. SOLVE.",
    heroSupporting: "Technology, Creative Design & Real-World Solutions — Built with Purpose.",
    heroDescription: "I combine Computer Science, IoT, creative design, digital marketing, and construction project experience to create practical solutions for people, businesses and organizations.",
    email: "contact.engrimran@gmail.com",
    whatsapp: "03331244214",
    location: "HUB Chowki Balochistan",
    adminPasskey: "engr-imran-2025",
    demoMode: true,
    showPricing: true,
    showServices: true,
    showFeatures: true,
    ctaTitle: "Need a Customized Website?",
    ctaSupportingText: "Explore the demo or request a fully customized version built around your brand, services and business goals.",
    upgradeMessage: "Explore this working live demo or upgrade to a fully tailored premium platform featuring custom branding, client dashboard, custom domain, and bespoke API integrations.",
    premiumFeatures: {
      customBranding: true,
      customColors: true,
      customTypography: true,
      customSections: true,
      advancedAnimations: true,
      advancedPortfolioLayouts: true,
      customServicePages: true,
      advancedContactLeadSystem: true,
      customerDashboard: true,
      adminCMS: true,
      advancedAnalytics: true,
      customDomainSupport: true,
      advancedSEO: true,
      blogSystem: true,
      bookingSystem: true,
      clientPortal: true,
      paymentIntegration: true,
      customApiIntegrations: true
    }
  },
  services: [
    {
      id: "srv-web-dev",
      slug: "web-development",
      name: "Modern Web & UI Development",
      category: "Technology & Web",
      shortDescription: "High-performance business websites, portfolio hubs, landing pages, and responsive frontend interfaces built with modern web technologies.",
      problem: "Businesses and professionals often struggle with slow, template-cluttered websites that don't convert visitors or represent their brand identity properly.",
      solution: "Clean, performant, mobile-first websites structured with semantic code, rapid load times, and custom-tailored user journeys.",
      includedFeatures: [
        "Custom Responsive Layout (Mobile, Tablet, Desktop)",
        "Business & Portfolio Websites",
        "High-Converting Landing Pages",
        "Clean Semantic HTML/CSS/JavaScript & React",
        "Website UI Development & Micro-interactions",
        "Website Maintenance & Speed Optimization"
      ],
      tools: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5/CSS3", "Vite"],
      startingPrice: "$120",
      estimatedDelivery: "3-6 Days",
      portfolioExamples: ["NOORBAL E-Commerce Experience", "Corporate Agency Landing Page"],
      process: [
        "1. Discovery & Wireframing of Project Scope",
        "2. UI Component Architecture & Styling",
        "3. Interactive Features & API Integration",
        "4. Performance Testing & Cross-Device QA",
        "5. Deployment & Ongoing Maintenance"
      ],
      faqs: [
        {
          question: "Will the website work seamlessly on mobile phones?",
          answer: "Yes, every layout is tested thoroughly across standard mobile screens, tablets, and wide desktop displays."
        },
        {
          question: "Can I manage or edit content easily?",
          answer: "Yes, structured CMS components or admin panels can be configured for instant text and asset updates."
        }
      ],
      iconName: "Code2",
      featured: true
    },
    {
      id: "srv-iot-smart",
      slug: "iot-smart-technology",
      name: "IoT & Smart Hardware Solutions",
      category: "IoT & Smart Technology",
      shortDescription: "End-to-end microcontroller programming, sensor integration, automated irrigation and water monitoring prototypes using Arduino & ESP32.",
      problem: "Bridging the physical world with digital control requires precise hardware-software calibration, sensor telemetry, and reliable microcontrollers.",
      solution: "Engineered circuit schematics, custom embedded firmware, reliable relay triggers, and remote dashboard integration via Blynk/WiFi.",
      includedFeatures: [
        "Arduino & ESP32 Embedded Programming",
        "Sensor Telemetry (Ultrasonic, Soil Moisture, Temp/Humidity)",
        "Relay & Motor Driver Automation Logic",
        "Smart Monitoring Systems & Alert Buzzers",
        "Hardware + Software Calibration",
        "Functional Proof-of-Concept Prototypes",
        "Hands-on Technical Schematics & Guides"
      ],
      tools: ["Arduino IDE", "ESP32", "C/C++ Embedded", "Blynk IoT", "I2C Displays", "Relay Modules"],
      startingPrice: "$150",
      estimatedDelivery: "5-8 Days",
      portfolioExamples: ["Smart Irrigation System", "Smart Water Tank Telemetry"],
      process: [
        "1. Component Selection & Sensor Specification",
        "2. Circuit Diagramming & Breadboard Testing",
        "3. Firmware Development & Logic Optimization",
        "4. Telemetry Testing & Trigger Threshold Calibration",
        "5. Complete Code Documentation & Wiring Map"
      ],
      faqs: [
        {
          question: "Do you supply the code and circuit connection diagram?",
          answer: "Yes, you will receive fully commented source code along with a pinout wiring schematic."
        },
        {
          question: "Can these projects connect to mobile apps or cloud dashboards?",
          answer: "Yes, using ESP32 WiFi stacks we can feed data directly to platforms like Blynk or custom web dashboards."
        }
      ],
      iconName: "Cpu",
      featured: true
    },
    {
      id: "srv-prog-soft",
      slug: "programming-software",
      name: "Software & Core Programming",
      category: "Programming & Software",
      shortDescription: "Structured programming fundamentals, algorithm design, and desktop/utility software development in C++, C#, and JavaScript.",
      problem: "Complex computational logic and data structures can be prone to memory leaks, inefficient loops, or unclear architecture.",
      solution: "Clean, modular code built on computer science principles, object-oriented design, and well-documented functions.",
      includedFeatures: [
        "Programming Fundamentals & Problem Solving",
        "C++ Core Application Logic & Algorithms",
        "C# Desktop Tools & Utility Programs",
        "JavaScript Logic & Scripting",
        "Basic Software Development & Refactoring",
        "Code Documentation & Unit Logic Testing"
      ],
      tools: ["C++", "C#", ".NET", "JavaScript", "Visual Studio", "Git"],
      startingPrice: "$90",
      estimatedDelivery: "2-4 Days",
      portfolioExamples: ["Inventory Logic Engine", "Algorithm Simulation Utilities"],
      process: [
        "1. Requirement Specification & Algorithmic Breakdown",
        "2. Class Architecture & Data Structure Selection",
        "3. Implementation with Strict Type Checking",
        "4. Edge Case Handling & Performance Benchmark"
      ],
      faqs: [
        {
          question: "Can you assist with academic or institutional foundational code?",
          answer: "Yes, I offer clean, beginner-friendly annotated code ideal for learning or practical deployment."
        }
      ],
      iconName: "Terminal",
      featured: false
    },
    {
      id: "srv-graphic-brand",
      slug: "graphic-design-branding",
      name: "Brand Identity & Graphic Design",
      category: "Creative Design & Branding",
      shortDescription: "Purpose-driven visual design including logo marks, brand stylebooks, social media assets, and commercial advertising banners.",
      problem: "Inconsistent graphics and generic templates weaken market trust and fail to communicate business values clearly.",
      solution: "Distinctive geometric and typographic visual identities adhering to the Design → Brand → Content → Marketing pipeline.",
      includedFeatures: [
        "Vector Logo Design & Favicon Sets",
        "Comprehensive Brand Identity & Palette Guides",
        "High-Impact Social Media Post Templates",
        "Product Promotional Creatives & Posters",
        "Banner Adverts & Display Graphics",
        "Brand Deck & Presentation Layouts"
      ],
      tools: ["Adobe Illustrator", "Photoshop", "Figma", "Canva Pro", "Vector Assets"],
      startingPrice: "$75",
      estimatedDelivery: "2-4 Days",
      portfolioExamples: ["NOORBAL Brand Suite", "Industrial Equipment Creatives"],
      process: [
        "1. Brand Philosophy & Competitor Visual Audit",
        "2. Moodboarding & Concept Sketches",
        "3. Vector Execution & Typography Harmony",
        "4. Exporting Scalable Formats (SVG, PNG, PDF)"
      ],
      faqs: [
        {
          question: "What file formats will I receive?",
          answer: "All vector source files (AI/SVG/PDF) plus high-resolution WebP and PNG assets for immediate use."
        }
      ],
      iconName: "Palette",
      featured: true
    },
    {
      id: "srv-meta-marketing",
      slug: "digital-marketing-meta-ads",
      name: "Meta Ads & Digital Marketing",
      category: "Digital Marketing & Ads",
      shortDescription: "Structured Meta advertising campaigns, audience segment targeting, product research, and pragmatic marketing plans with zero fake claims.",
      problem: "Budget is frequently wasted on uncalibrated ad sets, incorrect targeting demographics, and unaligned creative messaging.",
      solution: "Data-grounded ad account setup, structured custom and lookalike audiences, methodical competitor analysis, and testable creative strategies.",
      includedFeatures: [
        "Meta Ads Manager Configuration & Pixel Audit",
        "Audience Demographic & Interest Research",
        "Product Market Fit & Competitor Analysis",
        "Ad Copy & Creative Angle Direction",
        "Campaign Budget Optimization (CBO/ABO) Strategy",
        "Social Media Growth Support & Action Plans"
      ],
      tools: ["Meta Ads Manager", "Audience Insights", "Ad Library", "Google Trends", "Canva"],
      startingPrice: "$110",
      estimatedDelivery: "4-7 Days",
      portfolioExamples: ["Retail E-Commerce Meta Funnel", "Service Lead Generation Funnel"],
      process: [
        "1. Product & Competitor Research Audit",
        "2. Audience Segmentation & Interest Stacking",
        "3. Campaign Structure (TOF / MOF / BOF) Strategy",
        "4. Ad Copywriting & Creative Alignment",
        "5. Launch Checklist & Performance Monitoring Protocol"
      ],
      faqs: [
        {
          question: "Do you guarantee 10x ROAS or fake revenue figures?",
          answer: "No. I never fabricate claims. I build realistic, verified marketing setups based on genuine data, sound targeting, and real market testing."
        }
      ],
      iconName: "TrendingUp",
      featured: true
    },
    {
      id: "srv-video-editing",
      slug: "video-editing",
      name: "Short-Form & Social Video Editing",
      category: "Video Editing",
      shortDescription: "Dynamic, fast-paced video edits for Instagram Reels, YouTube Shorts, promotional campaigns, and brand storytelling.",
      problem: "Raw footage without rhythm, captions, or sound design suffers from high drop-off rates within the first 3 seconds.",
      solution: "Paced cuts, kinetic typography captions, motion graphics accents, and crisp audio mixing engineered for high viewer retention.",
      includedFeatures: [
        "Instagram Reels & TikTok Format Optimization",
        "YouTube Shorts & Promotional Clips",
        "Kinetic Subtitles & Highlight Callouts",
        "Sound Design & Copyright-Free Audio Sync",
        "Color Grading & Clean Transitions",
        "Multi-Platform Aspect Ratio Formatting"
      ],
      tools: ["Premiere Pro", "CapCut Desktop", "After Effects", "Audition"],
      startingPrice: "$60",
      estimatedDelivery: "2-3 Days",
      portfolioExamples: ["Tech Breakdown Shorts", "Brand Showcase Reels"],
      process: [
        "1. Footage Review & Story Arc Trimming",
        "2. Hook Formulation (First 3 Seconds)",
        "3. Kinetic Subtitle Generation & Graphic Overlays",
        "4. Audio Balancing & Color Polish",
        "5. Multi-format High-Definition Export"
      ],
      faqs: [
        {
          question: "Do you provide vertical (9:16) format for mobile reels?",
          answer: "Yes, optimized primarily for Instagram Reels, YouTube Shorts, and TikTok with safe-zone considerations."
        }
      ],
      iconName: "Video",
      featured: false
    },
    {
      id: "srv-excel-data",
      slug: "excel-data-services",
      name: "Excel, Data Cleaning & Office Automation",
      category: "Excel & Data Services",
      shortDescription: "Systematic data entry, spreadsheet formatting, multi-condition formulas, pivot analysis, and automated office workflows.",
      problem: "Messy, duplicated spreadsheet data causes manual administrative headaches, computation errors, and reporting delays.",
      solution: "Sanitized data structures, automated lookup functions, formatted dashboards, and structured templates that eliminate manual rework.",
      includedFeatures: [
        "Accurate Data Entry & Data Cleansing",
        "Duplicate Elimination & Field Standardizing",
        "Advanced Excel Formulas (XLOOKUP, INDEX/MATCH, Dynamic Arrays)",
        "Pivot Tables & Executive Summary Dashboards",
        "Spreadsheet Automation & Macro Structuring",
        "Microsoft Word & Office Documentation"
      ],
      tools: ["Microsoft Excel", "Google Sheets", "Power Query", "MS Office"],
      startingPrice: "$45",
      estimatedDelivery: "1-2 Days",
      portfolioExamples: ["Supply Inventory Database", "Sales Commission Tracker"],
      process: [
        "1. Raw Dataset Inspection & Error Flagging",
        "2. Cleansing, Normalizing & Structuring",
        "3. Formula Architecture & Calculation Rules",
        "4. Layout Styling & Final Accuracy Verification"
      ],
      faqs: [
        {
          question: "Can you clean thousands of rows of messy customer data?",
          answer: "Yes, using structured formulas and power query routines to normalize columns and remove duplicates efficiently."
        }
      ],
      iconName: "FileSpreadsheet",
      featured: false
    },
    {
      id: "srv-construction-cad",
      slug: "construction-architecture-design",
      name: "Construction, 2D Layout & Site Coordination",
      category: "Construction & Design",
      shortDescription: "Architectural 2D layout planning, dimension verification, construction documentation, and civil site engineering coordination.",
      problem: "Site mismatches, unverified measurements, and poor coordination between drawings and on-ground workforce cause expensive construction delays.",
      solution: "Detailed 2D layout drafts, dimensional cross-checks, structured bills/documentation, and clear technical workforce communication.",
      includedFeatures: [
        "Architectural Layout Design & 2D Drafts",
        "Exact Dimensioning & Measurement Verification",
        "Building Layout & Structural Support Drafting",
        "Infrastructure Planning & Utility Coordination Support",
        "Construction Documentation & Site Work Logs",
        "On-Site Coordination & Workforce Technical Guidance"
      ],
      tools: ["AutoCAD 2D", "Drafting Tools", "Technical Blueprints", "Measurement Instruments"],
      startingPrice: "$180",
      estimatedDelivery: "5-10 Days",
      portfolioExamples: ["Commercial Facility 2D Plan", "Residential Plot Layout Coordination"],
      process: [
        "1. Boundary Dimension & Space Requirement Analysis",
        "2. Initial Spatial Grid & Wall Thickness Drafting",
        "3. Circulation Paths, Openings & Utility Clearance",
        "4. Detailed Dimension Annotations & Section Schedules",
        "5. Site Coordination Review & Final Handover Package"
      ],
      faqs: [
        {
          question: "Do you claim legal architect or registered structural engineering seals?",
          answer: "No. In accordance with professional integrity, I provide engineering drafting, site coordination, 2D layout design, and technical project management based on civil engineering diploma background and practical field experience."
        }
      ],
      iconName: "Compass",
      featured: true
    },
    {
      id: "srv-ai-automation",
      slug: "ai-automation-consultation",
      name: "AI & Practical Workflow Automation",
      category: "Technology & Web",
      shortDescription: "Assisting teams and individuals in integrating practical AI tools, automated tasks, and technology consultation.",
      problem: "Teams often waste hours on repetitive manual workflows without knowing how to integrate accessible AI utilities safely.",
      solution: "Practical AI prompt workflows, task automation scripts, and targeted technology consultation rooted in grounded CS principles.",
      includedFeatures: [
        "AI Fundamentals & Model Capability Auditing",
        "AI-Assisted Workflow Integration",
        "Task Automation & Notification Scripts",
        "Technology Strategy & Feasibility Consultation",
        "Step-by-step Staff Training on AI Utilities"
      ],
      tools: ["Python Scripts", "Prompt Engineering", "Open APIs", "Zapier/Make", "Automation Tools"],
      startingPrice: "$130",
      estimatedDelivery: "3-5 Days",
      portfolioExamples: ["Automated Document Pipeline", "Internal Knowledge Query Workflow"],
      process: [
        "1. Workflow Bottleneck Identification",
        "2. Feasibility & Security Consideration Review",
        "3. Script/Prompt Formulation & Testing",
        "4. Deployment & Team Training"
      ],
      faqs: [
        {
          question: "Is this suitable for small businesses?",
          answer: "Yes, focused entirely on cost-effective, straightforward automations that save real hours."
        }
      ],
      iconName: "Sparkles",
      featured: false
    }
  ],
  projects: [
    {
      id: "proj-noorbal",
      title: "NOORBAL — Brand & E-Commerce Platform",
      category: "Web Development + E-Commerce + Branding",
      description: "A premium, minimalist e-commerce digital experience developed for NOORBAL, combining distinct visual branding, responsive catalog browsing, and fluid cart architecture.",
      problem: "The client needed a digital presence that conveyed luxury and authenticity while maintaining lightning-fast performance across mobile networks.",
      solution: "Engineered a custom high-performance frontend interface featuring bespoke typography, optimized product imagery, and an intuitive checkout flow.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js"],
      tools: ["Figma", "Illustrator", "VS Code", "Git"],
      role: "Lead Full-Stack Developer & Brand Designer",
      projectType: "Commercial Brand & Web Experience",
      diagramType: "web-noorbal",
      images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"],
      featured: true,
      date: "2024",
      verifiedNotes: "Verified production project featuring custom branding and responsive storefront architecture."
    },
    {
      id: "proj-irrigation",
      title: "Automated Smart Irrigation System",
      category: "IoT & Automation",
      problem: "Traditional manual watering leads to severe water wastage or under-hydration in arid climates without real-time soil feedback.",
      solution: "Engineered an autonomous irrigation system with Arduino, analog soil moisture probe, 5V relay module, and a submersible DC pump. Automatically activates when moisture drops beneath calibrated thresholds.",
      description: "Hardware-software integrated prototype: Arduino Uno + Capacitive Soil Moisture Sensor + 5V Relay + DC Water Pump + Status Indicators.",
      technologies: ["Arduino C++", "Embedded Systems", "Analog Sensor ADC", "Relay Control"],
      tools: ["Arduino Uno", "Soil Moisture Probe", "5V Relay", "Multimeter", "Breadboard"],
      role: "Hardware & Firmware Engineer",
      projectType: "Physical IoT Engineering Prototype",
      diagramType: "iot-irrigation",
      images: ["https://images.unsplash.com/photo-1558441719-8b449c6ff673?q=80&w=1200&auto=format&fit=crop"],
      featured: true,
      date: "2024",
      verifiedNotes: "Complete working hardware schematic with moisture threshold calibration and fail-safe relay switching."
    },
    {
      id: "proj-tank-monitor",
      title: "Smart Water Tank Telemetry & Monitoring",
      category: "IoT & Smart Technology",
      problem: "Overhead and underground water storage tanks routinely overflow or run dry due to lack of visible telemetry, causing pump burnouts and utility waste.",
      solution: "Constructed an ESP32-based ultrasonic depth sensor with an I2C 1602 LCD for real-time percentage readouts, a warning buzzer for overflow/dry run, and WiFi telemetry sync via Blynk IoT.",
      description: "Microcontroller system featuring ESP32 + HC-SR04 Ultrasonic Distance Sensor + I2C 1602 LCD Screen + Active Buzzer + Blynk Cloud Dashboard.",
      technologies: ["ESP32", "WiFi 802.11 b/g/n", "I2C Protocol", "Blynk IoT Cloud", "C++ Firmware"],
      tools: ["ESP32 DevKit", "HC-SR04", "I2C LCD", "Blynk Mobile App"],
      role: "IoT System Developer & Circuit Designer",
      projectType: "Smart Utilities IoT Solution",
      diagramType: "iot-tank",
      images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"],
      featured: true,
      date: "2024",
      verifiedNotes: "Tested and deployed with sub-centimeter ultrasonic accuracy and remote mobile alerts."
    },
    {
      id: "proj-brand-creatives",
      title: "Corporate Visual Identity & Marketing Creatives",
      category: "Creative Design",
      problem: "Fragmented marketing collateral diluted brand recognition across social feeds and physical promotional banners.",
      solution: "Formulated a unified visual design system following the Design → Brand → Content → Marketing pipeline, including vector logo marks, typography scales, and social templates.",
      description: "End-to-end creative suite encompassing vector logo creation, palette harmony, social media carousel assets, and promotional banners.",
      technologies: ["Vector Graphics", "Typography Systems", "Color Theory", "Asset Optimization"],
      tools: ["Adobe Illustrator", "Photoshop", "Figma"],
      role: "Creative Director & Visual Designer",
      projectType: "Brand Identity Design",
      diagramType: "creative-flow",
      images: ["https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop"],
      featured: true,
      date: "2023 - 2024",
      verifiedNotes: "Scalable vector assets across print and digital media."
    },
    {
      id: "proj-video-content",
      title: "High-Retention Social Media Video Editing",
      category: "Video Editing",
      problem: "Audience retention dropped heavily on long-winded video content across short-form mobile channels.",
      solution: "Created engaging, tightly edited 30-60 second reels featuring dynamic animated subtitles, sound effects, motion graphics transitions, and fast narrative hooks.",
      description: "Produced a series of high-impact short-form videos for Instagram Reels and YouTube Shorts focusing on clarity, visual pacing, and audience engagement.",
      technologies: ["Kinetic Typography", "Motion Graphics", "Audio Mastering", "Pacing"],
      tools: ["Premiere Pro", "CapCut Desktop", "After Effects"],
      role: "Video Editor & Motion Designer",
      projectType: "Short-Form Video Production",
      diagramType: "video-timeline",
      images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"],
      featured: false,
      date: "2024",
      verifiedNotes: "Optimized for mobile vertical viewing (9:16) with safe-zone compliance."
    },
    {
      id: "proj-digital-marketing",
      title: "Targeted Meta Ads Strategy & Research",
      category: "Digital Marketing",
      problem: "Ad accounts suffered from overlapping audience ad sets, rising cost-per-click, and unverified audience assumptions.",
      solution: "Executed competitor ad audits, constructed structured audience personas, and implemented targeted testing funnels with measurable KPIs.",
      description: "Comprehensive campaign planning, audience segmentation, competitor research, and creative angle testing for regional client services.",
      technologies: ["Meta Ads Manager", "Targeting Segmentation", "Competitor Ad Auditing", "Analytics"],
      tools: ["Meta Business Suite", "Google Trends", "Canva Pro"],
      role: "Digital Marketing Specialist",
      projectType: "Campaign Strategy & Research",
      images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"],
      featured: false,
      date: "2023 - 2024",
      verifiedNotes: "Real audience research matrices and creative testing blueprints."
    },
    {
      id: "proj-construction-layout",
      title: "Commercial & Residential 2D Layout Coordination",
      category: "Construction & Design",
      problem: "Discrepancies between schematic concepts and practical site boundaries caused room dimension clashes and workforce confusion.",
      solution: "Drafted accurate 2D architectural layouts in AutoCAD with dimensioned wall centerlines, utility clearances, and coordinated weekly site workforce updates.",
      description: "CAD drafting, dimensional planning, infrastructure support documentation, and site team coordination for regional projects.",
      technologies: ["AutoCAD 2D", "Drafting Conventions", "Site Engineering Protocols", "Measurement Verification"],
      tools: ["AutoCAD", "Survey Measurements", "Spreadsheet Schedules"],
      role: "Site Coordinator & CAD Drafter",
      projectType: "Civil & Architectural Layout Planning",
      diagramType: "construction-cad",
      images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"],
      featured: true,
      date: "2022 - 2024",
      verifiedNotes: "Strictly verified site coordination and 2D layout planning. No false licensed certifications claimed."
    }
  ],
  experiences: [
    {
      id: "exp-iot-unicef",
      role: "IoT Instructor",
      organization: "UNICEF-Supported Youth Skills Development Program",
      location: "Hub, Balochistan",
      dates: "2023 – Present",
      responsibilities: [
        "Delivered hands-on training on microcontrollers (Arduino Uno, ESP32) and circuit fundamentals to aspiring students.",
        "Guided students through real-world sensor integration (temperature, ultrasonic, soil moisture, motion detection).",
        "Mentored student capstone projects from component selection to breadboard assembly and functional C++ code.",
        "Emphasized practical problem-solving: connecting embedded hardware to solve local community challenges."
      ],
      skills: ["IoT Systems", "Arduino", "ESP32", "C++ Embedded", "Hands-on Pedagogy", "Circuit Prototyping"],
      verified: true
    },
    {
      id: "exp-comp-unicef",
      role: "Computer Operator Instructor",
      organization: "UNICEF-Supported Program — GBHS Jam Yousaf Colony",
      location: "Hub, Balochistan",
      dates: "2022 – 2023",
      responsibilities: [
        "Conducted professional computing and digital literacy workshops for enrolled youth.",
        "Taught advanced Microsoft Office suites (Excel formulas, data entry, Word formatting, PowerPoint presentation).",
        "Instructed students on computer hardware diagnostics, operating system fundamentals, and internet safety.",
        "Prepared learners for practical employment and freelance digital workplace opportunities."
      ],
      skills: ["Computer Operation", "MS Excel", "MS Word", "Operating Systems", "Classroom Mentorship", "Data Management"],
      verified: true
    },
    {
      id: "exp-construction-coord",
      role: "Construction & Site Engineering Coordinator",
      organization: "Regional Civil & Infrastructure Projects",
      location: "Hub & Regional Sites",
      dates: "2021 – 2024",
      responsibilities: [
        "Produced and updated 2D AutoCAD site layouts, verifying ground measurements against technical blueprints.",
        "Coordinated with site foremen and technical labor crews to ensure structural alignment and safety standards.",
        "Documented daily site logs, material schedules, and progress reports for project stakeholders.",
        "Assisted in resolving on-site dimensional clashes before costly structural works commenced."
      ],
      skills: ["2D AutoCAD", "Site Coordination", "Workforce Management", "Measurement Verification", "Civil Engineering Diploma"],
      verified: true
    }
  ],
  education: [
    {
      id: "edu-bscs",
      degree: "Bachelor of Science in Computer Science (BS CS)",
      institution: "Lasbela University of Agriculture, Water & Marine Sciences (LUAWMS)",
      dates: "Graduated",
      location: "Uthal, Balochistan",
      details: "Comprehensive study of software engineering, programming paradigms (C++, JavaScript), database systems, algorithm design, and modern computer systems."
    },
    {
      id: "edu-diploma-civil",
      degree: "Diploma of Associate Engineering (DAE) in Civil Engineering",
      institution: "Government Polytechnic Institute / Recognized Technical Board",
      dates: "Completed",
      location: "Balochistan / Pakistan",
      details: "Foundational training in surveying, 2D drafting, structural measurements, construction materials, building layouts, and site management practices."
    }
  ],
  skillCategories: [
    {
      category: "Technology & Software",
      description: "Core computer science fundamentals, modern web stacks, and software development.",
      skills: [
        { name: "C++", tag: "Core" },
        { name: "C#", tag: "Software" },
        { name: "JavaScript / ES6+", tag: "Web" },
        { name: "React & TypeScript", tag: "Frontend" },
        { name: "HTML5 & Modern CSS3", tag: "Design" },
        { name: "Tailwind CSS", tag: "Styling" },
        { name: "Cyber Security Fundamentals", tag: "Security" },
        { name: "AI Fundamentals", tag: "AI" },
        { name: "BI Fundamentals", tag: "Analytics" }
      ]
    },
    {
      category: "IoT & Smart Systems",
      description: "Microcontroller engineering, sensor instrumentation, and automated telemetry.",
      skills: [
        { name: "Arduino Uno / Nano", tag: "Hardware" },
        { name: "ESP32 WiFi / BLE", tag: "Wireless" },
        { name: "Sensor Telemetry (Ultrasonic, Soil, Temp)", tag: "Sensors" },
        { name: "Relay & Actuator Control", tag: "Automation" },
        { name: "Blynk IoT Cloud", tag: "Cloud" },
        { name: "Circuit Breadboarding & Wiring", tag: "Electronics" }
      ]
    },
    {
      category: "Creative & Media",
      description: "Purpose-driven visual design, brand assets, and mobile video editing.",
      skills: [
        { name: "Graphic Design", tag: "Creative" },
        { name: "Vector Logo Design", tag: "Branding" },
        { name: "Brand Identity Systems", tag: "Visual" },
        { name: "Social Media Video Editing", tag: "Video" },
        { name: "Kinetic Typography & Reels", tag: "Content" },
        { name: "Adobe Illustrator & Photoshop", tag: "Design Tools" }
      ]
    },
    {
      category: "Digital Marketing",
      description: "Data-driven advertising setups, competitor audits, and audience research.",
      skills: [
        { name: "Meta Ads Campaign Setup", tag: "Paid Social" },
        { name: "Audience Persona Research", tag: "Targeting" },
        { name: "Competitor Ad Research", tag: "Strategy" },
        { name: "Product Market Analysis", tag: "Research" },
        { name: "Marketing Creative Planning", tag: "Strategy" }
      ]
    },
    {
      category: "Construction & Site Engineering",
      description: "Practical field measurements, 2D drafting, and on-site coordination.",
      skills: [
        { name: "AutoCAD 2D Layouts", tag: "CAD" },
        { name: "Site Dimensioning & Measurement", tag: "Survey" },
        { name: "Infrastructure Support Planning", tag: "Planning" },
        { name: "Site Workforce Coordination", tag: "Management" },
        { name: "Construction Documentation", tag: "Reporting" }
      ]
    },
    {
      category: "Teaching & Training",
      description: "Community empowerment, digital literacy, and hands-on technical instruction.",
      skills: [
        { name: "Hands-on IoT Training", tag: "Instructor" },
        { name: "Computer Operator Mentorship", tag: "Office Skills" },
        { name: "Project-Based Learning", tag: "Pedagogy" },
        { name: "Beginner-Friendly Pedagogy", tag: "Education" },
        { name: "Technical Curriculum Delivery", tag: "Training" }
      ]
    }
  ],
  socials: [
    {
      id: "soc-whatsapp",
      platform: "WhatsApp",
      name: "Direct WhatsApp",
      url: "https://wa.me/923331244214",
      handle: "03331244214",
      description: "Instant direct chat for rapid engineering project queries, IoT requirements, and milestones.",
      icon: "whatsapp",
      enabled: true
    },
    {
      id: "soc-fiverr",
      platform: "Fiverr",
      name: "Fiverr Marketplace",
      url: "https://www.fiverr.com/imran_khan1327",
      handle: "@imran_khan1327",
      description: "Book custom web development, IoT solutions, and design services via secure platform escrow.",
      icon: "fiverr",
      enabled: true
    },
    {
      id: "soc-facebook",
      platform: "Facebook",
      name: "Facebook Page",
      url: "https://www.facebook.com/profile.php?id=61586602392197",
      handle: "Engr. Imran Khan Official",
      description: "Community updates, training workshops, IoT experiments, and engineering tutorials.",
      icon: "facebook",
      enabled: true
    },
    {
      id: "soc-instagram",
      platform: "Instagram",
      name: "Instagram Account",
      url: "https://www.instagram.com/teachwithimran/?fbclid=IwY2xjawUY3OtwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMWViR1pwaVBSZFk5TzFRcUdzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeAv9ABRKX-4RSnDZM4U6yVvGtXYP4IB6gWrxdbxPx_DWJOZh9qc9OuMAln-4_aem_DA-2uqN7atJgb2zdqpJRAQ",
      handle: "@teachwithimran",
      description: "Behind-the-scenes engineering builds, design prototypes, and educational reels.",
      icon: "instagram",
      enabled: true
    },
    {
      id: "soc-linkedin",
      platform: "LinkedIn",
      name: "LinkedIn ID",
      url: "https://www.linkedin.com/in/imran-khan-b7299833a/",
      handle: "imran-khan-b7299833a",
      description: "Connect for engineering partnerships, professional updates, and technical consulting.",
      icon: "linkedin",
      enabled: true
    },
    {
      id: "soc-tiktok",
      platform: "TikTok",
      name: "TikTok Account",
      url: "https://www.tiktok.com/@teachwithimran?_r=1&_t=ZS-97yZged8h9B&fbclid=IwY2xjawUY3FVwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMWViR1pwaVBSZFk5TzFRcUdzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeB8UmAeVy_CWK7c5CUpW_o6Z77mkL-4RREzh8MRt1V16tH4u7fjpzvPxALto_aem_dXXpmci886GN_KWqPbqf7A",
      handle: "@teachwithimran",
      description: "Bite-sized technology demonstrations, IoT circuitry tips, and coding shorts.",
      icon: "tiktok",
      enabled: true
    },
    {
      id: "soc-youtube",
      platform: "YouTube",
      name: "YouTube Channel",
      url: "https://www.youtube.com/@TeachWithImran1",
      handle: "@TeachWithImran1",
      description: "Video tutorials on IoT, microcontrollers, programming, and tech education.",
      icon: "youtube",
      enabled: true
    },
    {
      id: "soc-upwork",
      platform: "Upwork",
      name: "Upwork Talent",
      url: "https://www.upwork.com",
      handle: "Engr. Imran Khan",
      description: "Hire for fixed-price contracts and long-term technical consulting projects.",
      icon: "upwork",
      enabled: true
    },
    {
      id: "soc-email",
      platform: "Email",
      name: "Official Email",
      url: "mailto:contact.engrimran@gmail.com",
      handle: "contact.engrimran@gmail.com",
      description: "Send formal project briefs, RFP specifications, and official inquiries.",
      icon: "email",
      enabled: true
    }
  ],
  leads: [
    {
      id: "lead-seed-1",
      fullName: "Tariq Mahmood",
      email: "tariq.m@example.com",
      phone: "+92 321 9876543",
      whatsapp: "+92 321 9876543",
      country: "Pakistan",
      serviceRequired: "Modern Web & UI Development",
      projectDescription: "Need a high-converting corporate landing page for an industrial supply company with catalog showcase.",
      referenceRequirements: "Clean modern design similar to modern tech startups with dark theme and contact form.",
      budget: "$250 - $400",
      deadline: "2 Weeks",
      preferredContactMethod: "WhatsApp",
      platformPreference: "Direct",
      status: "DISCUSSION",
      createdAt: "2025-02-10T14:20:00.000Z",
      adminNotes: "Discussed requirement on WhatsApp. Wireframe drafted."
    },
    {
      id: "lead-seed-2",
      fullName: "Rashid Ali",
      email: "rashid.eng@example.com",
      phone: "+92 301 5551234",
      whatsapp: "+92 301 5551234",
      country: "Pakistan",
      serviceRequired: "IoT & Smart Hardware Solutions",
      projectDescription: "Looking to build an automated soil moisture and climate monitoring prototype for a small greenhouse.",
      referenceRequirements: "Arduino or ESP32 with relay switch for pump and LCD display.",
      budget: "$180",
      deadline: "10 Days",
      preferredContactMethod: "Email",
      platformPreference: "Direct",
      status: "NEW",
      createdAt: "2025-02-14T09:15:00.000Z",
      adminNotes: "New inquiry from website form."
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Hassan Raza",
      email: "hassan.raza@example.com",
      subject: "Inquiry regarding student IoT workshop in Hub",
      message: "Assalam-o-Alaikum Engr. Imran, we are organizing a 3-day student tech boot camp in Hub and would like to invite you as guest IoT instructor.",
      createdAt: "2025-02-12T11:00:00.000Z",
      read: true
    }
  ],
  customRequests: []
};
