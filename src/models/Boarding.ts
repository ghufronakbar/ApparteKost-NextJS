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
