export const endpoints = {
  login: "/auth/admin/login".trim(),

  /**region Product */
  pagination: "/products/search",
  product_create: "/products/admin/create",
  product_update: (id: string) => `/products/admin/update/${id}`,
  product_delete: (id: string) => `/products/admin/delete/${id}`,
  product_detail: (id: string) => `/products/id/${id}`,
  ingredients_pagination: "/ingredients/get-all",
  ingredients_create: "/ingredients/admin/create",
  /**endregion */

  // #region  KPI
  kpi_create: "/admin/kpis/create",
  //#endregion

  // #region  Account
  account_pagination: "/accounts/search",
  account_detail: (id: string) => `/accounts/${id}`,
  //#endregion

  // #region Categories
  categories_pagination: "/categories/search",
  categories_create: "/categories/admin/create",
  categories_detail: (id: string) => `/categories/id/${id}`,
  categories_update: (id: string) => `/categories/admin/update/${id}`,
  category_delete: (id: string) => `/categories/admin/${id}`,
  /**endregion */
  // #endregion
  // #region Orders
  orders_pagination: "/admin/orders/get-all",
  orders_change_status: (id: string) => `/admin/orders/${id}/status`,
  orders_detail: (id: string) => `/orders/${id}`,
  // #endregion

  // #region  upload
  upload: "/cloudinary/upload",
  //#endregion
};
