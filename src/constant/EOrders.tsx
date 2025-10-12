export const EOrdersStatus = {
  DECLINED: {
    code: "DECLINED",
    eName: "Declined",
    name: "Đã từ chối",
    color: "red",
  },
  CONFIRMED: {
    code: "CONFIRMED",
    eName: "Confirmed",
    name: "Đã chấp nhận",
    color: "cyan",
  },
  DELIVERING: {
    code: "DELIVERING",
    eName: "Delivering",
    name: "Đang giao hàng",
    color: "blue",
  },
  DELIVERED: {
    code: "DELIVERED",
    eName: "Delivered",
    name: "Đã giao hàng",
    color: "lime",
  },
  COMPLETED: {
    code: "COMPLETED",
    eName: "Completed",
    name: "Đã hoàn tất",
    color: "green",
  },
  PENDING: {
    code: "PENDING",
    eName: "Pending",
    name: "Đang chờ xử lý",
    color: "orange",
  },
  CANCELED: {
    code: "CANCELED",
    eName: "Canceled",
    name: "Đã Hủy",
    color: "magenta",
  },
} as const;

export type CategoriesStatusKey = keyof typeof EOrdersStatus;

export const EPaymentStatus = {
  PAID: {
    code: "PAID",
    eName: "Paid",
    name: "Đã thanh toán",
    color: "green",
  },
  UNPAID: {
    code: "UNPAID",
    eName: "Unpaid",
    name: "Chưa thanh toán",
    color: "red",
  },
  REFUNDED: {
    code: "REFUNDED",
    eName: "Refunded",
    name: "Đã hoàn tiền",
    color: "blue",
  },
} as const;

export type PaymentStatusKey = keyof typeof EPaymentStatus;
