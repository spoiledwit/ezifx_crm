type UserType = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  accounts: string[];
  isVerified: boolean;
  hasKYC: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type { UserType };