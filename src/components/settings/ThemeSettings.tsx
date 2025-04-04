
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Moon, Sun, Save } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { staggerChildren, itemFade } from '@/utils/animations';
import { cn } from '@/lib/utils';

// Theme color presets
const colorPresets = [
  { name: "Blue", primary: "#3B82F6", secondary: "#EFF6FF" },
  { name: "Green", primary: "#10B981", secondary: "#ECFDF5" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#F5F3FF" },
  { name: "Red", primary: "#EF4444", secondary: "#FEF2F2" },
  { name: "Orange", primary: "#F97316", secondary: "#FFF7ED" },
];

const ThemeSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customPrimary, setCustomPrimary] = useState("#3B82F6");
  const [customSecondary, setCustomSecondary] = useState("#EFF6FF");

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate saving theme
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Theme Settings Saved",
        description: "Your theme preferences have been updated successfully.",
      });
    }, 1500);
  };

  const handlePresetSelect = (index: number) => {
    setSelectedPreset(index);
    setCustomPrimary(colorPresets[index].primary);
    setCustomSecondary(colorPresets[index].secondary);
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
            <CardTitle>Theme Customization</CardTitle>
            <CardDescription>
              Personalize the application with your preferred colors and theme.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-muted-foreground" />
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
                <Moon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base">Color Presets</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {colorPresets.map((preset, index) => (
                  <button
                    key={preset.name}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-2 rounded-md border transition-all hover:scale-105",
                      selectedPreset === index ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => handlePresetSelect(index)}
                  >
                    <div className="flex space-x-2 mb-2">
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-xs">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base">Custom Colors</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex space-x-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: customPrimary }}
                    />
                    <Input
                      id="primaryColor"
                      type="text"
                      value={customPrimary}
                      onChange={(e) => setCustomPrimary(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: customSecondary }}
                    />
                    <Input
                      id="secondaryColor"
                      type="text"
                      value={customSecondary}
                      onChange={(e) => setCustomSecondary(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg border">
              <Label className="text-base mb-4 block">Preview</Label>
              <div 
                className="p-6 rounded-lg"
                style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', color: darkMode ? '#ffffff' : '#111827' }}
              >
                <div className="flex space-x-2 mb-4">
                  <button 
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: customPrimary }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-md text-gray-900 border"
                    style={{ backgroundColor: customSecondary }}
                  >
                    Secondary Button
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="font-medium" style={{ color: customPrimary }}>Sample Heading</div>
                  <p className="text-sm">This is how your text will appear with the selected theme.</p>
                </div>
              </div>
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
              Save Theme Settings
            </CustomButton>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSettings;
