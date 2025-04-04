
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CompanySettings from '@/components/settings/CompanySettings';
import UserSettings from '@/components/settings/UserSettings';
import ThemeSettings from '@/components/settings/ThemeSettings';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, Palette } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <MainLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Customize your application experience and company information.
          </p>
        </div>
        
        <Tabs 
          defaultValue="company" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Company</span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>User</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Theme</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="mt-6">
            <CompanySettings />
          </TabsContent>
          
          <TabsContent value="user" className="mt-6">
            <UserSettings />
          </TabsContent>
          
          <TabsContent value="theme" className="mt-6">
            <ThemeSettings />
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
