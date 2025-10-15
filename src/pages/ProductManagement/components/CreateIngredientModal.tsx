// components/ingredient/CreateIngredientModal.tsx
import { Form, Input, message, Modal } from "antd";
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
  //   const { mutateAsync, isLoading } = useCreateIngredient();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // gọi API tạo
      //   const res = await mutateAsync({ name: values.name });
      const res = { data: {} };
      message.success("Tạo nguyên liệu thành công");
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
      confirmLoading={isLoading}
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

// Đổi dialog thành 1 trang
// Ui theeo feedback
