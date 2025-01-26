export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

export interface UserDetails extends User {
  username: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface UsersState {
  users: User[];
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}
