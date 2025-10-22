/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Select, Table } from "antd";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getColumnsStaff } from "~/constant";
import { useDebounce } from "~/hooks/useDebounce";
import { usePaginationQuery } from "~/hooks/usePaginationQuery";
import { endpoints } from "~/services/endpoints";
import { DataAccountType, Staff } from "~/type";

const { Option } = Select;

// Mock data for demonstration
const mockStaffData: Staff[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john.smith@company.com",
    phoneNumber: "+1 (555) 123-4567",
    role: "Admin",
    status: "Active",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phoneNumber: "+1 (555) 234-5678",
    role: "Management Staff",
    status: "Active",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-19",
  },
  {
    id: "3",
    fullName: "Mike Wilson",
    email: "mike.wilson@company.com",
    phoneNumber: "+1 (555) 345-6789",
    role: "Sales Staff",
    status: "Inactive",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-15",
  },
  {
    id: "4",
    fullName: "Emily Davis",
    email: "emily.davis@company.com",
    phoneNumber: "+1 (555) 456-7890",
    role: "Sales Staff",
    status: "Active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-18",
  },
];

const AccountManagement: React.FC = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState<Staff[]>(mockStaffData);
  const [pagination, setPagination] = useState({
    current: 1, // AntD dùng 1-based
    pageSize: 10,
    sortBy: "createdAt",
    sortDirection: "DESC",
    categoryId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce<string>(searchTerm, 500);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Modal states
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<any> | SorterResult<any>[]
  >({} as SorterResult<any>);

  // Selected staff for operations
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Filtered data based on search and filters
  const {
    data: dataAccounts,
    total,
    isLoading,
  } = usePaginationQuery<any>(endpoints.account_pagination, {
    page: pagination.current - 1,
    size: pagination.pageSize,
    sortBy: pagination.sortBy,
    sortDirection: pagination.sortDirection,
    // role: pagination.categoryId,
    keyword: debouncedSearch,
  });

  const handleChange = (
    paginationConfig: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataAccountType> | SorterResult<DataAccountType>[]
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    const sortObj = Array.isArray(sorter) ? sorter[0] : sorter;
    setPagination({
      ...pagination,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      sortBy: sortObj?.field?.toString() || "createdAt",
      sortDirection: sortObj?.order === "ascend" ? "ASC" : "DESC",
    });
  };

  // Table columns
  const columns = getColumnsStaff({
    onEdit: (staff) => {
      navigate(`/staffs/${staff.id}`);
    },
  });

  console.log(dataAccounts);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-1 h-8 bg-blue-500 rounded mr-4"></div>
                  Staff Account Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage employee accounts, roles, and permissions
                </p>
              </div>
              {/* <Button
                onClick={() => setCreateModalVisible(true)}
                className="h-10 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 shadow-sm"
              >
                <PlusOutlined />
                Create New Staff
              </Button> */}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  prefix={<SearchOutlined className="text-gray-400 " />}
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="large" // ✅ Đồng bộ chiều cao
                />
              </div>
              <div>
                <Select
                  placeholder="Filter by Role"
                  value={roleFilter}
                  onChange={setRoleFilter}
                  allowClear
                  size="large" // ✅ Đồng bộ chiều cao
                  className="w-full"
                  suffixIcon={<FilterOutlined size={10} />}
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="Management Staff">Management Staff</Option>
                  <Option value="Sales Staff">Sales Staff</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Table<DataAccountType>
            columns={columns}
            dataSource={dataAccounts}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: total,
              showSizeChanger: true,
              className: "px-6 py-4",
            }}
            loading={isLoading}
            rowClassName="hover:bg-gray-50 transition-colors duration-200"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Modals */}
      {/* <AccountCreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateStaff}
      /> */}

      {/* <AccountEditModal
        visible={editModalVisible}
        staff={selectedStaff}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedStaff(null);
        }}
        onSubmit={handleEditStaff}
      /> */}

      {/* <ConfirmationModal
        visible={confirmationModalVisible}
        title={`${
          pendingAction === "activate" ? "Activate" : "Deactivate"
        } Staff Member`}
        content={`Are you sure you want to ${pendingAction} ${
          selectedStaff?.fullName
        }? ${
          pendingAction === "deactivate"
            ? "They will lose access to the system."
            : "They will regain access to the system."
        }`}
        onConfirm={confirmStatusChange}
        onCancel={() => {
          setConfirmationModalVisible(false);
          setSelectedStaff(null);
          setPendingAction(null);
        }}
        confirmText={pendingAction === "activate" ? "Activate" : "Deactivate"}
        type={pendingAction === "deactivate" ? "warning" : "danger"}
      /> */}
    </div>
  );
};

export default AccountManagement;
