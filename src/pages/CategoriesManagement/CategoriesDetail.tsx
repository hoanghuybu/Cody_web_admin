import { message } from "antd";
import { useEffect, useState } from "react";

import { useLoadDetailCategory } from "~/hooks/categories/useLoadDetailCategory";
import { useUpdateCategory } from "~/hooks/categories/useUpdateCategory";
import CategoriesCreateModal from "./CategoriesCreateModal";

interface ProductDetailDetailProps {
  initData: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function CategoriesDetailModal(props: ProductDetailDetailProps) {
  const { initData, isOpen, onClose } = props;
  const [shouldLoadDetail, setShouldLoadDetail] = useState(false);
  const [input, setInput] = useState({
    name: null,
    description: null,
    slug: null,
    metaDescription: null,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, onUpdateCategory, isLoading, isError } = useUpdateCategory(
    initData?.id
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: detailCate, isLoading: isLoadingDetail } =
    useLoadDetailCategory(shouldLoadDetail ? initData?.id : undefined);

  const handleSave = (value: any) => {
    onUpdateCategory(value, {
      onSuccess: () => {
        message.success("Cập nhật sản phẩm thành công");
        onClose();
      },
    });
  };

  useEffect(() => {
    if (detailCate) {
      setInput({
        name: detailCate?.name,
        description: detailCate?.metaDescription,
        slug: detailCate?.slug,
        metaDescription: detailCate?.metaDescription,
      });
    }
  }, [detailCate]);

  useEffect(() => {
    if (isOpen && initData?.id) {
      setShouldLoadDetail(true);
    }
  }, [isOpen, initData]);

  return (
    <CategoriesCreateModal
      isEdit={true}
      isLoadingUpdate={isLoading}
      handleUpdate={handleSave}
      title="Update Category"
      initialValue={input}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default CategoriesDetailModal;
