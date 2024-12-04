export interface BoardingHouse {
  boardingHouseId: number;
  name: string;
  owner: string;
  ownerPicture: string | null;
  email: string;
  phone: string;
  password: string;
  description: string;
  district: string;
  subdistrict: string;
  location: string;
  panoramaPicture: string | null;
  maxCapacity: number;
  price: number;
  isPending: boolean;
  isConfirmed: boolean;
  isActive: boolean;
  _count: {
    bookings: number;
    pictures: number;
    bookmarks: number;
    reviews: number;
  };
  pictures: Picture[];
  reviews: Review[];
  averageRating: number;
  dashboard: BoardingDashboard;
}

export interface Picture {
  pictureId: number;
  picture: string;
  boardingHouseId: number;
}

export interface Review {
  reviewId: number;
  userId: number;
  boardingHouseId: number;
  comment: string | null;
  createdAt: string;
}

export interface BoardingDashboard {
  totalTransactions: number;
  totalRooms: number;
  totalFilledRooms: number;
  totalFreeRooms: number;
}

export const initBoardingDashboard: BoardingDashboard = {
  totalTransactions: 0,
  totalRooms: 0,
  totalFilledRooms: 0,
  totalFreeRooms: 0,
};

export type AdminDashboard = {
  totalUsers: number;
  totalBoardingHouses: number;
  totalActiveBoardingHouses: number;
  totalPendingBoardingHouses: number;
};

export const initAdminDashboard: AdminDashboard = {
  totalUsers: 0,
  totalBoardingHouses: 0,
  totalActiveBoardingHouses: 0,
  totalPendingBoardingHouses: 0,
};
