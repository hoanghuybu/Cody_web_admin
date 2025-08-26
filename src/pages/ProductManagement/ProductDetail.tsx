import { useEffect, useState } from "react";
import { useUpdateProduct } from "~/hooks/products/useUpdateProduct";
import { useModal } from "~/hooks/useModal";
import OrderCreateModal from "./ProductCreateModal";

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

  console.log("initData", initData);
  return (
    <OrderCreateModal
      title="Update Product"
      initialValue={input}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default ProductDetailModal;
