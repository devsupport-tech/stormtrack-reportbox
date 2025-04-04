
import MainLayout from '@/components/layout/MainLayout';
import ProjectForm from '@/components/ProjectForm';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

const ProjectDetails = () => {
  return (
    <MainLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Project Details</h1>
          <p className="text-muted-foreground mt-2">
            Enter comprehensive details about the storm damage project.
          </p>
        </div>
        
        <ProjectForm />
      </motion.div>
    </MainLayout>
  );
};

export default ProjectDetails;
