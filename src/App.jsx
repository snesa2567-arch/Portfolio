import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Brain, BarChart3, Download, ExternalLink, Mail, Github, Linkedin, X, Menu, 
  Layers, Map, Award, Briefcase, GraduationCap, FileText, ArrowRight, ShieldCheck, Activity,
  AlertCircle, Code, Star, Scale, FileJson, Search, GitBranch, TrendingUp, CheckCircle2,
  ChevronRight, Cpu, Network, LayoutDashboard, LineChart, Workflow, ServerCog, Sparkles,
  Calendar, Check, MonitorPlay, Zap, ArrowUpRight
} from 'lucide-react';

// ==========================================
// 1. GLOBAL IMAGE FALLBACK (NEW ADD-ON)
// ==========================================
const handleImageError = (e) => {
  // Uses placehold.co as a reliable remote fallback if local assets are missing
  e.target.src = "https://placehold.co/800x450/f8fafc/475569?text=Image+Unavailable"; 
};

// ==========================================
// 7. IMAGE SKELETON COMPONENT (NEW ADD-ON)
// ==========================================
const ImageSkeleton = () => (
  <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg absolute inset-0" />
);

// ==========================================
// 2. LIGHTBOX COMPONENT (NEW ADD-ON)
// ==========================================
const ImageLightbox = ({ images }) => {
  const [activeImg, setActiveImg] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-48 rounded-lg overflow-hidden border border-solid border-gray-200 bg-gray-50">
            {!loadedImages[i] && <ImageSkeleton />}
            <img
              src={img}
              alt="project visual"
              loading="lazy" // 5. IMAGE LAZY LOADING
              onLoad={() => handleLoad(i)}
              onError={handleImageError} // 1. IMAGE FALLBACK APPLIED
              onClick={() => setActiveImg(img)}
              className={`cursor-pointer w-full h-full object-cover hover:scale-105 transition-all duration-500 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] cursor-zoom-out p-4 md:p-12"
            onClick={() => setActiveImg(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================
// ANALYTICS & PERFORMANCE SYSTEM
// ==========================================
const useAnalytics = () => {
  const trackEvent = useCallback((eventName, eventData = {}) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    } else {
      console.info(`[Analytics] ${eventName}`, eventData);
    }
  }, []);
  return { trackEvent };
};

const LazySection = ({ children, className = "", id = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { rootMargin: '200px' }); 
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={domRef} className={className} id={id}>
      {isVisible ? children : <div className="h-40 flex items-center justify-center text-gray-200">Loading section...</div>}
    </section>
  );
};

// ==========================================
// DATA SYSTEM
// ==========================================

const ACHIEVEMENTS = [
  { metric: "300K+", label: "Records Processed", desc: "Engineered complex features and handled 40%+ missing data robustly.", icon: <Database className="w-8 h-8 text-[#06B6D4]" /> },
  { metric: "R² ≈ 0.88", label: "Model Accuracy", desc: "Optimized Random Forest ensembles to outperform linear baselines by 22%.", icon: <Activity className="w-8 h-8 text-[#4F46E5]" /> },
  { metric: "100%", label: "Leakage Mitigated", desc: "Detected and resolved critical cross-validation flaws in geospatial models.", icon: <ShieldCheck className="w-8 h-8 text-[#A78BFA]" /> },
];

const PROJECTS = [
  {
    id: 'aqi',
    featured: true,
    title: "AQI Prediction Pipeline",
    shortDesc: "End-to-End machine learning pipeline predicting Air Quality Index, validated using R² and RMSE metrics.",
    primaryMetric: "R² 0.882 | -22% RMSE", // 4. QUICK METRICS ADDED
    problem: "Air Quality Index (AQI) prediction is critical for public health, but environmental data is highly non-linear, seasonal, and prone to sensor noise.",
    approach: "Cleaned sensor data, handled outliers using IQR, applied MinMax scaling. Evaluated Linear Regression as a baseline against Random Forest and Neural Networks.",
    whyApproach: "Random Forest was selected as the champion model for its ability to capture non-linear pollutant interactions without extensive deep learning tuning.",
    models: "Random Forest (Primary), Linear Regression (Baseline), Neural Network (Exploratory)",
    results: "Random Forest achieved an R² of 0.882 and an RMSE of 12.4, demonstrating a ~22% reduction in error compared to the baseline RMSE of 15.9.",
    insight: "Tree-based ensembles significantly outperform simple linear models in environmental datasets by mapping complex feature thresholds.",
    tradeoffs: "Random Forest provides high accuracy but struggles to extrapolate beyond historical AQI extremes compared to generalized linear models.",
    keyFiles: ["model_training.ipynb", "preprocessing_pipeline.py"],
    tools: ["Python", "Scikit-Learn", "Matplotlib", "Seaborn"],
    links: { github: "https://github.com/snesa2567-arch/End-to-End-AQI-Prediction-Pipeline.git", demo: null },
    icon: <Brain className="w-7 h-7 text-[#4F46E5]" />,
    images: ["/aqi1.jpg", "/aqi2.jpg"] // Arrays for Lightbox
  },
  {
    id: 'outfit-rec',
    featured: false,
    title: "Outfit Recommendation System",
    shortDesc: "Interactive content-based recommendation engine for fashion and accessory matching.",
    primaryMetric: "Cosine Similarity | Streamlit",
    problem: "Users struggle to pair clothing items efficiently based on color theory. A systematic engine is needed to recommend matching wear based on inputs.",
    approach: "Developed a content-based recommendation engine utilizing predefined color palettes. Built an interactive Streamlit UI for user input returning sorted similarity scores.",
    whyApproach: "Content-based filtering maps stylistic constraints explicitly without suffering from the cold-start problem typical of collaborative algorithms.",
    models: "Content-Based Filtering, Cosine Similarity",
    results: "Successfully computes real-time similarity vectors (returning 1.00 for direct matches) alongside logic-based accessory pairings.",
    insight: "Deterministic heuristics combined with vector similarity metrics create highly reliable, explainable recommendations.",
    tradeoffs: "Relies on predefined metadata tags rather than deep learning on actual wardrobe images, prioritizing speed over raw personalization.",
    keyFiles: ["app.py", "recommendation_engine.py"],
    tools: ["Python", "Streamlit", "Pandas", "Similarity Matrix"],
    links: { github: "https://github.com/snesa2567-arch/recommendation-system.git", demo: null },
    icon: <Sparkles className="w-7 h-7 text-pink-500" />,
    images: ["/des2.jpg", "/drs1.jpg"]
  },
  {
    id: 'geocaverns',
    featured: false,
    title: "GeoCaverns ML Dashboard",
    shortDesc: "Geospatial ML application predicting cave biodiversity and tourism patterns.",
    primaryMetric: "Spatial CV | KMeans (k=4)",
    problem: "Analyzing geospatial relationships to predict tourism viability requires integrating topological data with environmental indicators.",
    approach: "Engineered geospatial features. Implemented an ensemble pipeline. Developed a Streamlit dashboard featuring KMeans clustering.",
    whyApproach: "Ensembles provided precision for tabular geographical data, while Streamlit enabled rapid interactive visualization.",
    leakageDetail: "CRITICAL FIX: Initial validation yielded a suspicious R² ≈ 1.00. Deep inspection revealed spatial data leakage. Rebuilt the train-test split using spatial blocks.",
    models: "Random Forest, KMeans Clustering, Spatial CV",
    results: "Corrected data leakage, resulting in realistic model performance (R² 0.76) and improved spatial generalization.",
    insight: "Perfect accuracy in ML is almost always a red flag. Rigorous, domain-aware cross-validation is mandatory.",
    tradeoffs: "Spatial block cross-validation drastically reduced apparent performance but ensured true production viability.",
    keyFiles: ["spatial_cv_pipeline.py", "app.py"],
    tools: ["Python", "Streamlit", "Folium", "Scikit-Learn"],
    links: { github: "https://github.com/snesa2567-arch/geocaverns", demo: null },
    icon: <Map className="w-7 h-7 text-[#A78BFA]" />,
    images: ["/geo_cluster.png", "/geocavern.png"]
  },
  {
    id: 'customer',
    featured: false,
    title: "Customer Behavior Analysis",
    shortDesc: "SQL & Power BI analytics identifying high-value segments and revenue drivers.",
    primaryMetric: "$60.41 Avg Purchase | SQL CTEs",
    problem: "Stakeholders lacked visibility into how discounts and subscription tiers directly influenced long-term revenue and customer retention.",
    approach: "Authored complex SQL queries to extract cohort data. Built an interactive Power BI dashboard featuring drill-downs by product category and subscription type.",
    whyApproach: "SQL ensured maximum query performance directly at the database level, preventing the BI tool from choking on raw transactional data.",
    models: "SQL Analytics, Data Modeling, BI Dashboards",
    results: "Identified high-value customer segments, tracking a $60.41 Average Purchase Amount and isolating revenue dominance in adult cohorts.",
    insight: "Strategic discounts and subscription statuses structurally alter long-term purchasing cadences.",
    tradeoffs: "The dashboard relies on batched SQL views rather than real-time querying to optimize database load.",
    keyFiles: ["revenue_cohorts.sql", "Customer_Dashboard.pbix"],
    tools: ["SQL", "Power BI", "DAX", "Data Modeling"],
    links: { github: "https://github.com/snesa2567-arch/-Customer-Behavior-Analysis-SQL-Power-BI-.git", demo: null },
    icon: <BarChart3 className="w-7 h-7 text-[#06B6D4]" />,
    images: ["/sqldashboard.jpg"]
  },
  {
    id: 'credit',
    featured: false,
    title: "Credit Risk Analysis",
    shortDesc: "Comprehensive analysis of 300K+ loan records to uncover drivers of default risk.",
    primaryMetric: "300K+ Rows | 40% Imputed",
    problem: "Financial institutions require precise methods to identify default risks, but real-world datasets often suffer from severe sparsity and class imbalance.",
    approach: "Handled >40% missing data using structured imputation strategies. Engineered new behavioral variables and segmented risk profiles.",
    whyApproach: "Advanced imputation prevents the destruction of variance that occurs with simple mean-filling.",
    models: "Statistical Imputation, EDA, Feature Engineering",
    results: "Handled 40% missing data and identified the top 3 key behavioral drivers of loan default across 300K+ records.",
    insight: "Data quality and imputation methodology impact reliability far more than classification algorithms.",
    tradeoffs: "Iterative imputation was computationally expensive; a trade-off was made to sample data during initial tuning.",
    keyFiles: ["risk_eda.ipynb", "imputation_strategy.py"],
    tools: ["Python", "Pandas", "Statsmodels", "EDA"],
    links: { github: "https://github.com/snesa2567-arch/Credit-Risk-Analysis-EDA.git", demo: null },
    icon: <Database className="w-7 h-7 text-[#F59E0B]" />,
    images: ["/credit-risk-eda.png"]
  }
];

const SKILL_DETAILS = [
  { name: "Python (ML & EDA)", usage: "Engineered features and handled 40%+ missing data robustly.", project: "Credit Risk Analysis", metric: "300K+ Records", icon: <Code className="w-6 h-6 text-[#4F46E5]"/> },
  { name: "SQL & Databases", usage: "Authored complex queries and extractions for cohort LTV.", project: "Customer Behavior", metric: "SQL Server", icon: <ServerCog className="w-6 h-6 text-[#06B6D4]"/> },
  { name: "Ensemble Modeling", usage: "Tuned Random Forests to map complex feature thresholds.", project: "AQI Prediction", metric: "R² 0.882", icon: <Network className="w-6 h-6 text-[#A78BFA]"/> },
  { name: "BI & Visualization", usage: "Built interactive dashboards for stakeholder decision-making.", project: "Multiple Projects", metric: "Power BI & Tableau", icon: <LayoutDashboard className="w-6 h-6 text-pink-500"/> },
  { name: "Validation & Testing", usage: "Implemented Spatial CV to resolve critical R² 1.00 data leakage.", project: "GeoCaverns", metric: "100% Leakage Fixed", icon: <ShieldCheck className="w-6 h-6 text-emerald-500"/> },
  { name: "Statistics", usage: "Iterative imputation strategies preserving dataset variance.", project: "Credit Risk Analysis", metric: "Statistical Rigor", icon: <LineChart className="w-6 h-6 text-orange-500"/> }
];

const WORKFLOW = [
  { 
    step: "01", title: "Data Integrity & EDA", focus: "Never build models on garbage data.", 
    example: "In my Credit Risk analysis, I encountered 40% missing data. Instead of defaulting to mean-fill, I mapped distributions and used iterative imputation to preserve variance.", 
    icon: <Search className="w-7 h-7 text-white" /> 
  },
  { 
    step: "02", title: "Architectural Decisions", focus: "Choose the right tool, not the most complex.", 
    example: "For AQI forecasting, I tested Deep Learning networks but deployed a Random Forest ensemble, capturing necessary non-linear feature interactions with less overhead.", 
    icon: <Cpu className="w-7 h-7 text-white" /> 
  },
  { 
    step: "03", title: "Rigorous Validation", focus: "Perfect scores are almost always red flags.", 
    example: "While building GeoCaverns, an initial R² of 1.00 indicated spatial data leakage. I manually rebuilt the train-test split using spatial blocking to ensure reliability.", 
    icon: <Workflow className="w-7 h-7 text-white" /> 
  },
  { 
    step: "04", title: "Business Translation", focus: "Models must drive organizational action.", 
    example: "Raw SQL outputs are hard to digest. I translated complex cohort extractions into an interactive Power BI dashboard, revealing demographic impacts on average purchase behaviors.", 
    icon: <TrendingUp className="w-7 h-7 text-white" /> 
  }
];

const EXPERIENCE = [
  { 
    role: "Artificial Intelligence Intern", company: "SPARKIIT", date: "Jul 2025 - Sep 2025", metric: "R² 0.88 AQI Model",
    points: [
      "Built ML models (Linear Regression, Random Forest, Neural Network) to predict AQI",
      "Performed data preprocessing, EDA, and feature scaling",
      "Evaluated models using MAE, RMSE, and R²",
      "Achieved best performance with Random Forest (R² ≈ 0.88, ~22% lower RMSE)"
    ]
  },
  { 
    role: "Data Science Intern", company: "1Stop.ai", date: "May 2025 - Jun 2025", metric: "300K+ Records",
    points: [
      "Analyzed 300K+ loan records to identify factors affecting approvals and defaults",
      "Performed data cleaning, feature engineering, and EDA",
      "Handled 40%+ missing data and analyzed customer patterns",
      "Identified key drivers of default risk"
    ]
  },
  { 
    role: "Cadet Under Officer", company: "NCC", date: "2024 - 2025", metric: "Camp Senior",
    points: [
      "Managed a scale of 100+ cadets with camp senior responsibilities",
      "Created impact across 26 institutions"
    ]
  }
];

const EDUCATION = [
  { degree: "M.Sc Data Science", institution: "Vellore Institute of Technology, Chennai", cgpa: "", date: "2025 - 2027 (Pursuing)" },
  { degree: "B.Sc Statistics", institution: "PSG College of Arts and Science, Coimbatore", cgpa: "8.3/10", date: "2022 - 2025" }
];

const CERTIFICATIONS = [
  { name: "Introduction to Probability and Statistics", issuer: "NPTEL (IIT Certified)", image: "/isi.jpg" },
  { name: "Introduction to MongoDB", issuer: "Simplilearn", image: "/mongodb.jpg" }
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const springUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const hover3D = {
  scale: 1.05,
  y: -10,
  rotateX: 5,
  rotateY: -5,
  z: 20,
  boxShadow: "20px 30px 60px -15px rgba(79, 70, 229, 0.3)",
  transition: { type: "spring", stiffness: 400, damping: 20 }
};

// ==========================================
// SHARED UI COMPONENTS
// ==========================================

const GradientText = ({ children }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">
    {children}
  </span>
);

const SectionHeading = ({ title, subtitle, icon }) => (
  // 10. SCROLL REVEAL WRAPPER
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10"
  >
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827] mb-3 flex items-center gap-3">
      {icon} {title}
    </h2>
    {subtitle && <p className="text-base md:text-lg text-gray-600 max-w-2xl font-medium">{subtitle}</p>}
    <div className="h-1.5 w-20 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] mt-4 rounded-full" />
  </motion.div>
);

// ==========================================
// MAIN SECTIONS
// ==========================================

const Navigation = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo }) => {
  const { trackEvent } = useAnalytics();
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-solid ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200 shadow-lg py-3' : 'bg-white/50 backdrop-blur-sm border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => scrollTo('home')} className="text-2xl font-extrabold tracking-tight focus:outline-none flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#4F46E5] fill-[#4F46E5]" />
          <span>Nesa<GradientText>Sankaran</GradientText></span>
        </button>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center" role="menubar">
          {['Home', 'Projects', 'Skills', 'Methodology', 'Profile', 'Resume', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => { trackEvent('nav_click', { section: item }); scrollTo(item.toLowerCase()); }}
              className="text-sm font-bold text-gray-700 hover:text-[#4F46E5] relative group transition-colors focus:outline-none flex items-center gap-1.5"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
          ))}
        </div>

        <button className="md:hidden p-2 text-gray-900 bg-gray-100 rounded-lg shadow-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-solid border-gray-200 overflow-hidden absolute w-full shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {['Home', 'Projects', 'Skills', 'Methodology', 'Profile', 'Resume', 'Contact'].map((item) => (
                <button 
                  key={item} onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-lg font-bold text-gray-800 hover:text-[#4F46E5] flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-solid border-gray-100"
                >
                  <ChevronRight className="w-5 h-5 text-[#06B6D4]" /> {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ scrollTo }) => {
  const { trackEvent } = useAnalytics();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="home" className="pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden relative min-h-[75vh] flex items-center perspective-1000">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4F46E5]/15 to-[#06B6D4]/15 blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#A78BFA]/15 to-[#4F46E5]/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid lg:grid-cols-2 gap-10 items-center">
          
          <div>
            <motion.div variants={springUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-solid border-emerald-200 text-xs font-bold text-emerald-700 mb-6 shadow-md hover:shadow-lg transition-shadow">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Prioritizing Validation & Reliability
            </motion.div>
            <motion.h1 variants={springUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-5">
              Nesa Sankaran<br />
              <span className="text-2xl md:text-3xl text-gray-600 font-bold mt-3 flex items-center gap-3">
                <Database className="w-8 h-8 text-[#4F46E5]" /> Data Analyst & <GradientText>ML Practitioner</GradientText>
              </span>
            </motion.h1>
            
            <motion.p variants={springUp} className="text-lg md:text-xl text-gray-700 max-w-lg mb-8 leading-relaxed font-medium">
              I build validated machine learning systems that convert raw data into reliable, decision-ready insights, ensuring robust architecture over blind model fitting.
            </motion.p>

            <motion.div variants={springUp} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { trackEvent('cta_click', { type: 'projects' }); scrollTo('projects'); }} className="px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#111827] to-gray-800 hover:shadow-2xl hover:shadow-[#4F46E5]/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                Examine Methodology <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => { trackEvent('cta_click', { type: 'resume' }); scrollTo('resume'); }} className="px-8 py-4 rounded-xl text-[#111827] font-bold bg-white border-2 border-solid border-gray-200 hover:border-[#4F46E5] hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                <FileText className="w-5 h-5 text-[#4F46E5]" /> View Resume 
              </button>
            </motion.div>
          </div>

          <motion.div variants={springUp} className="hidden lg:flex justify-center items-center">
            <motion.div 
              whileHover={{ rotateY: -15, rotateX: 10, scale: 1.05 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20 }} 
              className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] z-20 rounded-full overflow-hidden border-8 border-solid border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-gray-100"
            >
              {/* 7. IMAGE SKELETON CONDITIONAL */}
              {!imgLoaded && <ImageSkeleton />}
              <img 
                src="/profile.jpeg" 
                alt="Nesa Sankaran" 
                loading="lazy" // 5. LAZY LOADING
                onLoad={() => setImgLoaded(true)}
                onError={handleImageError} // 1. FALLBACK
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

const KeyAchievements = () => (
  <LazySection className="py-10 bg-white relative z-20 shadow-sm border-y border-solid border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      {/* 10. SCROLL REVEAL ENHANCEMENT */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div 
            key={idx} whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 bg-[#F8FAFC] rounded-3xl border border-solid border-gray-100 flex items-start gap-5 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-solid border-gray-100">
              {item.icon}
            </div>
            <div>
              <div className="text-3xl font-black text-[#111827] mb-1">{item.metric}</div>
              <div className="text-xs font-bold text-[#4F46E5] mb-2 uppercase tracking-wider flex items-center gap-1"><Check className="w-3 h-3"/> {item.label}</div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </LazySection>
);

const ProjectModal = ({ project, onClose }) => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    if (project) trackEvent('view_project_details', { project_id: project.id });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, trackEvent]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111827]/80 backdrop-blur-md perspective-1000" role="dialog" aria-modal="true">
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
        
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0, rotateX: 10 }} animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }} exit={{ scale: 0.9, y: 30, opacity: 0, rotateX: -10 }} transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-y-auto flex flex-col"
        >
          <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-solid border-gray-100 p-6 flex justify-between items-center z-20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl border border-solid ${project.featured ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'} shadow-sm`}>
                {project.icon}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827]">{project.title}</h2>
                  {/* 3. FEATURED PROJECT BADGE */}
                  {project.title === "AQI Prediction Pipeline" && (
                    <span className="hidden sm:inline-flex bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md items-center gap-1 tracking-wider uppercase"><Star className="w-3 h-3"/> Featured</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#4F46E5] transition-colors"><Github className="w-4 h-4"/> Repository</a>}
                  {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] hover:text-[#4F46E5] transition-colors"><ExternalLink className="w-4 h-4"/> Live Demo</a>}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-100 text-gray-500 hover:text-white hover:bg-red-500 rounded-full transition-all focus:outline-none shadow-sm hover:shadow-md hover:rotate-90 transform duration-300">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-10 flex-grow grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <section>
                <h4 className="text-sm font-black tracking-widest text-[#4F46E5] uppercase mb-3 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> The Problem Space</h4>
                <p className="text-gray-800 leading-relaxed bg-indigo-50/50 p-6 rounded-2xl border border-solid border-indigo-100 text-base font-medium shadow-inner">{project.problem}</p>
              </section>

              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><Layers className="w-5 h-5 text-gray-500" /> Methodology & Execution</h4>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">{project.approach}</div>
              </section>

              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><Scale className="w-5 h-5 text-gray-500" /> Trade-offs & Architecture</h4>
                <div className="bg-white border border-solid border-gray-200 rounded-2xl p-6 space-y-5 shadow-md">
                  <div>
                    <h5 className="text-xs font-bold text-[#06B6D4] uppercase mb-1 tracking-wider flex items-center gap-2"><Check className="w-4 h-4"/> Why this approach?</h5>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">{project.whyApproach}</p>
                  </div>
                  <div className="border-t border-solid border-gray-100 pt-4">
                    <h5 className="text-xs font-bold text-orange-500 uppercase mb-1 tracking-wider flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Acknowledged Limitations</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.tradeoffs}</p>
                  </div>
                </div>
              </section>

              {project.leakageDetail && (
                <section className="bg-red-50 border border-solid border-red-200 p-6 rounded-2xl shadow-sm">
                  <h4 className="text-sm font-black tracking-widest text-red-700 uppercase mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Validation Flaw Detection</h4>
                  <p className="text-red-900 text-sm leading-relaxed font-bold">{project.leakageDetail}</p>
                </section>
              )}
            </div>

            <div className="lg:col-span-2 space-y-8">
              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><MonitorPlay className="w-5 h-5 text-[#06B6D4]"/> Project Visuals</h4>
                {/* 2. LIGHTBOX USED IN MODAL (NEW ADD-ON) */}
                <ImageLightbox images={project.images} />
              </section>

              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-green-600" /> Exact Results</h4>
                <div className="bg-green-50 border border-solid border-green-200 p-5 rounded-2xl shadow-sm">
                  <p className="text-green-900 font-bold leading-relaxed text-sm">{project.results}</p>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><Activity className="w-5 h-5 text-purple-600" /> Key Insight Derived</h4>
                <div className="bg-purple-50 border border-solid border-purple-200 p-5 rounded-2xl shadow-sm">
                  <p className="text-purple-900 italic font-bold leading-relaxed text-sm">"{project.insight}"</p>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-black tracking-widest text-gray-900 uppercase mb-3 flex items-center gap-2"><FileJson className="w-5 h-5 text-gray-500" /> Key Repository Files</h4>
                <ul className="space-y-3">
                  {project.keyFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-solid border-gray-200 font-mono font-bold shadow-sm hover:border-[#4F46E5] transition-colors">
                      <Code className="w-4 h-4 text-[#4F46E5]" /> {file}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectsSection = ({ onSelectProject }) => (
  <LazySection className="py-12 md:py-16 bg-[#F8FAFC] perspective-1000" id="projects">
    <div className="max-w-7xl mx-auto px-6">
      {/* 10. SCROLL REVEAL ENHANCEMENT */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SectionHeading title="Production-Ready Projects" subtitle="Detailed methodologies, exact metrics, and architecture decisions." icon={<Database className="w-8 h-8 text-[#4F46E5]" />} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <motion.article 
              key={project.id} whileHover={hover3D}
              // 6. HOVER ANIMATION CLASSES APPLIED GLOBALLY
              className={`bg-white rounded-[2rem] p-8 border border-solid ${project.featured ? 'border-[#4F46E5]/50 shadow-lg ring-1 ring-[#4F46E5]/20 lg:col-span-2' : 'border-gray-200 shadow-md'} flex flex-col h-full relative cursor-pointer overflow-hidden group transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              onClick={() => onSelectProject(project)}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              {/* 3. FEATURED BADGE CONDITION */}
              {project.title === "AQI Prediction Pipeline" && (
                <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1 uppercase tracking-wider font-bold">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
              
              {project.id === 'geocaverns' && (
                <div className="absolute top-4 right-4 bg-red-50 text-red-700 border border-solid border-red-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 z-10">
                  <ShieldCheck className="w-3 h-3" /> Data Leakage Fixed
                </div>
              )}

              <div className="flex justify-between items-start mb-5 mt-2 relative z-10">
                <div className={`p-4 rounded-2xl border border-solid ${project.featured ? 'bg-indigo-50 border-indigo-100 text-[#4F46E5]' : 'bg-gray-50 border-gray-100 text-gray-600'} group-hover:scale-110 transition-transform shadow-sm`}>
                  {project.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-extrabold text-[#111827] mb-1 group-hover:text-[#4F46E5] transition-colors relative z-10">{project.title}</h3>
              
              {/* 4. QUICK METRICS ADDED DIRECTLY UNDER TITLE */}
              {project.primaryMetric && (
                <p className="text-xs text-indigo-600 font-semibold mt-1 mb-3 relative z-10">
                  {project.primaryMetric}
                </p>
              )}

              <p className="text-gray-600 mb-6 flex-grow leading-relaxed font-medium relative z-10">{project.shortDesc}</p>
              
              <div className="flex flex-col gap-5 mt-auto relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-solid border-gray-200 text-gray-700 text-xs font-bold rounded-lg shadow-sm">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && <span className="px-3 py-1.5 bg-gray-50 border border-solid border-gray-200 text-gray-500 text-xs font-bold rounded-lg">+{project.tools.length - 3}</span>}
                </div>
                
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#4F46E5] mt-2 group-hover:gap-4 transition-all">
                  Examine Case Study <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  </LazySection>
);

const SkillsSection = () => (
  <LazySection className="py-12 md:py-16 bg-white border-y border-solid border-gray-100 relative overflow-hidden perspective-1000" id="skills">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full border-[100px] border-solid border-gray-50/50 pointer-events-none z-0" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SectionHeading title="Applied Technologies" subtitle="Tools are just means to an end. Here is how I apply them to achieve real-world metrics." icon={<Cpu className="w-8 h-8 text-[#06B6D4]" />} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_DETAILS.map((skill, idx) => (
            <motion.div 
              key={idx} whileHover={hover3D}
              className="bg-white rounded-[2rem] p-8 border border-solid border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#06B6D4]/0 group-hover:from-[#4F46E5]/5 group-hover:to-[#06B6D4]/5 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-solid border-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1.5 rounded-full border border-solid border-[#06B6D4]/20 shadow-sm flex items-center gap-1">
                    <Award className="w-3 h-3" /> {skill.metric}
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-[#111827] mb-3">{skill.name}</h3>
                <p className="text-sm text-gray-600 mb-8 flex-grow leading-relaxed font-medium">
                  {skill.usage}
                </p>
                
                <div className="pt-4 border-t border-solid border-gray-100 mt-auto flex items-center justify-between text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-2 uppercase tracking-wider"><Layers className="w-4 h-4 text-[#4F46E5]"/> Applied in:</span>
                  <span className="text-[#111827] bg-gray-50 border border-solid border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">{skill.project}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </LazySection>
);

const WorkflowSection = () => (
  <LazySection className="py-12 md:py-16 bg-[#111827] text-white overflow-hidden relative perspective-1000" id="methodology">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F46E5]/20 via-[#111827] to-[#111827] pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SectionHeading title="How I Work" subtitle="My focus isn't on deploying the fanciest algorithm, but on ensuring data integrity, rigorous validation, and business translation." icon={<Workflow className="w-10 h-10 text-[#06B6D4]" />} />

        <div className="relative mt-12">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4F46E5] via-[#06B6D4] to-transparent -translate-x-1/2 rounded-full opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.8)]" />

          <div className="space-y-12 lg:space-y-20">
            {WORKFLOW.map((flow, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                <motion.div 
                  whileHover={{ scale: 1.2, rotateY: 15, rotateX: 10 }}
                  className="hidden lg:flex w-20 h-20 absolute left-1/2 -translate-x-1/2 bg-[#111827] border-[6px] border-solid border-[#4F46E5] rounded-full items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.8)] z-10 transform-gpu cursor-default"
                >
                  <span className="font-black text-xl text-[#06B6D4]">{flow.step}</span>
                </motion.div>

                <div className={`w-full lg:w-1/2 ${idx % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <motion.div 
                    whileHover={hover3D}
                    className="bg-white/5 border border-solid border-white/10 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl relative overflow-hidden group transform-gpu"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-center gap-5 mb-6 relative z-10">
                      <div className="p-4 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-2xl text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                        {flow.icon}
                      </div>
                      <div>
                        <span className="text-[#06B6D4] font-black text-xs tracking-widest uppercase block lg:hidden mb-1 flex items-center gap-1"><GitBranch className="w-3 h-3"/> Step {flow.step}</span>
                        <h3 className="text-2xl font-extrabold text-white">{flow.title}</h3>
                      </div>
                    </div>
                    
                    <div className="bg-[#4F46E5]/20 border border-solid border-[#4F46E5]/30 p-5 rounded-2xl mb-6 relative z-10 shadow-inner">
                      <p className="text-sm font-bold text-[#A78BFA] flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5"/> Core Principle: {flow.focus}
                      </p>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-sm font-medium relative z-10 bg-black/20 p-4 rounded-xl border border-solid border-white/5">
                      <strong className="text-white flex items-center gap-2 mb-2 text-xs uppercase tracking-widest"><Search className="w-3 h-3 text-[#06B6D4]"/> Real Example</strong> {flow.example}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </LazySection>
);

const ProfileSection = () => (
  <LazySection className="py-12 md:py-16 bg-[#F8FAFC] border-y border-solid border-gray-100 perspective-1000" id="profile">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SectionHeading title="Executive Profile" subtitle="A structured overview of my academic background, experience, and leadership." icon={<Briefcase className="w-8 h-8 text-[#4F46E5]" />} />
       
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-8 flex flex-col h-full">
            <motion.div whileHover={hover3D} className="bg-white rounded-[2rem] p-8 md:p-10 border border-solid border-gray-200 shadow-md h-full transition-shadow transform-gpu">
              <h3 className="text-2xl font-extrabold text-[#111827] mb-10 flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="p-3 bg-indigo-50 rounded-xl"><Briefcase className="w-6 h-6 text-[#4F46E5]" /></div> Experience
              </h3>
              
              <div className="relative border-l-4 border-solid border-gray-100 ml-4 space-y-10 pb-4">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-[6px] border-solid border-[#06B6D4] shadow-md group-hover:scale-125 group-hover:border-[#4F46E5] transition-all" />
                    <span className="text-xs font-black tracking-widest text-[#4F46E5] uppercase mb-2 flex items-center gap-2"><Calendar className="w-3 h-3"/> {exp.date}</span>
                    <h4 className="text-xl font-bold text-[#111827]">{exp.role}</h4>
                    <div className="flex items-center justify-between mt-2 mb-4">
                      <span className="text-base font-bold text-gray-500 flex items-center gap-1.5"><Layers className="w-4 h-4"/> {exp.company}</span>
                      <span className="text-[10px] font-black text-[#06B6D4] bg-[#06B6D4]/10 border border-solid border-[#06B6D4]/20 px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1"><Award className="w-3 h-3"/> {exp.metric}</span>
                    </div>
                    {exp.points && (
                      <ul className="space-y-3 mt-4 bg-gray-50 p-4 rounded-xl border border-solid border-gray-100 shadow-inner">
                        {exp.points.map((pt, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-3 leading-relaxed font-medium">
                            <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8 flex flex-col h-full">
            <motion.div whileHover={hover3D} className="bg-white rounded-[2rem] p-8 md:p-10 border border-solid border-gray-200 shadow-md flex-grow transition-shadow transform-gpu">
              <h3 className="text-2xl font-extrabold text-[#111827] mb-8 flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="p-3 bg-purple-50 rounded-xl"><GraduationCap className="w-6 h-6 text-[#A78BFA]" /></div> Academic History
              </h3>
              
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-6 rounded-2xl border border-solid border-gray-200 gap-4 group hover:border-[#4F46E5]/30 transition-colors shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm border border-solid border-gray-100 group-hover:scale-110 transition-transform shrink-0">
                        <GraduationCap className="w-6 h-6 text-[#A78BFA]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors">{edu.degree}</h4>
                        <p className="text-sm font-medium text-gray-600 mt-1 flex items-center gap-1.5"><Layers className="w-4 h-4 text-gray-400"/> {edu.institution}</p>
                        <span className="text-xs font-bold text-[#4F46E5] mt-2 tracking-wider uppercase bg-indigo-50 w-fit px-2 py-1 rounded flex items-center gap-1.5"><Calendar className="w-3 h-3"/> {edu.date}</span>
                      </div>
                    </div>
                    {edu.cgpa && (
                      <div className="text-left sm:text-right mt-2 sm:mt-0 shrink-0">
                        <span className="inline-flex items-center gap-1.5 bg-white text-[#111827] text-xs font-black px-4 py-2 rounded-xl border border-solid border-gray-200 uppercase tracking-widest shadow-sm">
                          <Activity className="w-3 h-3 text-[#06B6D4]"/> CGPA: {edu.cgpa}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div whileHover={hover3D} className="bg-white rounded-[2rem] p-8 md:p-10 border border-solid border-gray-200 shadow-md transition-shadow transform-gpu">
              <h3 className="text-2xl font-extrabold text-[#111827] mb-8 flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="p-3 bg-yellow-50 rounded-xl"><Award className="w-6 h-6 text-yellow-500" /></div> Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-solid border-gray-200 shadow-sm hover:border-yellow-400 transition-colors group">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-solid border-gray-100 group-hover:scale-110 transition-transform shrink-0">
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#111827] mb-2 leading-tight">{cert.name}</span>
                      <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest bg-indigo-50 w-fit px-2 py-1 rounded flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> {cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* 8. CERTIFICATE ZOOM LIGHTBOX (NEW ADD-ON) */}
              <ImageLightbox images={CERTIFICATIONS.map(c => c.image)} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </LazySection>
);

const ResumeSection = () => (
  <LazySection className="py-12 md:py-16 bg-white border-y border-solid border-gray-100 perspective-1000" id="resume">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SectionHeading title="Complete Resume" subtitle="Review or download my full curriculum vitae directly below." icon={<FileText className="w-8 h-8 text-[#06B6D4]" />} />
        
        <motion.div whileHover={hover3D} className="bg-gray-50 p-6 md:p-10 rounded-[2rem] border border-solid border-gray-200 shadow-xl flex flex-col items-center relative overflow-hidden transform-gpu transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="w-full bg-white rounded-2xl border border-solid border-gray-300 overflow-hidden mb-8 shadow-inner relative z-10 flex justify-center items-center group">
            <iframe 
              src="/resume.pdf" 
              title="Nesa Sankaran Resume"
              className="w-full h-[60vh] min-h-[600px] md:min-h-[800px]"
              style={{ border: 'none' }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl relative z-10">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full py-4 text-center text-[#111827] font-bold bg-white border-2 border-solid border-gray-200 hover:border-[#4F46E5] hover:shadow-lg rounded-xl transition-all flex items-center justify-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#4F46E5]" /> Open in New Tab
            </a>
            <a href="/resume.pdf" download="Nesa_Sankaran_Resume.pdf" className="w-full py-4 text-center text-white font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] hover:shadow-[0_10px_25px_rgba(79,70,229,0.4)] transform hover:-translate-y-1 rounded-xl transition-all flex items-center justify-center gap-3">
              <Download className="w-5 h-5 text-white" /> Download PDF
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </LazySection>
);

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState('idle'); 
  const { trackEvent } = useAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    trackEvent('form_submission_started');
    
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/placeholder_form_id", {
        method: "POST", body: data, headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setFormStatus('success');
        trackEvent('form_submission_success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 6000);
      } else {
        throw new Error('Formspree returned an error status');
      }
    } catch (error) {
      console.error("Form error:", error);
      setFormStatus('error');
      trackEvent('form_submission_failed');
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <LazySection id="contact" className="py-12 md:py-20 bg-[#111827] text-white relative overflow-hidden perspective-1000">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-bl from-[#4F46E5]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid lg:grid-cols-2 gap-16">
          
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight flex items-center gap-4"><Mail className="w-12 h-12 text-[#06B6D4]"/> Connect</h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed font-medium">
              I am actively seeking opportunities to apply my analytical skills and rigorous modeling approach to complex data problems. Let's build something impactful.
            </p>
            
            <div className="pt-8 space-y-6 border-t border-solid border-gray-800">
              <motion.a whileHover={{ x: 10 }} href="mailto:S.nesa2567@gmail.com" className="flex items-center gap-5 text-gray-300 hover:text-white transition-all group focus:outline-none focus:ring-2 focus:ring-white rounded-xl w-fit p-1">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-solid border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#4F46E5] group-hover:to-[#06B6D4] transition-all shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-wide flex items-center gap-2">S.nesa2567@gmail.com <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
              </motion.a>
              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 text-gray-300 transition-all w-fit p-1">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-solid border-white/10 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-wide">+91 63826 30460</span>
              </motion.div>
              
              <div className="flex gap-4 pt-6">
                <motion.a whileHover={{ y: -5 }} href="https://github.com/snesa2567-arch" aria-label="GitHub Profile" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white/5 hover:bg-white text-gray-400 hover:text-[#111827] flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white">
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/s-nesa-sankaran-5563b1259" aria-label="LinkedIn Profile" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white/5 hover:bg-[#0A66C2] text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white">
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div whileHover={hover3D} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden text-[#111827] transform-gpu transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <h3 className="text-3xl font-extrabold mb-8 flex items-center gap-3"><Zap className="w-8 h-8 text-[#4F46E5]"/> Send a Message</h3>
              <div>
                <label htmlFor="name" className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">Name</label>
                <input type="text" id="name" name="name" required disabled={formStatus === 'loading'} className="w-full px-5 py-4 bg-gray-50 border border-solid border-gray-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all disabled:opacity-50" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">Email</label>
                <input type="email" id="email" name="email" required disabled={formStatus === 'loading'} className="w-full px-5 py-4 bg-gray-50 border border-solid border-gray-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all disabled:opacity-50" placeholder="jane@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">Message</label>
                <textarea id="message" name="message" rows={4} required disabled={formStatus === 'loading'} className="w-full px-5 py-4 bg-gray-50 border border-solid border-gray-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all resize-none disabled:opacity-50" placeholder="I'm reaching out about a Data Analyst role..." />
              </div>
              <input type="text" name="_gotcha" className="hidden" />

              <button 
                type="submit" 
                disabled={formStatus === 'loading' || formStatus === 'success'}
                className="w-full py-5 rounded-xl text-white font-extrabold tracking-wide bg-gradient-to-r from-[#111827] to-gray-800 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all mt-4 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed"
              >
                {formStatus === 'idle' && <>Send Message <ArrowRight className="w-5 h-5"/></>}
                {formStatus === 'loading' && <><div className="w-5 h-5 border-2 border-solid border-white border-t-transparent rounded-full animate-spin" /> Sending securely...</>}
                {formStatus === 'success' && <>Message Sent Successfully!</>}
                {formStatus === 'error' && "Error. Try Again."}
              </button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-5 bg-green-50 text-green-800 text-sm font-bold rounded-xl text-center border border-solid border-green-200 shadow-sm flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    Thank you! I will review your message and respond shortly.
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-5 bg-red-50 text-red-800 text-sm font-bold rounded-xl text-center border border-solid border-red-200 shadow-sm flex flex-col items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    Submission failed. Please verify your connection or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </LazySection>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view', { path: '/' });
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  const scrollTo = useCallback((id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#4F46E5]/20 selection:text-[#4F46E5]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[#4F46E5] focus:font-bold border border-solid border-gray-200">
        Skip to main content
      </a>

      <Navigation isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} scrollTo={scrollTo} />

      <main id="main-content">
        <Hero scrollTo={scrollTo} />
        <KeyAchievements />
        
        <LazySection className="py-12 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 flex items-center justify-center gap-3"><Activity className="w-8 h-8 text-[#06B6D4]" /> Analytic Objective</h2>
             <p className="text-lg md:text-xl text-gray-700 leading-relaxed border-l-4 border-solid border-[#4F46E5] pl-8 text-left bg-gray-50 p-8 rounded-r-2xl shadow-inner font-medium">
               I focus on building reliable data systems and machine learning models that prioritize statistical validation over inflated performance metrics. My goal is to translate raw data into actionable, business-ready decisions.
             </p>
          </div>
        </LazySection>

        <ProjectsSection onSelectProject={setSelectedProject} />
        <SkillsSection />
        <WorkflowSection />
        <ProfileSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <footer className="bg-black py-10 border-t border-solid border-gray-800 text-center flex flex-col items-center justify-center">
        <p className="text-gray-500 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2">
          © {new Date().getFullYear()} Nesa Sankaran. <ShieldCheck className="w-3 h-3 text-[#4F46E5]"/> Engineered for clarity & scale.
        </p>
        {/* 9. PERFORMANCE FOOTER LINE (NEW ADD-ON) */}
        <p className="text-xs text-gray-600 mt-3 font-medium max-w-md px-4">
          Optimized for performance, accessibility, and real-world data workflows.
        </p>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}