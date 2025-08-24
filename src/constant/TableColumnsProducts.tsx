import { EllipsisOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { DataType } from "~/type";

interface ColumnParams {
  filteredInfo: Record<string, FilterValue | null>;
  sortedInfo: SorterResult<DataType>;
  openModal: () => void;
  handleSelectedData: (value: any) => void;
}

export const getColumnsProducts = ({
  filteredInfo,
  sortedInfo,
  openModal,
  handleSelectedData,
}: ColumnParams): TableColumnsType<DataType> => {
  const handleOnClick = (value: any) => {
    handleSelectedData(value);
    openModal();
  };
  return [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Bánh dừa nướng Bến Tre", value: "Bánh dừa nướng Bến Tre" },
        { text: "Test tên sản phẩm", value: "Test tên sản phẩm" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Price Range",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Description",
      dataIndex: "metaDescription",
      key: "metaDescription",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: any) => (
        <button
          onClick={() => handleOnClick(record)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <EllipsisOutlined />
        </button>
      ),
    },
  ];
};
