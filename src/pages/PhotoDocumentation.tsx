
import MainLayout from '@/components/layout/MainLayout';
import PhotoUploader from '@/components/PhotoUploader';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

const PhotoDocumentation = () => {
  return (
    <MainLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Photo Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Upload and annotate photos of storm damage for your project.
          </p>
        </div>
        
        <PhotoUploader />
      </motion.div>
    </MainLayout>
  );
};

export default PhotoDocumentation;
