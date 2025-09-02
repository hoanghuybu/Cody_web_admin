export const ECategoriesStatus = {
  DECLINED: {
    code: "DECLINED",
    name: "Đã từ chối",
    color: "red",
  },
  CONFIRMED: {
    code: "CONFIRMED",
    name: "Đã chấp nhận",
    color: "cyan",
  },
  DELIVERING: {
    code: "DELIVERING",
    name: "Đang giao hàng",
    color: "blue",
  },
  DELIVERED: {
    code: "DELIVERED",
    name: "Đã giao hàng",
    color: "lime",
  },
  COMPLETED: {
    code: "COMPLETED",
    name: "Đã hoàn tất",
    color: "green",
  },
  PENDING: {
    code: "PENDING",
    name: "Đang chờ xử lý",
    color: "orange",
  },
  CANCELED: {
    code: "CANCELED",
    name: "Đã Hủy",
    color: "magenta",
  },
} as const;

export type CategoriesStatusKey = keyof typeof ECategoriesStatus;
