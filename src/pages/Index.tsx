
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';
import { FileText, Camera, FileOutput, Settings, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { fadeIn, itemFade, staggerChildren } from '@/utils/animations';

const Index = () => {
  const features = [
    {
      title: "Project Management",
      description: "Document comprehensive project details from client information to damage assessment.",
      icon: <FileText className="h-6 w-6" />,
      path: "/project-details"
    },
    {
      title: "Photo Documentation",
      description: "Upload, organize, and annotate up to 100 photos per storm damage project.",
      icon: <Camera className="h-6 w-6" />,
      path: "/photos"
    },
    {
      title: "Report Generation",
      description: "Create professional PDF reports with all project information and photos.",
      icon: <FileOutput className="h-6 w-6" />,
      path: "/reports"
    },
    {
      title: "Company Settings",
      description: "Customize the app with your company logo and information.",
      icon: <Settings className="h-6 w-6" />,
      path: "/settings"
    }
  ];

  return (
    <MainLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h5 className="text-sm tracking-wider text-primary font-medium uppercase">Storm Damage Documentation</h5>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight tracking-tight">
              PhotoTrak: Professional Reports for Storm Damage Contractors
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Document, organize, and generate professional reports for storm damage assessments with our comprehensive white-label solution.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-4"
          >
            <Link to="/project-details">
              <CustomButton 
                variant="primary" 
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Start New Project
              </CustomButton>
            </Link>
          </motion.div>
        </section>

        <motion.section 
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemFade}>
              <Card className="h-full elegant-shadow hover:elegant-shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="pb-4">
                  <div className="bg-primary/10 w-fit p-3 rounded-full mb-3">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={feature.path} className="w-full">
                    <CustomButton 
                      variant="secondary" 
                      className="w-full"
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                    >
                      Go to {feature.title}
                    </CustomButton>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
