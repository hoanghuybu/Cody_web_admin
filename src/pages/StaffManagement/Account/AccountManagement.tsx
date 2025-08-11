import {
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Select, Table, message } from "antd";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Button from "~/components/ui/button/Button";
import { getColumnsStaff } from "~/constant";
import { Staff, StaffFormData } from "~/type";
import AccountCreateModal from "./AccountCreateModal";
import AccountEditModal from "./AccountEditModal";
import ConfirmationModal from "./ConfirmationModal";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Modal states
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  // Selected staff for operations
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [pendingAction, setPendingAction] = useState<
    "activate" | "deactivate" | null
  >(null);

  // Filtered data based on search and filters
  const filteredData = useMemo(() => {
    return staffData.filter((staff) => {
      const matchesSearch =
        staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || staff.role === roleFilter;
      const matchesStatus = !statusFilter || staff.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staffData, searchTerm, roleFilter, statusFilter]);

  // Handle create staff
  const handleCreateStaff = (data: StaffFormData) => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      ...data,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setStaffData((prev) => [...prev, newStaff]);
    setCreateModalVisible(false);
  };

  // Handle edit staff
  const handleEditStaff = (id: string, data: Partial<Staff>) => {
    setStaffData((prev) =>
      prev.map((staff) => (staff.id === id ? { ...staff, ...data } : staff))
    );
    setEditModalVisible(false);
    setSelectedStaff(null);
  };

  // Handle status change
  const handleStatusChange = (
    staff: Staff,
    action: "activate" | "deactivate"
  ) => {
    setSelectedStaff(staff);
    setPendingAction(action);
    setConfirmationModalVisible(true);
  };

  // Confirm status change
  const confirmStatusChange = () => {
    if (!selectedStaff || !pendingAction) return;

    const newStatus = pendingAction === "activate" ? "Active" : "Inactive";
    setStaffData((prev) =>
      prev.map((staff) =>
        staff.id === selectedStaff.id ? { ...staff, status: newStatus } : staff
      )
    );

    message.success(`Staff member ${pendingAction}d successfully!`);
    setConfirmationModalVisible(false);
    setSelectedStaff(null);
    setPendingAction(null);
  };

  // Table columns
  const columns = getColumnsStaff({
    onEdit: (staff) => {
      setSelectedStaff(staff);
      setEditModalVisible(true);
    },
    onToggleStatus: (staff, action) => handleStatusChange(staff, action),
  });

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
              <Button
                onClick={() => setCreateModalVisible(true)}
                className="h-10 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 shadow-sm"
              >
                <PlusOutlined />
                Create New Staff
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div>
                <Select
                  placeholder="Filter by Status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  allowClear
                  size="large" // ✅ Đồng bộ chiều cao
                  className="w-full"
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} staff members`,
              className: "px-6 py-4",
            }}
            onRow={(record) => ({
              onClick: () => {
                navigate(`/staffs/${record.id}`);
              },
            })}
            className="overflow-hidden"
            rowClassName="hover:bg-gray-50 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Modals */}
      <AccountCreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateStaff}
      />

      <AccountEditModal
        visible={editModalVisible}
        staff={selectedStaff}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedStaff(null);
        }}
        onSubmit={handleEditStaff}
      />

      <ConfirmationModal
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
      />
    </div>
  );
};

export default AccountManagement;
