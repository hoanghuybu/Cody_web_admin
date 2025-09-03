import { LoadingOutlined } from "@ant-design/icons";
import { Input as AntInput, Form, message, Modal } from "antd";
import { useEffect } from "react";
import Button from "~/components/ui/button/Button";
import useCreateCategory from "~/hooks/categories/useCreateCategory";

interface CategoryCreateModalProps {
  title: string;
  isOpen: boolean;
  isLoadingUpdate?: boolean;
  onClose: () => void;
  isEdit?: boolean;
  handleUpdate?: (value: any) => void;
  initialValue?: any;
}

function CategoriesCreateModal(props: CategoryCreateModalProps) {
  const {
    title = "Create Category",
    isLoadingUpdate,
    isOpen,
    onClose,
    initialValue,
    isEdit,
    handleUpdate,
  } = props;

  const [form] = Form.useForm();

  const { onCreateCategory, isLoading } = useCreateCategory();

  // Submit form
  const onFinish = async (values: any) => {
    try {
      // Body gửi API (giữ lại logic cũ nếu bạn đang test mock ảnh)
      const body = {
        name: values?.name ?? null,
        description: values?.description ?? null,
        slug: values?.slug ?? null,
        metaDescription: values?.metaDescription ?? null,
      };
      if (isEdit) {
        handleUpdate(body);
      } else {
        const result = await onCreateCategory(body);
        if (result?.status === 200) {
          message.success("Tạo loại sản phẩm thành công");
          onClose();
        } else {
          console.log("Create product failed", result);
          message.error("Tạo loại sản phẩm thất bại");
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Có lỗi xảy ra khi tạo loại sản phẩm");
    }
  };

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue, form]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);
  return (
    <Modal
      footer={null}
      open={isOpen}
      onOk={() => null}
      onCancel={onClose}
      width={900}
      destroyOnHidden={true}
    >
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11 max-h-[800px]">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: null,
            description: null,
            slug: null,
            metaDescription: null,
            price: null,
            includedIds: null,
            originalPrice: null,
            stockQuantity: null,
            categoryIds: null,
            images: null,
            isHidden: true,
            ...initialValue,
          }}
          onFinish={onFinish}
          onFinishFailed={(err) => console.log("Form validation failed:", err)}
        >
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên loại sản phẩm",
                  },
                ]}
              >
                <AntInput placeholder="Nhập tên loại sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: "Vui lòng nhập slug" }]}
                validateTrigger={["onBlur", "onSubmit"]}
              >
                <AntInput placeholder="vd: keo-dua-ben-tre" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập Description" },
                ]}
              >
                <AntInput.TextArea
                  rows={6}
                  placeholder="Nhập mô tả loại sản phẩm"
                />
              </Form.Item>

              <Form.Item
                label="Meta Description"
                name="metaDescription"
                rules={[
                  { required: true, message: "Vui lòng nhập Meta Description" },
                ]}
              >
                <AntInput.TextArea
                  rows={6}
                  placeholder="Nhập meta description"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isLoading || isLoadingUpdate}
            >
              {isLoading || isLoadingUpdate ? <LoadingOutlined /> : "Close"}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => form.submit()}
              disabled={isLoading || isLoadingUpdate}
            >
              {isLoading || isLoadingUpdate ? (
                <LoadingOutlined />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default CategoriesCreateModal;
