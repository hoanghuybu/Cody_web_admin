import type { TableColumnsType } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import ActionPopover from "~/pages/ProductManagement/components/ActionPopover";
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
        <ActionPopover
          record={record}
          handleSelectedData={handleSelectedData}
          openModal={openModal}
        />
      ),
    },
  ];
};
