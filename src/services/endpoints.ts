

export const endpoints = {
    login: "/api/auth/login".trim(),

    /**region Product */
    pagination: "/api/product/search",
    product_create: "/api/product/create",
    product_update: (id: string) => `/api/product/update/${id}`
    /**endregion */
}