
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { FileOutput, Mail, Download, Check } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { itemFade, staggerChildren } from '@/utils/animations';

interface ReportGeneratorProps {
  projectData?: any;
  photoCount?: number;
}

const ReportGenerator = ({ projectData, photoCount = 0 }: ReportGeneratorProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);
  
  const [settings, setSettings] = useState({
    includeAllPhotos: true,
    includeNotes: true,
    includeClientInfo: true,
    includeInsuranceInfo: true,
    highResolution: true,
    coverPage: true,
    additionalNotes: '',
    customReportName: projectData?.clientName ? `${projectData.clientName} - Damage Report` : 'Storm Damage Report'
  });
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      
      toast({
        title: "Report Generated",
        description: "Your report has been successfully generated.",
      });
    }, 2500);
  };
  
  const handleEmailReport = () => {
    if (!emailRecipient) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the report.",
        variant: "destructive"
      });
      return;
    }
    
    setIsEmailing(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsEmailing(false);
      
      toast({
        title: "Report Sent",
        description: `Report has been sent to ${emailRecipient}.`,
      });
      
      setEmailRecipient('');
    }, 2000);
  };
  
  return (
    <motion.div 
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemFade}>
        <Card className="elegant-shadow">
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>
              Create a comprehensive PDF report with all project details and photos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  value={settings.customReportName}
                  onChange={(e) => handleSettingChange('customReportName', e.target.value)}
                  placeholder="Enter a name for this report"
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Report Contents</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeAllPhotos" className="cursor-pointer">Include All Photos ({photoCount})</Label>
                    <Switch
                      id="includeAllPhotos"
                      checked={settings.includeAllPhotos}
                      onCheckedChange={(checked) => handleSettingChange('includeAllPhotos', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeNotes" className="cursor-pointer">Include Photo Notes</Label>
                    <Switch
                      id="includeNotes"
                      checked={settings.includeNotes}
                      onCheckedChange={(checked) => handleSettingChange('includeNotes', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeClientInfo" className="cursor-pointer">Include Client Information</Label>
                    <Switch
                      id="includeClientInfo"
                      checked={settings.includeClientInfo}
                      onCheckedChange={(checked) => handleSettingChange('includeClientInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeInsuranceInfo" className="cursor-pointer">Include Insurance Details</Label>
                    <Switch
                      id="includeInsuranceInfo"
                      checked={settings.includeInsuranceInfo}
                      onCheckedChange={(checked) => handleSettingChange('includeInsuranceInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="highResolution" className="cursor-pointer">High Resolution Images</Label>
                    <Switch
                      id="highResolution"
                      checked={settings.highResolution}
                      onCheckedChange={(checked) => handleSettingChange('highResolution', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="coverPage" className="cursor-pointer">Include Cover Page</Label>
                    <Switch
                      id="coverPage"
                      checked={settings.coverPage}
                      onCheckedChange={(checked) => handleSettingChange('coverPage', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={settings.additionalNotes}
                  onChange={(e) => handleSettingChange('additionalNotes', e.target.value)}
                  placeholder="Add any additional notes to include in the report"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CustomButton
              onClick={handleGenerateReport}
              variant="primary"
              size="lg"
              isLoading={isGenerating}
              icon={<FileOutput className="h-4 w-4" />}
              fullWidth
            >
              Generate PDF Report
            </CustomButton>
          </CardFooter>
        </Card>
      </motion.div>
      
      {reportGenerated && (
        <motion.div 
          variants={itemFade}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/20 bg-primary/5 elegant-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <div className="mr-3 bg-primary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Report Ready</CardTitle>
                  <CardDescription>
                    Your report has been generated and is ready to download or share.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <CustomButton
                  variant="outline"
                  size="lg"
                  icon={<Download className="h-4 w-4" />}
                  className="flex-1"
                >
                  Download Report
                </CustomButton>
                
                <div className="flex flex-1 items-center space-x-2">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    className="w-full"
                  />
                  <CustomButton
                    variant="secondary"
                    size="md"
                    isLoading={isEmailing}
                    icon={<Mail className="h-4 w-4" />}
                    onClick={handleEmailReport}
                  >
                    Send
                  </CustomButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReportGenerator;
