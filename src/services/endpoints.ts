export const endpoints = {
  login: "/auth/admin/login".trim(),

  /**region Product */
  pagination: "/products/search",
  product_create: "/products/admin/create",
  product_update: (id: string) => `/products/admin/update/${id}`,
  product_detail: (id: string) => `/products/id/${id}`,
  /**endregion */
  // #region Categories
  categories_pagination: "/categories/get-all",
  // #endregion
};
