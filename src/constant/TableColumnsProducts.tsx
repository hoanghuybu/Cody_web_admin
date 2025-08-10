import { EllipsisOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Tag } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { DataType } from "~/type";

interface ColumnParams {
  filteredInfo: Record<string, FilterValue | null>;
  sortedInfo: SorterResult<DataType>;
  openModal: () => void;
}

export const getColumnsProducts = ({
  filteredInfo,
  sortedInfo,
  openModal,
}: ColumnParams): TableColumnsType<DataType> => {
  return [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      filters: [
        { text: "Nguyễn Văn A", value: "Nguyễn Văn A" },
        { text: "Trần Thị B", value: "Trần Thị B" },
      ],
      filteredValue: filteredInfo.customerName || null,
      onFilter: (value, record) =>
        record.customerName.includes(value as string),
      sorter: (a, b) => a.customerName.length - b.customerName.length,
      sortOrder:
        sortedInfo.columnKey === "customerName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status.color} style={{ color: status.textColor }}>
          {status.name}
        </Tag>
      ),
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <EllipsisOutlined />
        </button>
      ),
    },
  ];
};
