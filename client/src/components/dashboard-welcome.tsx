/**
 * Dashboard-Welcome.tsx
 * Componente de bienvenida animado para el dashboard
 * 
 * Este componente muestra una animación de bienvenida personalizada para el usuario
 * cuando ingresa por primera vez al dashboard.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, PieChart, LineChart, BarChart3 } from "lucide-react";

// Propiedades que recibe el componente de bienvenida
interface DashboardWelcomeProps {
  userName?: string;
  onComplete: () => void;
}

export default function DashboardWelcome({ userName = "Empresa", onComplete }: DashboardWelcomeProps) {
  // Estado para controlar la animación por etapas
  const [animationStage, setAnimationStage] = useState(0);
  
  // Efecto para avanzar la animación automáticamente
  useEffect(() => {
    if (animationStage < 3) {
      const timer = setTimeout(() => {
        setAnimationStage(prev => prev + 1);
      }, animationStage === 0 ? 800 : 1200);
      
      return () => clearTimeout(timer);
    } else {
      // Cuando terminamos todas las etapas, notificamos que la animación ha finalizado
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [animationStage, onComplete]);

  // Variantes de animación para los diferentes elementos
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren", 
        staggerChildren: 0.1, 
        staggerDirection: -1 
      } 
    }
  };

  const welcomeTextVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const nameVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 } 
    }
  };

  const iconContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.1, 
        staggerDirection: -1 
      } 
    }
  };

  const iconVariants = {
    initial: { opacity: 0, y: 20, rotate: -10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 15 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.2 } 
    }
  };

  // Definición de cada etapa de la animación
  const renderAnimationStage = () => {
    switch (animationStage) {
      case 0:
        return (
          <motion.div
            className="flex flex-col items-center justify-center h-72 text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={welcomeTextVariants}>
              <h2 className="text-2xl font-bold text-gray-700">Bienvenido al</h2>
            </motion.div>
            <motion.div variants={nameVariants} className="mt-2">
              <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
            </motion.div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            className="flex flex-col items-center justify-center h-72 text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={welcomeTextVariants}>
              <p className="text-xl text-gray-600">Preparando tus datos</p>
            </motion.div>
            <motion.div
              className="flex items-center justify-center mt-8 gap-6"
              variants={iconContainerVariants}
            >
              <motion.div variants={iconVariants}>
                <BarChart3 size={32} className="text-primary" />
              </motion.div>
              <motion.div variants={iconVariants}>
                <LineChart size={32} className="text-primary" />
              </motion.div>
              <motion.div variants={iconVariants}>
                <PieChart size={32} className="text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            className="flex flex-col items-center justify-center h-72"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={welcomeTextVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-primary/10">
                <User size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userName}
              </h2>
              <p className="mt-2 text-gray-600">Todo está listo para ti</p>
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            className="flex items-center justify-center h-72"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={welcomeTextVariants} className="text-lg text-gray-600 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20 
                }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100"
              >
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p>Cargando dashboard...</p>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative bg-white rounded-lg flex-1 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={animationStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderAnimationStage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}