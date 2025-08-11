import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "danger";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}) => {
  const iconColor = type === "danger" ? "text-red-500" : "text-orange-500";
  const confirmButtonClass =
    type === "danger"
      ? "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600"
      : "bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600";

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      centered
      width={400}
      footer={null}
      className="confirmation-modal"
    >
      <div className="text-center p-6">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${iconColor}`}
        >
          <ExclamationCircleOutlined className="text-2xl" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        <p className="text-gray-600 mb-6 leading-relaxed">{content}</p>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:text-gray-800 hover:border-gray-400 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
