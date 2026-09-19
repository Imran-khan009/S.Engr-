import { FullSiteData } from '../src/types';

export const defaultSiteData: FullSiteData = {
  settings: {
    brandName: "S • ENGR",
    professionalName: "Engr. Imran Khan",
    positioning: "Technology • IoT • Creative Design • Digital Marketing • Construction & Design • Teaching",
    brandConcept: "Learn • Create • Build • Teach • Hire",
    heroHeading: "Technology, Digital & Engineering Solutions",
    heroSupporting: "Websites, IoT systems, digital services, creative design and practical technology training.",
    heroDescription: "Practical technology and engineering execution combining Computer Science, IoT embedded systems, creative media, and technical instruction.",
    email: "contact.engrimran@gmail.com",
    whatsapp: "03331244214",
    location: "HUB Chowki Balochistan",
    adminPasskey: "",
    demoMode: false,
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
      trade: "IoT",
      organization: "ALP Centre / Jamia Hussainia Naimia",
      supportingProgram: "UNICEF-supported program",
      location: "Hub, Balochistan",
      startDate: "07-Jun-2024",
      status: "Present",
      dates: "07-Jun-2024 – Present",
      responsibilities: [
        "Delivered hands-on training on microcontrollers (Arduino Uno, ESP32) and circuit fundamentals in the UNICEF-supported ALP program.",
        "Guided students through real-world sensor integration (temperature, ultrasonic, soil moisture, motion detection).",
        "Mentored student capstone projects from component selection to breadboard assembly and functional C++ code.",
        "Emphasized practical problem-solving: connecting embedded hardware to solve local community challenges."
      ],
      skills: ["IoT Systems", "Trade: IoT", "Arduino", "ESP32", "C++ Embedded", "Hands-on Pedagogy", "Circuit Prototyping"],
      verified: true
    },
    {
      id: "exp-comp-unicef",
      role: "Computer Operator Instructor",
      trade: "Computer Operator",
      organization: "GBHS Jam Yousaf Colony, District Hub",
      supportingProgram: "UNICEF / European Union supported program",
      location: "District Hub, Balochistan",
      startDate: "Apr-2025",
      status: "Present",
      dates: "Apr-2025 – Present",
      responsibilities: [
        "Conducted professional computing and digital literacy workshops for enrolled youth under the UNICEF / European Union supported program.",
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
      organization: "Regional Civil Infrastructure Works",
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
      institution: "Recognized Board of Technical Education [Institutional details verified upon request]",
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
  customRequests: [],
  teachingServices: [
    {
      id: "ts-lesson-plans",
      slug: "lesson-plan-development",
      title: "Lesson Plan Development",
      category: "Instructional Design",
      subtitle: "Structured, activity-rich, and outcome-oriented lesson frameworks for STEM, vocational, and technical subjects.",
      shortDescription: "Custom daily, weekly, and modular lesson plans engineered with clear instructional objectives, time allocations, hands-on tasks, and formative check-ins.",
      description: "Teaching technical or foundational concepts requires more than speaking from slides. Our Lesson Plan Development service supplies structured blueprints that map each minute of instructional time to concrete cognitive outcomes. Every plan integrates contextual real-world examples, interactive engagement intervals, and diagnostic checkpoints to ensure high retention without student fatigue.",
      whoIsThisFor: [
        "School, college, and vocational STEM teachers seeking structured, accredited lesson flow",
        "Technical instructors transitioning from industry into formal classroom or lab teaching",
        "Training institutes needing standardized, repeatable lesson delivery blueprints",
        "Tutors and educators preparing beginner students for technical examinations"
      ],
      subOfferings: [
        { title: "Daily Lesson Plans", description: "Period-by-period instructional breakdowns including warm-up hook, concept delivery, guided practice, and closure." },
        { title: "Weekly Lesson Plans", description: "Five-to-six day progressive instructional sequences ensuring continuous concept reinforcement and milestone pacing." },
        { title: "Module-wise Lesson Plans", description: "Comprehensive multi-week unit plans organizing interconnected topics into coherent skill trajectories." },
        { title: "Practical Lesson Plans", description: "Hardware lab and software coding session structures with step-by-step bench exercises and safety/debugging protocols." },
        { title: "Activity-based Lesson Plans", description: "Interactive classroom strategies prioritizing peer collaboration, tactile experimentation, and scenario problem-solving." },
        { title: "Beginner-level Lesson Plans", description: "Specialized gentle scaffolding that breaks intimidating jargon and complex formulas into intuitive mental models." }
      ],
      whatIsIncluded: [
        "Structured lesson delivery roadmap with timed minute-by-minute guidance",
        "Prerequisite knowledge check and introductory hook strategy",
        "Detailed teacher explanation prompts, analogies, and whiteboard/boardwork diagrams",
        "Student hands-on task prompts with differentiated tiers for varied paces",
        "Assessment checkpoint questions with rubric guidance",
        "Teacher self-reflection log and follow-up homework prompts"
      ],
      deliverables: [
        "Print-ready formatted lesson plan documents (PDF)",
        "Fully editable digital source files (Word / Google Docs)",
        "Instructional activity cards & slide breakdown outline",
        "Teacher quick-reference cue sheets for classroom execution"
      ],
      samplePreview: {
        title: "Sample Structure Excerpt: IoT Sensor Interfacing (Lesson 04)",
        excerpt: "[00-05 min: Contextual Hook - Real-world water wastage problem] -> [05-15 min: Concept Architecture - Voltage divider & analog pin conversion] -> [15-30 min: Guided Breadboard Setup - Circuit wiring & serial monitor debugging] -> [30-40 min: Individual Student Challenge - Calibrate dry vs. wet soil threshold] -> [40-45 min: Reflection & Formative Exit Ticket].",
        notice: "Full complete lesson plans, exercise keys, and slides are delivered securely via licensed educational package upon confirmed project scope."
      },
      process: [
        "Curriculum & Audience Diagnostic: We analyze your subject syllabus, target grade/skill level, and classroom facilities.",
        "Instructional Objective Mapping: Define measurable student competencies for each lesson block.",
        "Lesson Framework Drafting: Build timed delivery stages, analogies, practical tasks, and assessment triggers.",
        "Educator Review & Customization: You review the draft for pacing adjustments specific to your teaching style.",
        "Final Package Delivery: Receive polished, formatted, and ready-to-teach editable files."
      ],
      faqs: [
        {
          question: "Can you create lesson plans tailored to specific regional or national boards?",
          answer: "Yes. Plans can be calibrated to align with local educational boards (e.g. Matric, FBISE, Cambridge IGCSE/O-Level, TVET/vocational technical frameworks) or custom institutional syllabi."
        },
        {
          question: "Do your practical lesson plans include hardware component lists?",
          answer: "Absolutely. Practical STEM/IoT plans detail exact component specs (e.g., ESP32, resistor values, breadboards), pin diagrams, and safety guidelines."
        },
        {
          question: "In what format will I receive the lesson plans?",
          answer: "You receive clean, professional PDF printouts as well as fully editable DOCX files so you can customize them across semesters."
        }
      ],
      pricingType: "starting_at",
      startingPrice: "$35",
      premiumPrice: "$85",
      deliveryTime: "2-4 Business Days",
      icon: "BookOpen",
      enabled: true,
      order: 1
    },
    {
      id: "ts-teaching-methods",
      slug: "teaching-method-support",
      title: "Teaching Method Support",
      category: "Pedagogical Consulting",
      subtitle: "Transform passive lectures into high-engagement, practical learning sessions tailored for technical & beginner students.",
      shortDescription: "Evidence-based teaching techniques, active classroom management, theory-to-practice synchronization, and beginner engagement strategies.",
      description: "When students lose interest or struggle to grasp technical subjects, the issue is almost never the students' intelligence—it is the instructional delivery method. Our Teaching Method Support equips educators with actionable pedagogical tools: from effective board breakdown and experiential inquiry to tactile hardware demonstrations and peer-driven problem solving.",
      whoIsThisFor: [
        "Educators facing low student participation, boredom, or absenteeism in technical classes",
        "Subject-matter experts (engineers, programmers) transitioning into teaching roles",
        "Instructors teaching mixed-ability classrooms with wide skill disparities",
        "Academic heads seeking to elevate departmental teaching standards"
      ],
      subOfferings: [
        { title: "Lesson Delivery Structure", description: "Mastering the Hook-Model-Apply-Reflect instructional delivery arc to eliminate student cognitive overload." },
        { title: "Theory + Practical Planning", description: "Seamlessly marrying theoretical physics/math formulas to tangible breadboards, code editors, or real-world tools." },
        { title: "Student Engagement Activities", description: "Dynamic classroom protocols including Think-Pair-Share, error-hunting challenges, and live coding relays." },
        { title: "Beginner-Student Teaching Strategies", description: "Techniques for demystifying technical jargon, building psychological safety, and fostering curiosity." },
        { title: "Classroom Activity Planning", description: "Time-bounded, highly structured physical and intellectual tasks that keep all students actively thinking." },
        { title: "Practical Learning Approaches", description: "Shift from passive memorization to problem-driven engineering workflows mirroring real industrial challenges." }
      ],
      whatIsIncluded: [
        "Pedagogical strategy toolkit customized to your subject domain",
        "Classroom engagement framework with 12+ reusable interactive exercises",
        "Scaffolding guides for beginner students experiencing math or coding anxiety",
        "Step-by-step guidance for running friction-free practical laboratory sessions",
        "Direct teacher feedback rubrics to assess engagement in real time"
      ],
      deliverables: [
        "Teaching Methodology Implementation Guide (PDF & DOCX)",
        "Quick-reference Classroom Engagement Playbook",
        "Student Interaction Checklist for everyday lesson delivery",
        "1-on-1 virtual walkthrough session (optional add-on)"
      ],
      samplePreview: {
        title: "Sample Method Concept: The Dual-Track Theory-Lab Synchronization",
        excerpt: "Never teach 45 minutes of abstract circuit equations followed by an isolated lab days later. Introduce a 7-minute visual concept teaser, prompt students to predict the voltmeter reading, verify on physical hardware within 8 minutes, and synthesize the mathematical equation together from the observed reality.",
        notice: "Full pedagogical playbooks and workshop slides are provided in the complete customized consultation pack."
      },
      process: [
        "Classroom Challenge Audit: Identify specific bottlenecks (e.g. passive students, rapid drop-off, concept confusion).",
        "Methodology Calibration: Formulate a customized delivery model suited to your class size, subject, and physical environment.",
        "Playbook Development: Compile concrete delivery techniques, scripts, and engagement prompts.",
        "Review & Implementation Coaching: Walk through the strategies to ensure complete confidence.",
        "Follow-Up Refinement: Review classroom results and fine-tune delivery pacing."
      ],
      faqs: [
        {
          question: "Can these methods work in classrooms with limited technology?",
          answer: "Yes! Strategies are designed to thrive in both high-tech computer labs and standard chalkboard/whiteboard classrooms without expensive gear."
        },
        {
          question: "How quickly can an instructor apply these techniques?",
          answer: "From Day 1. The playbooks emphasize immediate, high-impact changes such as revised question phrasing, timed partner problem-solving, and visual framing."
        }
      ],
      pricingType: "starting_at",
      startingPrice: "$45",
      premiumPrice: "$110",
      deliveryTime: "3-5 Business Days",
      icon: "Wrench",
      enabled: true,
      order: 2
    },
    {
      id: "ts-course-training-structure",
      slug: "course-and-training-structure",
      title: "Course & Training Structure",
      category: "Curriculum Architecture",
      subtitle: "End-to-end curriculum design, modular outlines, progressive learning objectives, and vocational training schedules.",
      shortDescription: "Architect complete educational curricula and boot camp training schedules with coherent prerequisite progressions, hands-on milestones, and objective milestones.",
      description: "A successful educational program requires an architected roadmap. We design comprehensive course blueprints from scratch—whether for a 4-week youth computer literacy boot camp, a semester-long microcontroller curriculum, or professional corporate workforce upskilling. Every course structure balances rigorous fundamentals with practical portfolio projects.",
      whoIsThisFor: [
        "Vocational training centers, NGOs, and youth skill-development programs",
        "Colleges and private academies launching new technical or computing courses",
        "Instructors building their own commercial boot camps or online training cohorts",
        "Corporate trainers standardizing onboarding technical curricula"
      ],
      subOfferings: [
        { title: "Course Outlines", description: "Comprehensive course descriptions, prerequisite roadmaps, and high-level learning competencies." },
        { title: "Module Structure", description: "Logical topic compartmentalization ensuring steady concept build-up without jarring skill leaps." },
        { title: "Learning Objectives", description: "Bloom's taxonomy-aligned, measurable performance indicators for every module." },
        { title: "Practical Activities", description: "Integrated hands-on assignments, team projects, and lab experiments mapped to each chapter." },
        { title: "Training Schedules", description: "Day-by-day or week-by-week delivery schedules accounting for holidays, review buffers, and exam days." },
        { title: "Assessment Structure", description: "Grading distributions, formative quiz schedules, midterm reviews, and capstone evaluation metrics." }
      ],
      whatIsIncluded: [
        "Full Course Specification Document (Course Description, Aims, Competencies)",
        "Module Breakdown Matrix with weekly time allocations and lab splits",
        "Detailed Project Roadmap leading to a student portfolio piece",
        "Required textbook, hardware equipment, and software tool lists",
        "Instructor Teaching Guide & Scheduling Calendar"
      ],
      deliverables: [
        "Master Curriculum & Course Guide (PDF + Editable DOCX)",
        "Visual Course Roadmap Diagram for student onboarding / promotional brochures",
        "Weekly Training Schedule spreadsheet / Gantt outline",
        "Assessment weighting and criteria rubric"
      ],
      samplePreview: {
        title: "Curriculum Blueprint Architecture Excerpt",
        excerpt: "Module 01: Foundations (30% Theory, 70% Terminal Exploration) -> Module 02: Computational Logic (Guided Mini-Project) -> Module 03: Hardware / API Interfacing -> Capstone: Real-world Community Solution.",
        notice: "Full institutional curriculum packages include complete accredited lecture schedules and lab requirements."
      },
      process: [
        "Goal & Audience Specification: Clarify target learning outcomes, duration, student starting baseline, and institutional constraints.",
        "Macro Scope & Sequence: Define high-level module hierarchy and core milestones.",
        "Granular Module Construction: Flesh out topics, practical challenges, and assessment checkpoints.",
        "Administrative & Teacher Alignment: Review with academic stakeholders for pacing and resource compatibility.",
        "Final Package Deployment: Provide clean institutional documentation."
      ],
      faqs: [
        {
          question: "Can you design a course for non-technical beginners?",
          answer: "Yes. Having designed and delivered UNICEF-supported IoT and Computer Operator courses for underprivileged youth, beginner scaffolding is a core specialization."
        },
        {
          question: "Do you provide guidance on hardware/software procurement?",
          answer: "Yes, every technical course specification includes recommended, budget-conscious component lists and free, open-source software options."
        }
      ],
      pricingType: "custom_quote",
      startingPrice: "$75",
      premiumPrice: "$180",
      deliveryTime: "5-7 Business Days",
      icon: "Layers",
      enabled: true,
      order: 3
    },
    {
      id: "ts-worksheets-assessments",
      slug: "worksheets-and-assessments",
      title: "Worksheets & Assessments",
      category: "Assessment Design",
      subtitle: "Accurately measure understanding with balanced MCQs, problem-solving worksheets, lab tasks, and grading rubrics.",
      shortDescription: "Rigorous yet encouraging testing instruments: diagnostic quizzes, conceptual worksheets, hands-on lab challenges, and answer keys.",
      description: "Fair and informative assessment design is essential for effective teaching. We create targeted evaluation material that tests real conceptual understanding rather than surface-level memorization. From rapid 5-minute exit tickets and scenario-based worksheets to comprehensive mid-term examination papers and practical bench tests.",
      whoIsThisFor: [
        "Teachers needing fresh, original worksheets and test questions to avoid textbook regurgitation",
        "Vocational examiners designing practical hands-on grading criteria",
        "Online educators requiring automated or printable quiz packs for their students",
        "Institutions standardizing mid-term and final examination quality"
      ],
      subOfferings: [
        { title: "MCQs & Conceptual Quizzes", description: "Carefully calibrated multiple-choice questions with plausible distractors that diagnose common misconceptions." },
        { title: "Worksheets & Practice Sheets", description: "Structured step-by-step problem sets with graduated difficulty from beginner to advanced challenge." },
        { title: "Assignments & Homework Sets", description: "Research-driven or code-building assignments that foster independent student discovery." },
        { title: "Quizzes (Formative Assessments)", description: "Low-stakes 5-to-10 minute diagnostic quizzes to check understanding before moving ahead." },
        { title: "Practical Tasks & Lab Challenges", description: "Concrete hands-on wiring, coding, or typing performance tasks with time targets." },
        { title: "Basic Assessment Plans & Rubrics", description: "Objective grading rubrics and marking keys to ensure fair, transparent student feedback." }
      ],
      whatIsIncluded: [
        "Student Examination / Worksheet Master (clean, printable layout)",
        "Teacher Answer Key with step-by-step problem resolutions and diagnostic notes",
        "Grading Rubric Matrix for open-ended or practical challenges",
        "Differentiated versions for mixed-ability classrooms (Standard & Advanced)",
        "Digitally fillable PDF and editable Word formats"
      ],
      deliverables: [
        "Print-ready PDF worksheets (formatted for standard A4 paper)",
        "Editable Word / Google Docs source files",
        "Teacher Solution Guide with full scoring breakdowns",
        "Quick MCQ answer grid for rapid grading"
      ],
      samplePreview: {
        title: "Assessment Architecture Excerpt",
        excerpt: "Section A: Conceptual Diagnosis (10 MCQs testing foundational logic) | Section B: Circuit Debugging / Code Tracing (Identify the bug in the given snippet) | Section C: Practical Design Challenge (Calculate component values for specific voltage threshold).",
        notice: "Complete questions, student test sheets, and official answer keys are supplied via private delivery to verified educators."
      },
      process: [
        "Curriculum Topic Alignment: You specify the chapter, module, and learning standards to assess.",
        "Item Formulation: We write original, vetted questions balanced across Bloom's cognitive tiers.",
        "Solution & Key Verification: Step-by-step solutions are generated and cross-checked for accuracy.",
        "Layout & Formatting: Documents are typeset into clean, distraction-free printable formats.",
        "Delivery: Receive both student worksheets and instructor answer keys."
      ],
      faqs: [
        {
          question: "Are complete answer keys and solutions provided?",
          answer: "Yes, every assessment package includes a comprehensive Teacher Answer Key with detailed explanations for each question."
        },
        {
          question: "Can questions be exported for Google Forms or online quiz platforms?",
          answer: "Yes! Upon request, we format questions for easy import into Google Forms, Kahoot, or Moodle."
        }
      ],
      pricingType: "starting_at",
      startingPrice: "$25",
      premiumPrice: "$60",
      deliveryTime: "1-3 Business Days",
      icon: "FileCheck",
      enabled: true,
      order: 4
    },
    {
      id: "ts-teacher-consultation",
      slug: "teacher-instructor-consultation",
      title: "Teacher / Instructor Consultation",
      category: "1-on-1 Mentorship",
      subtitle: "Targeted problem-solving for classroom roadblocks: low student interest, engagement barriers, and technical explanation struggles.",
      shortDescription: "Direct consultative troubleshooting for educators facing real classroom challenges. Get personalized advice, structured solutions, and actionable strategies.",
      description: "Teaching is one of the most demanding professions in the world. When you face disengaged students, feel overwhelmed by lesson preparation, or struggle to communicate an intricate technical topic, you don't need generic theory—you need practical, real-world solutions from someone who has stood in front of challenging classrooms. Our 1-on-1 consultation delivers personalized troubleshooting for your exact teaching context.",
      whoIsThisFor: [
        "Teachers struggling with student apathy, low participation, or disruptive disengagement",
        "Educators preparing for high-stakes demo lessons or teacher recruitment interviews",
        "Technical instructors teaching students who lack computer or mathematical backgrounds",
        "Instructors looking to revamp their lesson flow, laboratory structure, and energy"
      ],
      subOfferings: [
        { title: "Students Are Not Participating", description: "Diagnose communication anxiety, restructure question loops, and install peer-discussion habits." },
        { title: "Students Have Low Interest", description: "Anchor dry syllabus theory into immediate real-world utility, local challenges, and career aspirations." },
        { title: "Students Are Beginners", description: "Construct gentle scaffolding analogies that give inexperienced learners early quick wins without overwhelming them." },
        { title: "Difficulty Explaining a Topic", description: "Co-develop intuitive metaphors, physical demonstrations, and whiteboard steps for tough concepts." },
        { title: "Need Practical Activities", description: "Design zero-cost or low-budget bench exercises and games that reinforce current textbook chapters." },
        { title: "Need Lesson Structure & Timing", description: "Calibrate lesson pacing so you never run out of time or leave students stranded before the bell." },
        { title: "Need Classroom Engagement Ideas", description: "Inject high-energy, structured interactive routines that revitalize sluggish morning or afternoon sessions." }
      ],
      whatIsIncluded: [
        "Pre-session diagnostic intake to review your class syllabus and specific pain points",
        "Dedicated 45-minute live consultation (via Google Meet / Zoom / WhatsApp Call)",
        "Written Action Plan summarizing custom strategies, classroom scripts, and exercises",
        "Follow-up email review of your next executed lesson plan"
      ],
      deliverables: [
        "1-on-1 Dedicated Video / Audio Strategy Call",
        "Customized Post-Call Action Plan & Classroom Script (PDF)",
        "Recommended tools, activity templates, and pedagogical links",
        "7-day follow-up messaging support for post-lesson feedback"
      ],
      samplePreview: {
        title: "Sample Consultation Resolution Framework",
        excerpt: "Problem: Students silent when asked questions. Diagnosis: Fear of public error in front of peers. Solution Installed: The 90-Second Silent Write + Pair Confirm protocol, shifting response rate from 5% to 85% in one week.",
        notice: "Consultations are confidential and tailored directly to your specific teaching environment."
      },
      process: [
        "Submit Challenge: Book your consultation and describe the specific obstacle you are experiencing.",
        "Diagnostic Preparation: We analyze the challenge and prepare customized pedagogical interventions.",
        "Live Strategy Session: 45 minutes of focused, collaborative problem-solving and role-play practice.",
        "Action Plan Delivery: Receive your written implementation guide with scripts and exercises.",
        "Classroom Execution & Follow-Up: Execute the strategy in class with follow-up support."
      ],
      faqs: [
        {
          question: "Can we focus on a specific difficult topic I have to teach next week?",
          answer: "Yes! Many teachers use this consultation specifically to plan an upcoming difficult lecture, such as microcontrollers, binary logic, or circuit equations."
        },
        {
          question: "What platforms do you use for the consultation call?",
          answer: "We can connect via Google Meet, Zoom, or WhatsApp video/audio call based on your preference and internet bandwidth."
        }
      ],
      pricingType: "fixed",
      startingPrice: "$35",
      premiumPrice: "$70",
      deliveryTime: "Book within 24-48 Hours",
      icon: "Users",
      enabled: true,
      order: 5
    }
  ],
  teachingConsultation: {
    title: "Teaching Consultation",
    headline: "Having a teaching or classroom challenge? Let's work through it together.",
    subtext: "Personalized 1-on-1 pedagogical troubleshooting for teachers, instructors, and training leads navigating low engagement, beginner anxiety, or curriculum pacing.",
    price: "$35",
    duration: "45 min Session",
    topics: [
      "Lesson planning & pacing",
      "Student engagement & attention",
      "Practical & hands-on teaching",
      "Course & module structure",
      "Classroom activities & games",
      "Assessment & rubric planning",
      "Beginner-level tech teaching",
      "Training methodology & delivery"
    ],
    enabled: true
  },
  teachingProducts: [
    {
      id: "tp-stem-lesson-kit",
      title: "Complete STEM & IoT Lesson Plan Starter Pack",
      category: "Lesson Plan Templates",
      description: "10 modular, editable lesson blueprints for teaching microcontroller fundamentals, digital sensors, and introductory C++ logic.",
      deliverableFormat: "ZIP / DOCX / PDF",
      price: "$29",
      previewPoints: [
        "10 Fully scripted daily lesson blueprints",
        "Accompanying slide outline and circuit diagrams",
        "Student lab challenge sheets with debug checklists",
        "Formative exit tickets and evaluation rubrics"
      ],
      isPaid: true,
      status: "active"
    },
    {
      id: "tp-active-engagement-playbook",
      title: "Active Classroom Engagement Playbook for Tech Instructors",
      category: "Teaching Templates",
      description: "20 battle-tested pedagogical routines and interactive exercises designed to keep students awake, active, and coding.",
      deliverableFormat: "PDF & Editable Docs",
      price: "$19",
      previewPoints: [
        "20 High-participation classroom protocols",
        "Step-by-step facilitation scripts and timer guidelines",
        "Techniques for cold-calling without generating anxiety",
        "Peer-review workflows for coding and circuit labs"
      ],
      isPaid: true,
      status: "active"
    },
    {
      id: "tp-hardware-lab-rubrics",
      title: "Vocational & Computer Operator Assessment Pack",
      category: "Assessment Packs",
      description: "Standardized evaluation rubrics, practical typing benchmarks, and system troubleshooting exam papers.",
      deliverableFormat: "PDF & Editable Spreadsheets",
      price: "$25",
      previewPoints: [
        "Grading rubrics for MS Office productivity & hardware handling",
        "Timed typing & data-entry diagnostic tests",
        "Practical bench troubleshooting test scenarios",
        "Official teacher scoring guides and grade calculators"
      ],
      isPaid: true,
      status: "active"
    }
  ],
  teachingRequests: [
    {
      id: "treq-seed-1",
      fullName: "Kamran Shah",
      email: "kamran.shah.edu@gmail.com",
      whatsapp: "03001234567",
      country: "Pakistan",
      userRole: "Teacher",
      subject: "Computer Science & Basic IoT",
      studentLevel: "Beginners (Grades 8-10)",
      topic: "Introduction to Microcontrollers & Digital Sensors",
      courseOrModule: "Vocational STEM Foundation",
      requiredServiceId: "ts-lesson-plans",
      requiredServiceName: "Lesson Plan Development",
      numberOfLessons: "5 Lessons",
      requiredFormat: "Editable Word / Google Docs",
      deadline: "10 Days",
      budget: "$50 - $80",
      additionalRequirements: "Need practical breadboard wiring instructions included for each lesson so students can follow along in the computer lab.",
      status: "REVIEWING",
      createdAt: "2025-02-13T10:30:00.000Z",
      adminNotes: "Drafting 5-lesson sequence. Communicated via WhatsApp."
    }
  ]
};

