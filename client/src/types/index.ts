type UserType = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  accounts: string[];
  profilePic?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  isVerified: boolean;
  kycRequest: boolean;
  hasKYC: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type { UserType };