import {
  EditOutlined,
  MoreOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button as AButton, Dropdown, Tag } from "antd";
import { Staff } from "~/type";

interface ColumnParams {
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staff: Staff, action: "activate" | "deactivate") => void;
}

export const getColumnsStaff = ({ onEdit, onToggleStatus }: ColumnParams) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "red";
      case "Management Staff":
        return "orange";
      case "Sales Staff":
        return "green";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "green" : "default";
  };

  return [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: Staff, b: Staff) => a.fullName.localeCompare(b.fullName),
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">DOB: 08/03/2002</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      key: "contact",
      render: (record: Staff) => (
        <div>
          <div className="text-gray-900">{record.email}</div>
          <div className="text-sm text-gray-500">{record.phoneNumber}</div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Management Staff", value: "Management Staff" },
        { text: "Sales Staff", value: "Sales Staff" },
      ],
      onFilter: (value: string, record: Staff) => record.role === value,
      render: (role: string) => (
        <Tag color={getRoleColor(role)} className="px-2 py-1 rounded-full">
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value: string, record: Staff) => record.status === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="px-2 py-1 rounded-full">
          {status}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: Staff, b: Staff) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Staff) => {
        const menuItems = [
          {
            key: "edit",
            icon: <EditOutlined />,
            label: "Edit Staff",
            onClick: () => onEdit(record),
          },
          {
            key: "status",
            icon:
              record.status === "Active" ? (
                <UserDeleteOutlined />
              ) : (
                <UserAddOutlined />
              ),
            label: record.status === "Active" ? "Deactivate" : "Activate",
            onClick: () =>
              onToggleStatus(
                record,
                record.status === "Active" ? "deactivate" : "activate"
              ),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <AButton
              type="text"
              icon={<MoreOutlined />}
              className="hover:bg-gray-100"
            />
          </Dropdown>
        );
      },
    },
  ];
};
