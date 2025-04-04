
import { useEffect, useState } from 'react';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const itemFade = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

export function useDelayedAppearance(delay = 100) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isVisible;
}

export function useSmoothLoading(loadingState: boolean, delay = 400) {
  const [isDisplayed, setIsDisplayed] = useState(loadingState);
  
  useEffect(() => {
    let timer: any;
    
    if (loadingState) {
      setIsDisplayed(true);
    } else {
      timer = setTimeout(() => {
        setIsDisplayed(false);
      }, delay);
    }
    
    return () => clearTimeout(timer);
  }, [loadingState, delay]);
  
  return isDisplayed;
}
