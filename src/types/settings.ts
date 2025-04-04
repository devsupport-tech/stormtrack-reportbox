
export interface CompanyInfo {
  name: string;
  logo: string;
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

export interface UserSettings {
  name: string;
  email: string;
  emailNotifications: boolean;
  appNotifications: boolean;
  autoSave: boolean;
}

export interface ThemeSettings {
  darkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
}
