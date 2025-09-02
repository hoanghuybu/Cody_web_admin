import { MoreOutlined } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import { Fragment, useRef, useState } from "react";
import { CategoriesStatusKey, ECategoriesStatus } from "~/constant/ECategories";
import useChangeStatusOrder from "~/hooks/orders/useChangeStatusOrder";

const ActionPopover = ({ record, handleSelectedData, openModal }: any) => {
  const bodyRef = useRef(null);
  const { onChangeOrderStatus, isLoading } = useChangeStatusOrder(
    record?.orderId ?? null
  );

  const statusName =
    ECategoriesStatus[record?.status?.name as CategoriesStatusKey];
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleOnclick = (status: string): void => {
    switch (status) {
      case ECategoriesStatus.PENDING.code:
        handleChangeStatus(status);
        break;
      case ECategoriesStatus.CONFIRMED.code:
        bodyRef.current = {
          deliveryStatus: "CF",
          paymentStatus: null,
        };
        handleChangeStatus(status);
        break;
      case ECategoriesStatus.DELIVERING.code:
        bodyRef.current = {
          deliveryStatus: "DLN",
          paymentStatus: null,
        };
        handleChangeStatus(status);
        break;
      case ECategoriesStatus.DELIVERED.code:
        bodyRef.current = {
          deliveryStatus: "DLD",
          paymentStatus: "PD",
        };
        handleChangeStatus(status);
        break;
      case ECategoriesStatus.DECLINED.code:
        bodyRef.current = {
          deliveryStatus: "DC",
          paymentStatus: null,
        };
        handleChangeStatus(status);
        break;
      case "CANCELLED":
        handleChangeStatus(status);
        break;
      default:
        return;
    }
  };

  const handleChangeStatus = (status: string) => {
    const changedStatus = ECategoriesStatus[status as CategoriesStatusKey];
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái?",
      content: `Bạn có chắc chắn muốn thay đổi sản phẩm từ "${statusName?.name}" thành "${changedStatus?.name}" không?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: isLoading,
      },
      onOk: () => {
        onChangeOrderStatus(bodyRef.current);
      },
    });
  };

  const handleViewDetail = () => {
    handleSelectedData(record);
    openModal();
    setPopoverVisible(false);
  };

  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Button style={{ color: "black" }} type="link" onClick={handleViewDetail}>
        View Detail
      </Button>

      {_renderButtonChangeStatus(statusName.code, handleOnclick)}
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

const _renderButtonChangeStatus = (
  status: string,
  handleOnclick: (status: string) => void
) => {
  switch (status) {
    case ECategoriesStatus.PENDING.code:
      return (
        <Fragment>
          <Button
            type="link"
            style={{ color: "cyan" }}
            onClick={() => handleOnclick("CONFIRMED")}
          >
            Confirmed
          </Button>
          <Button
            type="link"
            style={{ color: "red" }}
            onClick={() => handleOnclick("DECLINED")}
          >
            Declined
          </Button>
        </Fragment>
      );
    case ECategoriesStatus.CONFIRMED.code:
      return (
        <Fragment>
          <Button
            type="link"
            style={{ color: "blue" }}
            onClick={() => handleOnclick("DELIVERING")}
          >
            Delivering
          </Button>
          <Button
            type="link"
            style={{ color: "red" }}
            onClick={() => handleOnclick("DECLINED")}
          >
            Declined
          </Button>
        </Fragment>
      );
    case ECategoriesStatus.DELIVERING.code:
      return (
        <Button
          type="link"
          style={{ color: "lime" }}
          onClick={() => handleOnclick("DELIVERED")}
        >
          Delivered
        </Button>
      );
    default:
      return null;
  }
};
