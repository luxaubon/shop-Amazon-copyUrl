export type PriceHistoryItem = {
    price: number;
  };
  
export type LogHistory = {
  data: string,
  date: Date
}
  export type User = {
    email: string;
    username: string;
    password: string;
    repassword: string;
    logHistory: LogHistory[] | [];
  };
  export type loginUser = {
    email: string;
    password: string;
  }
  
  export type Product = {
    _id?: string;
    url: string;
    currency: string;
    image: string;
    title: string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: PriceHistoryItem[] | [];
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    discountRate: number;
    description: string;
    category: string;
    reviewsCount: number;
    stars: number;
    isOutOfStock: Boolean;
    users?: User[];
  };
  
  export type NotificationType =
    | "WELCOME"
    | "CHANGE_OF_STOCK"
    | "LOWEST_PRICE"
    | "THRESHOLD_MET";
  
  export type EmailContent = {
    subject: string;
    body: string;
  };
  
  export type EmailProductInfo = {
    title: string;
    url: string;
  };

  export type Content = {
    id: string;
    name: string;
    detail: string;
    coverimage: string;
    latitude: number;
    longitude: number;
  }
