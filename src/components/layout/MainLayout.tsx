
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Camera, 
  FileOutput, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/project-details', label: 'Project Details', icon: <FileText className="w-5 h-5" /> },
    { path: '/photos', label: 'Photo Documentation', icon: <Camera className="w-5 h-5" /> },
    { path: '/reports', label: 'Reports', icon: <FileOutput className="w-5 h-5" /> },
    { path: '/settings', label: 'Company Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b h-16 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl font-medium">PhotoTrak</span>
          </Link>
          
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-secondary transition-all duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </header>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "z-40 bg-background/95 backdrop-blur-md border-r border-border/50 transition-all duration-300 ease-in-out",
          isMobile ? 
            isMenuOpen ? "fixed inset-0 w-full h-full mt-16" : "fixed -left-full w-full h-full mt-16" : 
            "sticky top-0 h-screen w-64 shrink-0"
        )}
      >
        {!isMobile && (
          <div className="p-6">
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl font-medium">PhotoTrak</span>
            </Link>
          </div>
        )}
        
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                    location.pathname === item.path ? 
                      "bg-primary text-primary-foreground" : 
                      "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 overflow-x-hidden",
        isMobile ? "pt-16" : ""
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full p-6 md:p-8 max-w-[1400px] mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
