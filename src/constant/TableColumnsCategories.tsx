import type { TableColumnsType } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import ActionPopover from "~/pages/CategoriesManagement/components/ActionPopover";
import { DataType } from "~/type";

interface ColumnParams {
  filteredInfo: Record<string, FilterValue | null>;
  sortedInfo: SorterResult<DataType>;
  openModal: () => void;
  handleSelectedData: (value: any) => void;
}

export const getColumnsCategories = ({
  //   filteredInfo,
  //   sortedInfo,
  openModal,
  handleSelectedData,
}: ColumnParams): TableColumnsType<DataType> => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      //   filters: [
      //     { text: "Bánh dừa nướng Bến Tre", value: "Bánh dừa nướng Bến Tre" },
      //     { text: "Test tên sản phẩm", value: "Test tên sản phẩm" },
      //   ],
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value as string),
      //   ellipsis: true,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Meta Description",
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
