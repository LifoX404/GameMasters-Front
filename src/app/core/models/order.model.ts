export interface OrderList {
  id: number;
  orderDate: string;
  orderTotal: number;
  orderStatus: OrderStatus;
  deliveryAddress: string;
  deliveryPhone: string;
  paymentMethod: PaymentMethod;
  observations: string;
  status: boolean;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  itemQuantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderDetail extends OrderList{
  orderItem: OrderItem[];
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED"
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PAYPAL = "PAYPAL",
  BANK_TRANSFER = "BANK_TRANSFER",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY"
}

