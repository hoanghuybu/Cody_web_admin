import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import { useState } from "react";
import { useDeleteProduct } from "~/hooks/products/useDeleteProduct";

const ActionPopover = ({ record, handleSelectedData, openModal }: any) => {
  const { onDeleteProduct, isLoading } = useDeleteProduct();
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận xóa?",
      content: `Bạn có chắc chắn muốn xóa sản phẩm "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: {
        loading: isLoading,
      },
      onOk: () => onDeleteProduct(record.id),
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
      <Button icon={<EllipsisOutlined />} />
    </Popover>
  );
};

export default ActionPopover;
