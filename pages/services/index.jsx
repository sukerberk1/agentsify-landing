import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Nav';
import ServiceStatsSection from './ServiceStatsSection';
import Footer from '../../components/Footer';

const StrategyFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const steps = ['Analyze', 'Plan', 'Execute', 'Optimize'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-violet-900/20 rounded-lg p-3 sm:p-4 border border-violet-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >

      <div className="grid grid-cols-2 sm:flex sm:justify-between items-center gap-2 sm:gap-0 mb-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 text-center ${index === activeStep
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
              : 'bg-violet-900/30 text-violet-300'
              }`}
            animate={{
              scale: index === activeStep ? 1.05 : 1,
              y: index === activeStep ? -1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="block truncate">{step}</span>
          </motion.div>
        ))}
      </div>


      <div className="w-full bg-violet-900/30 rounded-full h-2 overflow-hidden mb-2">
        <motion.div
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full relative"
          animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          />
        </motion.div>
      </div>


      <motion.div
        className="text-xs text-violet-300 text-center"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        Step {activeStep + 1} of {steps.length}
      </motion.div>
    </motion.div>
  );
};

const ModelChart = () => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const accuracyData = [65, 78, 85, 92, 95];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(95), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="bg-gray-900/40 rounded-lg p-4 border border-violet-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="text-violet-300 text-xs font-mono mb-2 flex items-center justify-between"
        animate={{ color: isHovered ? '#c084fc' : '#a78bfa' }}
      >
        Model Accuracy
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [1, 0.5, 1] : 1
          }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.div>
      <div className="flex items-end space-x-1 h-12">
        {accuracyData.map((height, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t flex-1 relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: `${(height / 100) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{
              background: 'linear-gradient(to top, #8b5cf6, #f0abfc)',
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                y: isHovered ? ['100%', '-100%'] : '100%'
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="text-fuchsia-400 text-xs mt-2 font-mono"
        animate={{
          scale: isHovered ? 1.05 : 1,
          color: isHovered ? '#f0abfc' : '#e879f9'
        }}
      >
        Performance: <motion.span
          key={progress}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {progress}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const DataPipeline = () => {
  const [flowActive, setFlowActive] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const stages = ['Raw Data', 'Processing', 'ML Model Determining', 'Training', 'Evaluation', 'Analysis', 'Insights'];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowActive(true);
      setActiveStage((prev) => (prev + 1) % stages.length);
      setTimeout(() => setFlowActive(false), 800);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-fuchsia-900/20 rounded-lg p-4 border border-fuchsia-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="text-fuchsia-300 text-xs font-mono"
          animate={{ color: isHovered ? '#f0abfc' : '#f9a8d4' }}
        >
          Data Pipeline Flow
        </motion.div>
        <motion.div
          className={`w-2 h-2 rounded-full ${flowActive ? 'bg-green-400' : 'bg-gray-500'}`}
          animate={{
            scale: flowActive ? [1, 1.5, 1] : 1,
            boxShadow: flowActive ? ['0 0 0 0 rgba(34, 197, 94, 0.7)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)'] : 'none'
          }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            className="flex items-center"
            animate={{
              x: activeStage === index ? 4 : 0,
              opacity: activeStage === index ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 bg-fuchsia-500 rounded-full mr-2"
              animate={{
                scale: activeStage === index ? 1.3 : 1,
                backgroundColor: activeStage === index ? '#f0abfc' : '#d946ef',
                boxShadow: activeStage === index ? '0 0 8px #f0abfc' : 'none'
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="text-fuchsia-200 text-xs"
              animate={{
                color: activeStage === index ? '#fdf4ff' : '#fce7f3',
                fontWeight: activeStage === index ? 600 : 400
              }}
            >
              {stage}
            </motion.span>
            {activeStage === index && (
              <motion.div
                className="ml-2 text-xs text-green-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-3 h-1 bg-fuchsia-900/30 rounded-full overflow-hidden"
        style={{ display: isHovered ? 'block' : 'none' }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"
          animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState({ cpu: 45, memory: 67, response: 12 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 60,
        response: Math.floor(Math.random() * 10) + 8
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="text-blue-300 text-xs font-mono"
          animate={{ color: isHovered ? '#60a5fa' : '#93c5fd' }}
        >
          System Health Monitor
        </motion.div>
        <motion.div
          className="flex space-x-1"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-3 bg-green-400 rounded-full"
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
      <div className="space-y-2">
        {Object.entries(metrics).map(([key, value], index) => (
          <motion.div
            key={key}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-blue-200 text-xs capitalize">{key}</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 bg-blue-900/30 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1 rounded-full relative"
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      x: isHovered ? ['0%', '100%'] : '0%'
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              <motion.span
                className="text-cyan-400 text-xs font-mono w-8"
                key={value}
                initial={{ scale: 1.2, color: '#67e8f9' }}
                animate={{ scale: 1, color: '#22d3ee' }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(value)}%
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-3 text-xs text-center"
        animate={{
          color: metrics.cpu > 70 || metrics.memory > 80 ? '#f87171' : '#10b981',
          opacity: isHovered ? 1 : 0.7
        }}
      >
        Status: {metrics.cpu > 70 || metrics.memory > 80 ? 'High Load' : 'Optimal'}
      </motion.div>
    </motion.div>
  );
};

const ChatMockup = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "AI System: What's your request...", sender: 'ai', visible: false },
    { id: 2, text: "My Request is to analyze our current AI systems and suggest improvements.", sender: 'user', visible: false },
    { id: 3, text: "Analysis complete! Ready to optimize.", sender: 'ai', visible: false }
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => prev.map((msg, index) =>
        index === 0 ? { ...msg, visible: true } : msg
      ));
    }, 500);

    const timer2 = setTimeout(() => {
      setMessages(prev => prev.map((msg, index) =>
        index === 1 ? { ...msg, visible: true } : msg
      ));
    }, 1500);

    const timer3 = setTimeout(() => {
      setMessages(prev => prev.map((msg, index) =>
        index === 2 ? { ...msg, visible: true } : msg
      ));
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      className="bg-violet-900/20 rounded-lg p-4 border border-violet-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="space-y-3">
        <AnimatePresence>
          {messages.map((message, index) => (
            message.visible && (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`${message.sender === 'ai'
                  ? 'bg-violet-600 text-white'
                  : 'bg-fuchsia-600 text-white ml-6'
                  } px-3 py-2 rounded-lg text-sm relative overflow-hidden`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{
                    x: isHovered && message.sender === 'ai' ? ['0%', '100%'] : '0%'
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
                <span className="relative z-10">{message.text}</span>
                {message.sender === 'ai' && (
                  <motion.div
                    className="absolute bottom-1 right-2 w-1 h-1 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="flex items-center mt-3 text-xs text-violet-300"
        animate={{ opacity: isHovered ? 1 : 0.5 }}
      >
        <motion.div
          className="flex space-x-1 mr-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
          <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
          <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
        </motion.div>
        <span>AI is thinking...</span>
      </motion.div>
    </motion.div>
  );
};


const AITrainingMockup = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [skillLevels, setSkillLevels] = useState([45, 78, 62, 89]);

  const modules = [
    { name: 'AI Basics', completed: true, icon: '🧠' },
    { name: 'Data Science', completed: false, icon: '⚙️' },
  ];

  const skills = ['Problem Solving', 'Data Processing', 'Model Training', 'AI Strategy'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % modules.length);
      setProgress((prev) => (prev >= 100 ? 0 : prev + 25));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const skillInterval = setInterval(() => {
      setSkillLevels(prev => prev.map(skill =>
        Math.min(100, skill + Math.floor(Math.random() * 5))
      ));
    }, 3000);
    return () => clearInterval(skillInterval);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-lg p-3 sm:p-4 border border-orange-400/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="text-orange-300 text-xs font-mono flex items-center"
          animate={{ color: isHovered ? '#fb923c' : '#fdba74' }}
        >
          <span className="mr-2">📚</span>
          <span className="hidden sm:inline">Training Dashboard</span>
          <span className="sm:hidden">Training</span>
        </motion.div>
        <motion.div
          className="flex items-center space-x-1"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-green-400 hidden sm:inline">Live Session</span>
          <span className="text-xs text-green-400 sm:hidden">Live</span>
        </motion.div>
      </div>


      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
        {modules.map((module, index) => (
          <motion.div
            key={module.name}
            className={`p-1.5 sm:p-2 rounded text-xs transition-all duration-300 ${index === activeModule
              ? 'bg-orange-500/30 border border-orange-400/40'
              : module.completed
                ? 'bg-green-900/30 border border-green-400/20'
                : 'bg-orange-900/20 border border-orange-400/10'
              }`}
            animate={{
              scale: index === activeModule ? 1.05 : 1,
              y: index === activeModule ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-xs">{module.icon}</span>
                <span className="text-orange-200 text-xs truncate">
                  {module.name}
                </span>
              </div>
              {module.completed && (
                <motion.span
                  className="text-green-400 text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-orange-300 text-xs">Progress</span>
          <motion.span
            className="text-orange-400 text-xs font-mono"
            key={progress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {progress}%
          </motion.span>
        </div>
        <div className="w-full bg-orange-900/30 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full relative"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-orange-300 text-xs mb-2 flex items-center">
          <span className="mr-1">🎯</span>
          <span className="hidden sm:inline">Skill Assessment</span>
          <span className="sm:hidden">Skills</span>
        </div>
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-orange-200 text-xs flex-1 truncate">
              {skill}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-6 sm:w-8 bg-orange-900/30 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-1 rounded-full"
                  animate={{ width: `${skillLevels[index]}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <motion.span
                className="text-yellow-400 text-xs font-mono w-6 sm:w-8 text-right"
                key={skillLevels[index]}
                initial={{ scale: 1.2, color: '#fbbf24' }}
                animate={{ scale: 1, color: '#facc15' }}
                transition={{ duration: 0.3 }}
              >
                {skillLevels[index]}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-3 flex items-center justify-between text-xs"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <div className="flex items-center space-x-1 text-orange-300">
          <motion.div
            className="flex space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          </motion.div>
          <span className="hidden sm:inline">Learning in progress...</span>
          <span className="sm:hidden">Learning...</span>
        </div>
        <motion.div
          className="text-amber-400 flex items-center space-x-1"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Level Up!</span>
          <span className="sm:hidden">Up!</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ title, description, gradient, delay, mockup, size = 'normal' }) => {

  const cardSizes = {
    small: 'col-span-1 row-span-1 lg:col-span-1 lg:row-span-1',
    normal: 'col-span-1 row-span-1 lg:col-span-1 lg:row-span-2',
    wide: 'col-span-1 row-span-1 lg:col-span-2 lg:row-span-1',
    large: 'col-span-1 row-span-1 lg:col-span-2 lg:row-span-2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-violet-300/20 hover:border-violet-300/40 transition-all duration-300 ${cardSizes[size]} bg-gradient-to-br ${gradient}`}
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">
        {title}
      </h3>

      <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-sm opacity-90">
        {description}
      </p>

      {mockup && (
        <div className="mt-auto">
          {mockup}
        </div>
      )}
    </motion.div>
  );
};


const StatsSection = () => {
  const stats = [
    { value: "98%", label: "Client satisfaction rate" },
    { value: "100%", label: "Businesses enhanced through AI" },
    { value: "96%", label: "Processes improved dramatically" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
            {stat.value}
          </div>
          <p className="text-gray-300 text-sm">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "AI Solution Development: Tailored to Your Business",
      description: "Turn your vision into reality with custom-built AI solutions. At Agentsify, we specialize in developing AI-powered systems that address your unique business challenges. From machine learning models to predictive analytics and natural language processing tools, we deliver end-to-end solutions. Our seamless approach ensures that every AI application we build is aligned with your goals and optimized for success.",
      gradient: "from-violet-900/30 to-fuchsia-900/30",
      mockup: <ChatMockup />,
      delay: 0.1,
      size: 'large'
    },
    {
      title: "Comprehensive AI Strategy Consulting",
      description: "Harness the true potential of AI with a strategy designed for your business success. At Agentsify, we identify key opportunities for AI integration by understanding your unique goals and challenges. Our consulting services deliver actionable roadmaps to seamlessly implement AI solutions, driving efficiency, innovation, and ROI.",
      gradient: "from-purple-900/30 to-violet-900/30",
      mockup: <StrategyFlow />,
      delay: 0.2,
      size: 'normal'
    },
    {
      title: "Advanced AI Model Optimization & Maintenance",
      description: "Keep your AI models high-performing and future-ready with Agentsify's expert optimization and maintenance services. We specialize in algorithm fine-tuning, adapting to evolving data trends, and enhancing model efficiency. By aligning your AI systems with your business goals, we ensure they remain relevant, accurate, and impactful.",
      gradient: "from-violet-900/30 to-purple-900/30",
      mockup: <ModelChart />,
      delay: 0.3,
      size: 'small'
    },
    {
      title: "Comprehensive AI Data Management & Preparation",
      description: "Unlock the full potential of your data with Agentsify's AI Data Management services. Our experts clean, organize, and integrate raw datasets to ensure they meet the highest standards for AI model training. By focusing on data quality, compliance, and scalability, we lay the groundwork for smarter decision-making and faster AI deployments.",
      gradient: "from-fuchsia-900/30 to-pink-900/30",
      mockup: <DataPipeline />,
      delay: 0.4,
      size: 'wide'
    },

    {
      title: "Custom AI Training Programs",
      description: "Equip your team with the skills to harness AI's full potential. At Agentsify, we deliver personalized AI training programs tailored to your business needs. From mastering AI tools to implementing best practices, we ensure your workforce is prepared to integrate AI into everyday operations for maximum efficiency and innovation.",
      gradient: "from-fuchsia-900/30 to-pink-900/30",
      mockup: <AITrainingMockup />,
      delay: 0.5,
      size: 'wide'
    },

    {
      title: "AI Monitoring & Support",
      description: "Maximize your AI performance with Agentsify’s proactive monitoring and 24/7 support. Our team ensures your AI systems stay reliable, efficient, and ahead of the curve by identifying and resolving issues before they impact your operations. Enjoy peace of mind with real-time insights and expert support tailored to your business needs.",
      gradient: "from-blue-900/30 to-violet-900/30",
      mockup: <SystemMonitor />,
      delay: 0.6,
      size: 'small'
    }
  ];

  const StatCircle = ({ percentage, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-36 h-36 rounded-full bg-[#001a33] border-4 border-blue-500 text-blue-400 font-extrabold text-3xl flex items-center justify-center shadow-[0_0_30px_8px_rgba(59,130,246,0.5)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_12px_rgba(59,130,246,0.7)]">
        {percentage}
      </div>
      <p className="mt-4 text-white text-sm font-medium max-w-[12rem]">{description}</p>
    </motion.div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-fuchsia-950 relative">
      <Navbar />

      <div className="absolute inset-0 overflow-hidden">
        <div className="w-96 h-96 absolute -right-48 top-20 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="w-80 h-80 absolute -left-40 bottom-20 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-8 lg:px-16 xl:px-20 2xl:px-24">

          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Unlock the Power of {" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Agentsify
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with our comprehensive AI solutions designed for the future
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 px-4 sm:px-6 lg:px-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <ServiceStatsSection />

        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Services;
