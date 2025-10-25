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

