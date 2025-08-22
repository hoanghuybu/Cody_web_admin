import { TableProps } from "antd";

export type OnChange = NonNullable<TableProps<DataType>['onChange']>;
export type Filters = Parameters<OnChange>[1];

export type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts = GetSingle<Parameters<OnChange>[2]>;

export interface DataType {
    id: string;
    name: string;
    slug: string;
    metaDescription: Date;
    categories: {
        id: string,
        name: string,
        slug: string,
    }[],
    images: {
        id: string,
        imageUrl: string,
        isMain: boolean,
    }[]
}



export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    assignedToName?: string;
    dueDate: string;
    status: 'New' | 'In Progress' | 'Completed';
    createdAt: string;
    updatedAt: string;
}

export interface KPIData {
    staffId: string;
    ordersProcessed: number;
    revenue: number;
    avgProcessingTime: number;
    completionRate: number;
    monthlyData: Array<{
        month: string;
        orders: number;
        revenue: number;
    }>;
}

export interface ApiResponse<T> {
    data: T;
    total?: number;
    page?: number;
    limit?: number;
}

export interface Staff {
    id: string;
    name?: string;
    fullName?: string;
    email: string;
    phoneNumber?: string;
    role: 'Admin' | 'Management Staff' | 'Sales Staff';
    status: 'Active' | 'Inactive';
    createdAt: string;
    lastLogin?: string;
    phone?: string
    avatarUrl?: string
    updatedAt?: string
}

export interface StaffFormData {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'Admin' | 'Management Staff' | 'Sales Staff';
}