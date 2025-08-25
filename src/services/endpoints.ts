

export const endpoints = {
    login: "/auth/admin/login".trim(),

    /**region Product */
    pagination: "/api/product/search",
    product_create: "/api/product/create",
    product_update: (id: string) => `/api/product/update/${id}`
    /**endregion */
}