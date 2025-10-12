import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "~/components/ui/modal";
import { useLoadDetailOrder } from "~/hooks/orders/useLoadDetailOrder";

interface OrderDetailModalProps {
  initData: any;
  isOpen: boolean;
  onClose: () => void;
}

function OrderDetailModal({
  initData,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  const [shouldLoadDetail, setShouldLoadDetail] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: detailOrder, isLoading: isLoadingDetail } = useLoadDetailOrder(
    shouldLoadDetail ? initData?.orderId : undefined
  );

  const formatCurrency = (value: number) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateStr: string) =>
    moment(dateStr).locale("vi").format("DD/MM/YYYY HH:mm");

  /** Columns for Status History */
  const statusColumns: ColumnsType<any> = [
    {
      title: "Updated By",
      dataIndex: ["modifiedBy", "name"],
      key: "modifiedBy",
    },
    {
      title: "Updated Date",
      dataIndex: "modifiedAt",
      key: "modifiedAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Delivery Status",
      dataIndex: ["deliveryStatus", "vietnamese"],
      key: "deliveryStatus",
      render: (_, record) =>
        record.deliveryStatus?.vietnamese || record.deliveryStatus?.name,
    },
    {
      title: "Delivery Payment",
      dataIndex: ["paymentStatus", "vietnamese"],
      key: "paymentStatus",
      render: (_, record) =>
        record.paymentStatus?.vietnamese || record.paymentStatus?.name,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General Info",
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-800 dark:text-gray-100">
          <p>
            <strong>Order Id:</strong> {detailOrder?.orderId}
          </p>
          <p>
            <strong>Created Date:</strong> {formatDate(detailOrder?.createdAt)}
          </p>
          <p>
            <strong>Total money:</strong>{" "}
            {formatCurrency(detailOrder?.totalPrice)}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {detailOrder?.status?.vietnamese || detailOrder?.status?.name}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            {detailOrder?.paymentStatus?.vietnamese ||
              detailOrder?.paymentStatus?.name}
          </p>
          <p>
            <strong>Delivery Status:</strong>{" "}
            {detailOrder?.deliveryStatus?.vietnamese ||
              detailOrder?.deliveryStatus?.name}
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Buyer Info",
      children: (
        <div className="space-y-2 text-gray-800 dark:text-gray-100">
          <p>
            <strong>Name:</strong> {detailOrder?.buyer?.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {detailOrder?.buyer?.buyerPhone}
          </p>
          {detailOrder?.addressUrl && (
            <p>
              <strong>Address:</strong> {detailOrder?.addressUrl}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Products",
      children: (
        <div className="space-y-4">
          {detailOrder?.items?.map((item: any) => {
            const mainImage = item.product.images.find(
              (img: any) => img.isMain
            );
            return (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  src={mainImage?.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price: {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="text-right font-semibold text-gray-800 dark:text-gray-100">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            );
          })}

          {/* Tổng kết */}
          <div className="flex justify-between items-center p-4 border-t mt-4 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Total Products:{" "}
              {detailOrder?.items?.reduce(
                (sum: number, item: any) => sum + item.quantity,
                0
              )}
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Total Money:{" "}
              {formatCurrency(
                detailOrder?.items?.reduce(
                  (sum: number, item: any) => sum + item.price * item.quantity,
                  0
                )
              )}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "4",
      label: "Status History",
      children: (
        <Table
          dataSource={detailOrder?.orderStatuses}
          columns={statusColumns}
          rowKey={(record) => record.modifiedAt}
          pagination={false}
        />
      ),
    },
  ];

  useEffect(() => {
    if (isOpen && initData?.orderId) {
      setShouldLoadDetail(true);
    }
  }, [isOpen, initData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[800px] m-4">
      <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-8">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Order Detail
        </h3>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Modal>
  );
}

export default OrderDetailModal;
