/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, message, Modal } from "antd";
import useCreateIngredient from "~/hooks/products/useCreateIngredient";
// import useCreateIngredient from "~/hooks/products/useCreateIngredient";

interface CreateIngredientModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (newItem: any) => void; // trả về item vừa tạo (nếu API trả)
}

export default function CreateIngredientModal({
  open,
  onClose,
  onCreated,
}: CreateIngredientModalProps) {
  const [form] = Form.useForm();
  const { onCreateIngredient, isLoading } = useCreateIngredient();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // gọi API tạo
      const res = await onCreateIngredient({ name: values.name });
      form.resetFields();
      onClose();
      if (onCreated) onCreated(res?.data ?? res); // phụ thuộc response
    } catch (err: any) {
      // show lỗi
      console.error(err);
      message.error(err?.message || "Tạo nguyên liệu thất bại");
    }
  };

  return (
    <Modal
      title="Tạo nguyên liệu mới"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      confirmLoading={false}
      // confirmLoading={isLoading}
      okText="Tạo"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="create-ingredient">
        <Form.Item
          name="name"
          label="Tên nguyên liệu"
          rules={[{ required: true, message: "Vui lòng nhập tên nguyên liệu" }]}
        >
          <Input placeholder="Nhập tên nguyên liệu" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
