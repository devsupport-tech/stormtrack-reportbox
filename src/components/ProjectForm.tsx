
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { itemFade, staggerChildren } from '@/utils/animations';
import CustomButton from './ui/CustomButton';

interface ProjectFormProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const damageTypes = [
  "Wind Damage",
  "Hail Damage",
  "Water Damage",
  "Flood Damage",
  "Lightning Damage",
  "Tornado Damage",
  "Hurricane Damage",
  "Fire Damage",
  "Other"
];

const severityLevels = [
  "Minor",
  "Moderate",
  "Severe",
  "Catastrophic"
];

const ProjectForm = ({ onSave, initialData }: ProjectFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || '',
    clientPhone: initialData?.clientPhone || '',
    clientEmail: initialData?.clientEmail || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    damageType: initialData?.damageType || '',
    severityLevel: initialData?.severityLevel || '',
    insuranceCompany: initialData?.insuranceCompany || '',
    claimNumber: initialData?.claimNumber || '',
    adjusterName: initialData?.adjusterName || '',
    adjusterPhone: initialData?.adjusterPhone || '',
    notes: initialData?.notes || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill out client name and date at minimum.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const completeData = {
        ...formData,
        date: date?.toISOString(),
      };
      
      if (onSave) {
        onSave(completeData);
      }
      
      toast({
        title: "Project Saved",
        description: "Project details have been successfully saved.",
      });
      
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemFade} className="space-y-6">
        <div className="rounded-lg bg-background p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Client Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                name="clientName" 
                value={formData.clientName} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Incident Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input 
                id="clientPhone" 
                name="clientPhone" 
                value={formData.clientPhone} 
                onChange={handleChange} 
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input 
                id="clientEmail" 
                name="clientEmail" 
                value={formData.clientEmail} 
                onChange={handleChange} 
                placeholder="client@example.com"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemFade} className="space-y-6">
        <div className="rounded-lg bg-background p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Property Location</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="123 Main St"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Anytown"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  placeholder="CA"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemFade} className="space-y-6">
        <div className="rounded-lg bg-background p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Damage Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="damageType">Type of Damage</Label>
              <Select 
                value={formData.damageType} 
                onValueChange={(value) => handleSelectChange('damageType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select damage type" />
                </SelectTrigger>
                <SelectContent>
                  {damageTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="severityLevel">Severity Level</Label>
              <Select 
                value={formData.severityLevel} 
                onValueChange={(value) => handleSelectChange('severityLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemFade} className="space-y-6">
        <div className="rounded-lg bg-background p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceCompany">Insurance Company</Label>
              <Input 
                id="insuranceCompany" 
                name="insuranceCompany" 
                value={formData.insuranceCompany} 
                onChange={handleChange} 
                placeholder="Insurance Provider"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="claimNumber">Claim Number</Label>
              <Input 
                id="claimNumber" 
                name="claimNumber" 
                value={formData.claimNumber} 
                onChange={handleChange} 
                placeholder="123-ABC-456"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adjusterName">Adjuster Name</Label>
              <Input 
                id="adjusterName" 
                name="adjusterName" 
                value={formData.adjusterName} 
                onChange={handleChange} 
                placeholder="Jane Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adjusterPhone">Adjuster Phone</Label>
              <Input 
                id="adjusterPhone" 
                name="adjusterPhone" 
                value={formData.adjusterPhone} 
                onChange={handleChange} 
                placeholder="(555) 987-6543"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemFade} className="space-y-6">
        <div className="rounded-lg bg-background p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Enter any additional details about the damage..."
              rows={6}
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemFade} className="flex justify-end">
        <CustomButton 
          type="submit" 
          variant="primary" 
          size="lg"
          isLoading={isLoading}
          icon={<Save className="h-4 w-4" />}
        >
          Save Project Details
        </CustomButton>
      </motion.div>
    </motion.form>
  );
};

export default ProjectForm;
