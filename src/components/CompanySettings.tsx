
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Save } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { cn } from '@/lib/utils';
import { itemFade, staggerChildren } from '@/utils/animations';

interface CompanyInfo {
  name: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  licenseNumber: string;
  additionalInfo: string;
}

const CompanySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setCompanyInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setCompanyInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    if (!companyInfo.name) {
      toast({
        title: "Company Name Required",
        description: "Please enter your company name.",
        variant: "destructive"
      });
      return;
    }
    
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
            <div>
              <Label htmlFor="logo-upload" className="block mb-2">Company Logo</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                  companyInfo.logo ? "pb-0" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
                    <Upload 
                      className={cn(
                        "h-6 w-6 mx-auto transition-transform duration-300",
                        isDragging ? "text-primary scale-110" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm">
                      Drag and drop your logo here, or click to browse
                    </p>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <CustomButton
                      type="button"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      variant="outline"
                      size="sm"
                    >
                      Browse Files
                    </CustomButton>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 300x100px. Max file size: 2MB.
                  </p>
                </div>
                
                {companyInfo.logo && (
                  <div className="mt-4 p-4 bg-background rounded-md border">
                    <img 
                      src={companyInfo.logo} 
                      alt="Company Logo" 
                      className="max-h-32 mx-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  value={companyInfo.licenseNumber}
                  onChange={handleChange}
                  placeholder="Enter license number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={companyInfo.address}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={companyInfo.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={companyInfo.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={companyInfo.zipCode}
                  onChange={handleChange}
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  value={companyInfo.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={companyInfo.website}
                  onChange={handleChange}
                  placeholder="Enter website URL"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={companyInfo.additionalInfo}
                onChange={handleChange}
                placeholder="Add any additional company information"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <CustomButton
              onClick={handleSave}
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
