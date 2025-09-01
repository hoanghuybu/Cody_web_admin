export const ECategoriesStatus = {
  DECLINED: {
    code: "DECLINED",
    name: "Đã từ chối",
    color: "red",
  },
  DELIVERING: {
    code: "DELIVERING",
    name: "Đang giao hàng",
    color: "blue",
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
