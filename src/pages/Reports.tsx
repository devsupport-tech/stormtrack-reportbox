
import MainLayout from '@/components/layout/MainLayout';
import ReportGenerator from '@/components/ReportGenerator';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

const Reports = () => {
  // Mock project data
  const mockProjectData = {
    clientName: "John Smith",
    address: "123 Storm Lane",
    city: "Weathertown",
    state: "TX",
    zipCode: "12345",
    damageType: "Wind Damage",
    severityLevel: "Moderate",
    insuranceCompany: "Weather Shield Insurance",
    claimNumber: "WS-12345"
  };
  
  return (
    <MainLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Report Generation</h1>
          <p className="text-muted-foreground mt-2">
            Create comprehensive PDF reports for clients and insurance companies.
          </p>
        </div>
        
        <ReportGenerator projectData={mockProjectData} photoCount={12} />
      </motion.div>
    </MainLayout>
  );
};

export default Reports;
