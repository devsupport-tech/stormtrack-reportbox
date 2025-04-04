
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';
import { itemFade } from '@/utils/animations';

interface CompanyLogoProps {
  logo: string;
  onLogoChange: (logo: string) => void;
}

const CompanyLogo = ({ logo, onLogoChange }: CompanyLogoProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
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
      
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <motion.div variants={itemFade}>
      <Label htmlFor="logo-upload" className="block mb-2">Company Logo</Label>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          logo ? "pb-0" : ""
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
        
        {logo && (
          <div className="mt-4 p-4 bg-background rounded-md border">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="max-h-32 mx-auto object-contain"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CompanyLogo;
