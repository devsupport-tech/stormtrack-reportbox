
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Save, User } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { staggerChildren, itemFade } from '@/utils/animations';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  emailNotifications: z.boolean(),
  appNotifications: z.boolean(),
  autoSave: z.boolean(),
});

const UserSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John Smith",
      email: "john@example.com",
      emailNotifications: true,
      appNotifications: true,
      autoSave: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
      toast({
        title: "Settings Updated",
        description: "Your user settings have been saved successfully.",
      });
    }, 1500);
  }

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
            <CardTitle>User Settings</CardTitle>
            <CardDescription>
              Manage your account settings and notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemFade} className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemFade} className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for important updates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">App Notifications</FormLabel>
                          <FormDescription>
                            Receive in-app notifications and alerts.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemFade} className="space-y-4">
                  <h3 className="text-lg font-medium">Application Settings</h3>
                  
                  <FormField
                    control={form.control}
                    name="autoSave"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Auto Save</FormLabel>
                          <FormDescription>
                            Automatically save changes while editing.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <CustomButton
              form="user-form"
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              icon={<User className="h-4 w-4" />}
            >
              Save User Settings
            </CustomButton>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default UserSettings;
