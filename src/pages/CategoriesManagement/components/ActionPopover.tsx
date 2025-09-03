import { MoreOutlined } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import { useState } from "react";
import { useDeleteCategory } from "~/hooks/categories/useDeleteCategory";

const ActionPopover = ({ record, handleSelectedData, openModal }: any) => {
  const { onDeleteCategory, isLoading } = useDeleteCategory();
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận xóa?",
      content: `Bạn có chắc chắn muốn xóa loại sản phẩm "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: {
        loading: isLoading,
      },
      onOk: () => onDeleteCategory(record.id),
    });
  };

  const handleViewDetail = () => {
    handleSelectedData(record);
    openModal();
    setPopoverVisible(false); // Đóng Popover sau khi bấm View Detail
  };

  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Button type="link" onClick={handleViewDetail}>
        View Detail
      </Button>
      <Button type="link" danger onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );

  return (
    <Popover
      onOpenChange={(visible) => setPopoverVisible(visible)}
      open={popoverVisible}
      content={popoverContent}
      trigger="click"
    >
      <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
        <MoreOutlined style={{ fontSize: 18 }} />
      </button>
      {/* <Button icon={<EllipsisOutlined />} /> */}
    </Popover>
  );
};

export default ActionPopover;
