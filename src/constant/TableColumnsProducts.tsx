import type { TableColumnsType } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import ActionPopover from "~/pages/ProductManagement/components/ActionPopover";
import { DataType } from "~/type";

interface ColumnParams {
  filteredInfo: Record<string, FilterValue | null>;
  categories?: any[];
  sortedInfo: SorterResult<DataType>;
  openModal: () => void;
  handleSelectedData: (value: any) => void;
}

export const getColumnsProducts = ({
  filteredInfo,
  sortedInfo,
  categories,
  openModal,
  handleSelectedData,
}: ColumnParams): TableColumnsType<DataType> => {
  const categoryFilter = categories.map((cate: any) => ({
    text: cate.name,
    value: cate.id,
  }));
  return [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Price Range",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Categories",
      dataIndex: "lstCateName",
      key: "categoryId",
      filters: categoryFilter,
      filteredValue: filteredInfo.categoryId || null,
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
