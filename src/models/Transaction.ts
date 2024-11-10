export interface Room {
  total: number;
  available: number;
  active: number;
}

export interface Booking {
  bookingId: number;
  isActive: boolean;
  bookedDate: string;
  user: User;
}

export interface User {
  userId: 2;
  name: string;
  email: string;
  phone: string;
  picture: string | null;
}

export interface Transaction {
  room: Room;
  bookings: Booking[];
}

export const initTransaction: Transaction = {
  room: {
    total: 0,
    available: 0,
    active: 0,
  },
  bookings: [],
};
