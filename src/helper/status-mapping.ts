// status-mapping.ts

// Frontend -> Backend (giá trị backend là các short-code của api)
export const FRONT_TO_BACK_MAIN: Record<string, string | string[]> = {
  // keys: frontend codes (EOrdersStatus[key].code)
  PENDING: "PS",
  CONFIRMED: "CF",
  DECLINED: "DC",
  DELIVERING: "DL",
  DELIVERED: "CP", // mình map Delivered -> mainStatus CP (Completed). chỉnh nếu muốn khác
  COMPLETED: "CP",
  CANCELED: "CN",
};

export const FRONT_TO_BACK_DELIVERY: Record<string, string | string[]> = {
  PENDING: "PND",
  CONFIRMED: "CF",
  DECLINED: "DC",
  DELIVERING: "DLN",
  DELIVERED: "DLD",
  COMPLETED: "DLD",
  CANCELED: "CNL",
};

export const FRONT_TO_BACK_PAYMENT: Record<string, string | string[]> = {
  PAID: "PD",
  UNPAID: "UP",
  REFUNDED: "RFD",
};

// Backend valid code lists (dùng để detect nếu người dùng đã gửi backend code trực tiếp)
export const BACKEND_MAIN_CODES = [
  "PS",
  "CF",
  "DC",
  "DL",
  "CP",
  "RFG",
  "RFD",
  "CN",
];
export const BACKEND_DELIVERY_CODES = [
  "PND",
  "CF",
  "DLN",
  "DLD",
  "U_CF",
  "DC",
  "CNL",
  "D_FL",
  "D_RG",
  "D_RT",
  "R_PD",
  "R_CF",
  "R_DLN",
  "R_DLD",
];
export const BACKEND_PAYMENT_CODES = ["UP", "PD", "C_UP", "RFG", "RFD"];

/**
 * Chuyển filteredInfo (antd) sang params cho API.
 * - filteredInfo.status, filteredInfo.paymentStatus là arrays (giá trị là frontend codes hoặc có thể backend codes).
 * - Kết quả return các giá trị (nếu nhiều => join bằng comma) phù hợp gửi api.
 */
export function mapFrontendFiltersToApiParams(
  filteredInfo: Record<string, any>
) {
  const toBackend = (
    vals: any[] | undefined,
    mapping: Record<string, string | string[]>,
    validBackendList: string[]
  ): string | undefined => {
    if (!vals || vals.length === 0) return undefined;
    const out = new Set<string>();
    for (const raw of vals) {
      if (!raw) continue;
      const v = String(raw).trim();
      // nếu là backend code rồi -> passthrough
      if (validBackendList.includes(v)) {
        out.add(v);
        continue;
      }
      // nếu có mapping trực tiếp từ frontend code -> backend
      if (mapping[v]) {
        const m = mapping[v];
        if (Array.isArray(m)) m.forEach((x) => out.add(x));
        else out.add(m);
        continue;
      }
      // fallback: thử uppercase key (phòng trường hợp có khác chỗ chữ hoa/thường)
      const up = v.toUpperCase();
      if (mapping[up]) {
        const m = mapping[up];
        if (Array.isArray(m)) m.forEach((x) => out.add(x));
        else out.add(m);
        continue;
      }
      // bạn có thể thêm fallback lookup bằng eName/name nếu cần (tùy cấu trúc filtered value)
    }
    return out.size ? Array.from(out).join(",") : undefined;
  };

  const mainStatus = toBackend(
    filteredInfo.status,
    FRONT_TO_BACK_MAIN,
    BACKEND_MAIN_CODES
  );
  const deliveryStatus = toBackend(
    filteredInfo.status,
    FRONT_TO_BACK_DELIVERY,
    BACKEND_DELIVERY_CODES
  );
  const paymentStatus = toBackend(
    filteredInfo.paymentStatus,
    FRONT_TO_BACK_PAYMENT,
    BACKEND_PAYMENT_CODES
  );

  return {
    mainStatus,
    deliveryStatus,
    paymentStatus,
  };
}
