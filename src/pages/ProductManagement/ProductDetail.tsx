import { message } from "antd";
import { useEffect, useState } from "react";
import { useLoadDetailProduct } from "~/hooks/products/useLoadDetailProduct";
import { useUpdateProduct } from "~/hooks/products/useUpdateProduct";
import OrderCreateModal from "./ProductCreateModal";

interface ProductDetailDetailProps {
  initData: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function ProductDetailModal(props: ProductDetailDetailProps) {
  const { initData, isOpen, onClose } = props;
  const [shouldLoadDetail, setShouldLoadDetail] = useState(false);
  const [input, setInput] = useState({
    name: null,
    description: null,
    slug: null,
    metaDescription: null,
    price: null,
    originalPrice: null,
    stockQuantity: null,
    categoryIds: null,
    includedIds: null,
    images: null,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, onUpdateProduct, isLoading, isError } = useUpdateProduct(
    initData?.id
  );

  const { data: detailProduct, isLoading: isLoadingDetail } =
    useLoadDetailProduct(shouldLoadDetail ? initData?.id : undefined);

  const handleSave = (value: any) => {
    onUpdateProduct(value, {
      onSuccess: () => {
        message.success("Cập nhật sản phẩm thành công");
        onClose();
      },
    });
  };

  useEffect(() => {
    if (detailProduct) {
      setInput({
        name: detailProduct?.name,
        description: detailProduct?.metaDescription,
        slug: detailProduct?.slug,
        metaDescription: detailProduct?.metaDescription,
        price: detailProduct?.price,
        originalPrice: detailProduct?.price,
        stockQuantity: detailProduct?.stockQuantity,
        categoryIds: detailProduct?.categories?.map((c: any) => c?.id),
        images: detailProduct?.images,
        includedIds: detailProduct?.product?.map((c: any) => c?.id),
      });
    }
  }, [detailProduct]);

  useEffect(() => {
    if (isOpen && !!initData?.id) {
      setShouldLoadDetail(true);
    }
  }, [isOpen, initData]);

  return (
    <>
      {isLoadingDetail ? (
        <div>Loading...</div>
      ) : (
        <OrderCreateModal
          isEdit={true}
          isLoadingUpdate={isLoading}
          handleUpdate={handleSave}
          title="Update Product"
          initialValue={input}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default ProductDetailModal;
