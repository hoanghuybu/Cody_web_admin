import { LoadingOutlined } from "@ant-design/icons";
import {
  Input as AntInput,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useMemo } from "react";
import FileInput from "~/components/form/input/FileInput";
import Button from "~/components/ui/button/Button";
import { usePaginationCategory } from "~/hooks/categories/usePaginationCategory";
import useCreateProduct from "~/hooks/products/useCreateProduct";
import { usePaginationProduct } from "~/hooks/products/usePaginationProduct";

interface ProductCreateModalProps {
  title: string;
  isOpen: boolean;
  isLoadingUpdate?: boolean;
  onClose: () => void;
  isEdit?: boolean;
  handleUpdate?: (value: any) => void;
  initialValue?: Partial<{
    name: string;
    description: string;
    slug: string;
    metaDescription: string;
    price: number;
    includedIds: string[];
    originalPrice: number;
    stockQuantity: number;
    categoryIds: string[];
    images: any[];
    isHidden: boolean;
  }>;
}

function OrderCreateModal(props: ProductCreateModalProps) {
  const {
    title = "Create Product",
    isLoadingUpdate,
    isOpen,
    onClose,
    initialValue,
    isEdit,
    handleUpdate,
  } = props;

  const [form] = Form.useForm();

  const { onCreateProduct, isLoading } = useCreateProduct();
  const { data: lstCategories, isLoading: isLoadingCategory } =
    usePaginationCategory();
  const { data: dataProducts, isLoading: isLoadingProduct } =
    usePaginationProduct();

  const categoryOptions = useMemo(
    () =>
      (lstCategories || []).map((c: any) => ({
        value: c?.id,
        label: c?.name,
      })),
    [lstCategories]
  );

  const productOptions = useMemo(
    () =>
      (dataProducts || []).map((p: any) => ({
        value: p?.id,
        label: p?.name || p?.title || `#${p?.id}`,
      })),
    [dataProducts]
  );

  // Nhận file từ FileInput và set vào Form (images: {file, preview}[])
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const prevImages = (form.getFieldValue("images") as any[]) || [];
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    form.setFieldsValue({
      images: [...prevImages, ...newImages],
    });
  };

  // Submit form
  const onFinish = async (values: any) => {
    const payload = {
      name: values?.name ?? null,
      description: values?.description ?? null,
      slug: values?.slug ?? null,
      metaDescription: values?.metaDescription ?? null,
      price: values?.price != null ? Number(values?.price) : null,
      includedIds: values?.includedIds ?? null,
      originalPrice:
        values?.originalPrice != null ? Number(values?.originalPrice) : null,
      stockQuantity:
        values?.stockQuantity != null ? Number(values?.stockQuantity) : null,
      categoryIds: values?.categoryIds ?? null,
      images: values?.images ?? null,
      isHidden: values?.isHidden ?? false,
    };

    try {
      // Body gửi API (giữ lại logic cũ nếu bạn đang test mock ảnh)
      const body = {
        ...payload,
        images:
          payload.images && payload.images.length > 0
            ? payload.images
            : [
                {
                  imageUrl:
                    "https://res.cloudinary.com/dlvvc6zev/image/upload/private-tours/2022/12/keo-dua.jpg",
                  isMain: true,
                },
              ],
      };
      if (isEdit) {
        handleUpdate(body);
      } else {
        const result = await onCreateProduct(body);
        if (result?.status === 200) {
          message.success("Tạo sản phẩm thành công");
          onClose();
        } else {
          console.log("Create product failed", result);
          message.error("Tạo sản phẩm thất bại");
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Có lỗi xảy ra khi tạo sản phẩm");
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
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <AntInput placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: "Vui lòng nhập slug" }]}
                validateTrigger={["onBlur", "onSubmit"]}
              >
                <AntInput placeholder="vd: keo-dua-ben-tre" />
              </Form.Item>

              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "Vui lòng nhập Price" },
                      {
                        validator: (_, value) => {
                          if (
                            value === null ||
                            value === undefined ||
                            value === ""
                          )
                            return Promise.reject("Vui lòng nhập Price");
                          const n = Number(value);
                          return n >= 0
                            ? Promise.resolve()
                            : Promise.reject("Price phải ≥ 0");
                        },
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="0" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Original Price"
                    name="originalPrice"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Original Price",
                      },
                      {
                        validator: (_, value) => {
                          if (
                            value === null ||
                            value === undefined ||
                            value === ""
                          )
                            return Promise.reject(
                              "Vui lòng nhập Original Price"
                            );
                          const n = Number(value);
                          return n >= 0
                            ? Promise.resolve()
                            : Promise.reject("Original Price phải ≥ 0");
                        },
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="0" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Stock Quantity"
                    name="stockQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Stock Quantity",
                      },
                      {
                        validator: (_, value) => {
                          if (
                            value === null ||
                            value === undefined ||
                            value === ""
                          )
                            return Promise.reject(
                              "Vui lòng nhập Stock Quantity"
                            );
                          const n = Number(value);
                          return n >= 0
                            ? Promise.resolve()
                            : Promise.reject("Stock Quantity phải ≥ 0");
                        },
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="0" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Categories"
                name="categoryIds"
                rules={[
                  {
                    required: true,
                    type: "array",
                    message: "Vui lòng chọn ít nhất 1 Category",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        (Array.isArray(value) && value.length === 0)
                      ) {
                        return Promise.reject(
                          "Vui lòng chọn ít nhất 1 Category"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  options={categoryOptions}
                  placeholder="Chọn Categories"
                  loading={isLoadingCategory}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label="Products"
                name="includedIds"
                rules={[
                  {
                    required: true,
                    type: "array",
                    message: "Vui lòng chọn ít nhất 1 Product",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        (Array.isArray(value) && value.length === 0)
                      ) {
                        return Promise.reject(
                          "Vui lòng chọn ít nhất 1 Product"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  options={productOptions}
                  placeholder="Chọn Products"
                  loading={isLoadingProduct}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập Description" },
                ]}
              >
                <AntInput.TextArea rows={6} placeholder="Nhập mô tả sản phẩm" />
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

              {/* Images: không bắt buộc */}
              <Form.Item
                label="Image"
                name="images"
                valuePropName="images"
                trigger="onChange"
              >
                <>
                  <FileInput
                    onChange={handleFileChange}
                    className="custom-class"
                  />
                  {/* Hiển thị preview nếu có */}
                  {Array.isArray(form.getFieldValue("images")) &&
                    form.getFieldValue("images")?.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {form
                          .getFieldValue("images")
                          .map((img: any, idx: number) => (
                            <div
                              key={idx}
                              className="w-20 h-20 rounded overflow-hidden border border-gray-300"
                            >
                              <img
                                src={img.preview}
                                alt={`preview-${idx}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                </>
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

export default OrderCreateModal;
