
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { staggerChildren, itemFade } from '@/utils/animations';
import CompanyLogo from './CompanyLogo';
import CompanyForm from './CompanyForm';
import { CompanyInfo } from '@/types/settings';

const CompanySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Storm Damage Specialists',
    logo: '',
    address: '123 Weather Lane',
    city: 'Stormville',
    state: 'CA',
    zipCode: '12345',
    phone: '(555) 123-4567',
    email: 'info@stormdamagespecialists.com',
    website: 'www.stormdamagespecialists.com',
    licenseNumber: 'LIC-1234567',
    additionalInfo: 'Serving the community since 2010.'
  });
  
  const handleLogoChange = (logo: string) => {
    setCompanyInfo(prev => ({ ...prev, logo }));
  };
  
  const handleFormSubmit = (data: Omit<CompanyInfo, 'logo'>) => {
    // Combine form data with the logo
    const updatedInfo = { ...data, logo: companyInfo.logo };
    setCompanyInfo(updatedInfo);
    handleSave();
  };
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings Saved",
        description: "Your company settings have been updated successfully.",
      });
    }, 1500);
  };
  
  return (
    <motion.div 
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      <motion.div variants={itemFade}>
        <Card className="elegant-shadow">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Update your company details to be displayed in reports and the application interface.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CompanyLogo 
              logo={companyInfo.logo} 
              onLogoChange={handleLogoChange} 
            />
            
            <CompanyForm 
              companyInfo={companyInfo} 
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter>
            <CustomButton
              form="company-form"
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              icon={<Save className="h-4 w-4" />}
            >
              Save Company Settings
            </CustomButton>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CompanySettings;
