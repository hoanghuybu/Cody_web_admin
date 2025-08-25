

export const endpoints = {
    login: "/auth/admin/login".trim(),

    /**region Product */
    pagination: "/products/search",
    product_create: "/products/create",
    product_update: (id: string) => `/products/update/${id}`
    /**endregion */
}