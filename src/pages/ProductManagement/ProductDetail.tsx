import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import FileInput from "~/components/form/input/FileInput";
import Input from "~/components/form/input/InputField";
import TextArea from "~/components/form/input/TextArea";
import Label from "~/components/form/Label";
import MultiSelect from "~/components/form/MultiSelect";
import Button from "~/components/ui/button/Button";
import { Modal } from "~/components/ui/modal";
import { useUpdateProduct } from "~/hooks/products/useUpdateProduct";
import { useModal } from "~/hooks/useModal";

interface ProductDetailDetailProps {
  initData: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function ProductDetailModal(props: ProductDetailDetailProps) {
  const { initData, isOpen, onClose } = props;
  const [input, setInput] = useState({
    name: null,
    description: null,
    slug: null,
    metaDescription: null,
    price: null,
    originalPrice: null,
    stockQuantity: null,
    categoryIds: null,
    images: null,
  });
  const { closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onUpdateProduct, isLoading, isError, isSuccess } = useUpdateProduct(
    initData?.id
  );

  const handleChangeInput = (value: any, key: string) => {
    const format = value?.value || value;
    setInput((pre: any) => ({
      ...pre,
      [key]: format,
    }));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...(input.images || []), ...newImages];

    handleChangeInput(updatedImages, "images");
  };

  const handleSave = () => {
    // Handle save logic here
    onUpdateProduct(input);
    if (isSuccess) {
      closeModal();
    }
  };

  useEffect(() => {
    if (initData) {
      setInput({
        name: initData?.name,
        description: initData?.metaDescription,
        slug: initData?.slug,
        metaDescription: initData?.metaDescription,
        price: initData?.price,
        originalPrice: initData?.price,
        stockQuantity: initData?.stockQuantity,
        categoryIds: initData?.categories,
        images: initData?.images,
      });
    }
  }, [initData]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11 max-h-[800px]">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Update Product
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={input?.name}
                  onChange={(e) => handleChangeInput(e.target.value, "name")}
                />
              </div>

              <div>
                <Label>Slug</Label>
                <Input
                  type="text"
                  value={input?.slug}
                  onChange={(e) => handleChangeInput(e.target.value, "slug")}
                />
              </div>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={input?.price}
                    onChange={(e) => handleChangeInput(e.target.value, "price")}
                  />
                </Col>
                <Col span={12}>
                  <Label>Original Price</Label>
                  <Input
                    type="number"
                    value={input?.originalPrice}
                    onChange={(e) =>
                      handleChangeInput(e.target.value, "originalPrice")
                    }
                  />
                </Col>
              </Row>

              <div>
                <Label>Categories</Label>
                <MultiSelect
                  options={[
                    { value: "CAT-0001", text: "CAT-0001", selected: false },
                    { value: "CAT-0002", text: "CAT-0002", selected: false },
                  ]}
                  defaultSelected={initData?.categoryIds}
                  onChange={(values) =>
                    handleChangeInput(values, "categoryIds")
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <TextArea
                  value={input?.description}
                  onChange={(value) => handleChangeInput(value, "description")}
                  rows={6}
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <TextArea
                  value={input?.metaDescription}
                  onChange={(value) =>
                    handleChangeInput(value, "metaDescription")
                  }
                  rows={6}
                />
              </div>

              <div>
                <Label>Image</Label>
                <FileInput
                  onChange={handleFileChange}
                  className="custom-class"
                />
              </div>
            </div>
            {input?.images?.length > 0 && (
              <div className="flex gap-2 mt-2">
                {input.images.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className="w-20 h-20 rounded overflow-hidden border border-gray-300"
                  >
                    <img
                      src={img.preview || img.imageUrl}
                      alt={`preview-${idx}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}
              disabled={isLoading}
            >
              {isLoading ? <LoadingOutlined /> : "Close"}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? <LoadingOutlined /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
