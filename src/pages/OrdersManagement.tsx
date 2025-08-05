import { useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import TableCustom from "../components/tables/TableCustom/TableCustom";
import Button from "../components/ui/button/Button";
import ButtonGroupTabs from "../components/ui/button/ButtonGroupTabs";
import { PlusIcon } from "../icons";

function OrdersManagement() {
  // Overview card data
  const overviewData = [
    {
      title: "Overdue",
      value: "$120.80",
    },
    {
      title: "Due within next 30 days",
      value: "0.00",
    },
    {
      title: "Average time to get paid",
      value: "24 days",
    },
    {
      title: "Upcoming Payout",
      value: "$3,450.50",
    },
  ];
  const tabs = [
    { label: "All Invoices", value: "all" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Draft", value: "draft", disabled: false },
  ];

  const [activeTab, setActiveTab] = useState("all");
  return (
    <div>
      <PageBreadcrumb pageTitle="Orders" />
      <ComponentCard
        title={
          <div className="w-full justify-between flex">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Overview
            </h3>
            <Button size="sm" variant="primary" startIcon={<PlusIcon />}>
              Create an Invoice
            </Button>
          </div>
        }
      >
        <div className="flex w-full border border-solid border-[#e4e7ec] rounded-xl">
          {overviewData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1.5 p-5 flex-1 ${
                index < overviewData.length - 1
                  ? "border-r border-[#e4e7ec]"
                  : ""
              }`}
            >
              <div className="font-normal text-sm text-[#98a2b3] [font-family:'Outfit',Helvetica]">
                {item.title}
              </div>
              <div className="font-normal text-3xl text-[#1d2939] [font-family:'Outfit',Helvetica]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      <div className="my-2">
        <ComponentCard
          title={
            <div className="w-full justify-between flex">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Overview
              </h3>
              <div className="flex gap-3">
                <ButtonGroupTabs
                  tabs={tabs}
                  activeValue={activeTab}
                  onChange={(val) => setActiveTab(val)}
                />
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
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <svg
                      className="stroke-current fill-white dark:fill-gray-800"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.29004 5.90393H17.7067"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.7075 14.0961H2.29085"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                      />
                    </svg>
                    Filter
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    Export
                  </button>
                </div>
              </div>
            </div>
          }
          desc="List order of customer"
        >
          <TableCustom />
        </ComponentCard>
      </div>
    </div>
  );
}

export default OrdersManagement;
