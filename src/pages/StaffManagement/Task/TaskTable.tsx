import {
  CalendarOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import React from "react";
import { Task } from "~/type";

const { Text } = Typography;

interface TaskTableProps {
  tasks: (Task & { assignedToName?: string })[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onStatusChange }) => {
  const getBadgeColor = (status: Task["status"]) => {
    switch (status) {
      case "New":
        return "blue";
      case "In Progress":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "default";
    }
  };

  const getDueDateColor = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "red";
    if (diffDays <= 3) return "orange";
    return "default";
  };

  const getStatusMenuItems = (task: Task): MenuProps["items"] => {
    return (["New", "In Progress", "Completed"] as const).map((status) => ({
      key: status,
      label: status,
      disabled: task.status === status,
      onClick: () => onStatusChange(task.id, status),
    }));
  };

  const columns: ColumnsType<Task & { assignedToName?: string }> = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.title}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      key: "assignedTo",
      render: (name) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => (
        <Space>
          <CalendarOutlined style={{ color: "#8c8c8c" }} />
          <Tag color={getDueDateColor(dueDate)}>
            {moment(new Date(dueDate)).format("MMM dd, yyyy")}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getBadgeColor(status)}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getStatusMenuItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />}>
            Change Status
          </Button>
        </Dropdown>
      ),
    },
  ];

  if (tasks.length === 0) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <CalendarOutlined
            style={{ fontSize: 48, color: "#d9d9d9", marginBottom: 16 }}
          />
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
            No tasks found
          </div>
          <Text type="secondary">Get started by creating a new task.</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} tasks`,
        }}
        size="middle"
      />
    </Card>
  );
};

export default TaskTable;
