export interface PaymentProvider {
  createCheckoutSession(params: {
    listingId: string;
    userId: string;
    amountCents: number;
  }): Promise<{ checkoutUrl: string }>;
}

export const paymentProvider: PaymentProvider = {
  async createCheckoutSession() {
    throw new Error("Payments are not enabled in MVP v1.");
  }
};

export interface BookingProvider {
  createBooking(params: {
    listingId: string;
    userId: string;
    timeSlot: string;
  }): Promise<{ bookingId: string }>;
}

export const bookingProvider: BookingProvider = {
  async createBooking() {
    throw new Error("Bookings are not enabled in MVP v1.");
  }
};
