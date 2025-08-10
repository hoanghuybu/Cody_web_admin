import { TableProps } from "antd";

export type OnChange = NonNullable<TableProps<DataType>['onChange']>;
export type Filters = Parameters<OnChange>[1];

export type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts = GetSingle<Parameters<OnChange>[2]>;

export interface DataType {
    key: string;
    customerName: string;
    productName: string;
    createdDate: Date;
    status: {
        code: string,
        name: string,
        color: string,
        textColor: string
    },
    priceRange: string
}

export interface Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'Admin' | 'Management Staff' | 'Sales Staff';
    status: 'Active' | 'Inactive';
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
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