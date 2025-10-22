import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button as AButton, Dropdown, TableColumnsType, Tag } from "antd";
import { DataAccountType, Staff } from "~/type";

interface ColumnParams {
  onEdit: (staff: Staff) => void;
}

export const getColumnsStaff = ({
  onEdit,
}: ColumnParams): TableColumnsType<DataAccountType> => {
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

  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVw438n9rP50bq0h4kF4VWgxiK2Y1yaY-94SoNtXYJ5zy65UxnlSIX9TlarIH3LwT8V0&usqp=CAU"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      key: "contact",
      render: (record: DataAccountType) => (
        <div>
          <div className="text-gray-900">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "User", value: "USER" },
      ],

      render: (role: string) => (
        <Tag color={getRoleColor(role)} className="px-2 py-1 rounded-full">
          {role}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
            label: "View profile",
            onClick: () => onEdit(record),
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
