import { DownloadOutlined } from "@ant-design/icons";
import { Table as ATable } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import ComponentCard from "~/components/common/ComponentCard";
import PageBreadcrumb from "~/components/common/PageBreadCrumb";
import Button from "~/components/ui/button/Button";
import { getColumnsCategories } from "~/constant/TableColumnsCategories";
import { useModal } from "~/hooks/useModal";
import { usePaginationQuery } from "~/hooks/usePaginationQuery";
import { FilterIcon, PlusIcon } from "~/icons";
import { endpoints } from "~/services/endpoints";
import { DataType, OnChange, Sorts } from "~/type";
import CategoriesCreateModal from "./CategoriesCreateModal";
import CategoriesDetailModal from "./CategoriesDetail";

function CategoriesManagement() {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [pagination, setPagination] = useState({
    current: 1, // AntD dùng 1-based
    pageSize: 10,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { isOpen: isOpenDetail, openModal, closeModal } = useModal();
  const [selectedData, setSelectedData] = useState(null);
  const {
    isOpen: isOpenCreate,
    openModal: openModalCreate,
    closeModal: closeModalCreate,
  } = useModal();

  // #region  hook api
  // const { data: dataProductsOld } = usePaginationProduct();
  const {
    data: dataProducts,
    total,
    isLoading,
  } = usePaginationQuery<any>(
    endpoints.categories_pagination, // endpoint
    {
      page: pagination.current - 1, // backend 0-based
      size: pagination.pageSize,
      sortBy: pagination.sortBy,
      sortDirection: pagination.sortDirection,
    }
  );
  //#endregion
  // #region Function
  const handleChange: OnChange = (paginationConfig, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
    const sortObj = Array.isArray(sorter) ? sorter[0] : sorter;
    setPagination({
      ...pagination,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      sortBy: sortObj?.field?.toString() || "createdAt",
      sortDirection: sortObj?.order === "ascend" ? "ASC" : "DESC",
    });
  };
  // #endregion
  return (
    <Fragment>
      <div>
        <PageBreadcrumb pageTitle="Category" />
        <div className="my-2">
          <ComponentCard
            title={
              <>
                <div className="w-full justify-between flex mb-2">
                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                      Categories List
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Track your store's progress to boost your sales.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                      <DownloadOutlined />
                      Export
                    </button>
                    <Button
                      onClick={openModalCreate}
                      size="sm"
                      variant="primary"
                      startIcon={<PlusIcon />}
                    >
                      Create an Product
                    </Button>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 sm:p-6">
                  <div className="w-full justify-between flex">
                    <div className="hidden lg:block">
                      <form
                        action="https://formbold.com/s/unique_form_id"
                        method="POST"
                      >
                        <div className="relative">
                          <button className="absolute -translate-y-1/2 left-4 top-1/2">
                            <svg
                              className="fill-gray-500 dark:fill-gray-400"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            placeholder="Search ..."
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border-2 border-gray-300 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-700 xl:w-[300px]"
                          />
                        </div>
                      </form>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                      <FilterIcon />
                      Filter
                    </button>
                  </div>
                </div>
              </>
            }
          >
            <ATable<DataType>
              columns={getColumnsCategories({
                filteredInfo,
                sortedInfo,
                openModal,
                handleSelectedData: setSelectedData,
              })}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: total,
                showSizeChanger: true,
              }}
              dataSource={dataProducts}
              loading={isLoading}
              onChange={handleChange}
            />
          </ComponentCard>
        </div>
      </div>
      <CategoriesDetailModal
        initData={selectedData}
        onClose={closeModal}
        isOpen={isOpenDetail}
        title="any"
      />
      <CategoriesCreateModal
        onClose={closeModalCreate}
        isOpen={isOpenCreate}
        title="Create Category"
      />
    </Fragment>
  );
}

export default CategoriesManagement;
