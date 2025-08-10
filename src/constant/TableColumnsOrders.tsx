import type { TableColumnsType } from "antd";
import { Tag } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { DataType } from "~/type";

interface ColumnParams {
  filteredInfo: Record<string, FilterValue | null>;
  sortedInfo: SorterResult<DataType>;
  openModal: () => void;
}

export const getColumnsOrders = ({
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
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
        </button>
      ),
    },
  ];
};
