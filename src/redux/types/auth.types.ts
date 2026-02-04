export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: LoginData;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profileImage: string | null;
  role: "USER" | "ADMIN" | "SUPERADMIN" | "CREATOR" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  lastLogin: string | null;
  subscription_status: "FREE_TIER" | "PREMIUM" | string;
  verified: boolean;
  is2FAEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  banExpiresAt: string | null;
  banReason: string | null;
}
