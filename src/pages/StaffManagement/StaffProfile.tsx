import React from "react";

import {
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";

// SVG icon for TrophyOutlined replacement
const TrophySVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M868 160h-92v-40c0-4.4-3.6-8-8-8H256c-4.4 0-8 3.6-8 8v40h-92c-52.8 0-96 43.2-96 96v160c0 132.3 107.7 240 240 240h48v128H232c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h560c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H676V656h48c132.3 0 240-107.7 240-240V256c0-52.8-43.2-96-96-96zM716 656h-48c-4.4 0-8 3.6-8 8v128H364V664c0-4.4-3.6-8-8-8h-48c-97.2 0-176-78.8-176-176V256c0-17.7 14.3-32 32-32h92v336c0 4.4 3.6 8 8 8h400c4.4 0 8-3.6 8-8V224h92c17.7 0 32 14.3 32 32v160c0 97.2-78.8 176-176 176z" />
  </svg>
);

// SVG icon for StarOutlined replacement
const StarSVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
  </svg>
);

// SVG icon for MedalOutlined replacement
const MedalSVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
  </svg>
);

import moment from "moment";
import { Staff, Task } from "~/type";

const { Title, Text } = Typography;

// Dummy data for staff members
const dummyStaffData: Staff[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@company.com",
    phone: "+1234567890",
    role: "Admin",
    status: "Active",
    avatarUrl:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1234567891",
    role: "Management Staff",
    status: "Active",
    avatarUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "3",
    fullName: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1234567892",
    role: "Sales Staff",
    status: "Active",
    avatarUrl:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-12T11:00:00Z",
  },
];

// Dummy data for tasks
const dummyTasksData: Task[] = [
  {
    id: "1",
    title: "Update customer database",
    description:
      "Review and update customer contact information in the CRM system",
    assignedTo: "1",
    dueDate: "2025-01-25T00:00:00Z",
    status: "In Progress",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Prepare monthly sales report",
    description:
      "Compile sales data and create comprehensive monthly report for management",
    assignedTo: "1",
    dueDate: "2025-01-30T00:00:00Z",
    status: "New",
    createdAt: "2025-01-16T09:00:00Z",
    updatedAt: "2025-01-16T09:00:00Z",
  },
  {
    id: "3",
    title: "Client follow-up calls",
    description:
      "Make follow-up calls to potential clients from last week's leads",
    assignedTo: "1",
    dueDate: "2025-01-22T00:00:00Z",
    status: "Completed",
    createdAt: "2025-01-10T11:00:00Z",
    updatedAt: "2025-01-18T15:30:00Z",
  },
  {
    id: "4",
    title: "System maintenance",
    description: "Perform routine maintenance on the internal systems",
    assignedTo: "2",
    dueDate: "2025-01-28T00:00:00Z",
    status: "In Progress",
    createdAt: "2025-01-14T08:00:00Z",
    updatedAt: "2025-01-14T08:00:00Z",
  },
  {
    id: "5",
    title: "Staff training session",
    description:
      "Organize and conduct training session for new sales techniques",
    assignedTo: "1",
    dueDate: "2025-02-05T00:00:00Z",
    status: "New",
    createdAt: "2025-01-17T12:00:00Z",
    updatedAt: "2025-01-17T12:00:00Z",
  },
];

// Mock data for individual KPIs
const mockKPIData = {
  ordersProcessed: 125,
  revenueGenerated: 25000,
  avgResponseTime: 2.3,
  customerSatisfaction: 4.8,
  tasksCompleted: 89,
  onTimeDelivery: 96,
  // Additional metrics for better visualization
  monthlyGrowth: 12.5,
  customerRetention: 94,
  avgOrderValue: 200,
};

// Mock achievements data
const mockAchievements = [
  {
    id: 1,
    title: "Employee of the Month",
    description: "Outstanding performance in January 2024",
    icon: <TrophySVG />,
    color: "#faad14",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Team Player Award",
    description: "Excellent collaboration and teamwork",
    icon: <StarSVG />,
    color: "#1890ff",
    date: "2023-12-10",
  },
  {
    id: 3,
    title: "Customer Champion",
    description: "Highest customer satisfaction rating",
    icon: <MedalSVG />,
    color: "#52c41a",
    date: "2023-11-20",
  },
  {
    id: 4,
    title: "Innovation Award",
    description: "Implemented process improvement initiative",
    icon: <RiseOutlined />,
    color: "#722ed1",
    date: "2023-10-05",
  },
];

// Mock activity history
const mockActivityHistory = [
  {
    id: 1,
    title: "Completed Q4 Sales Report",
    description: "Generated comprehensive quarterly sales analysis",
    completedDate: "2024-01-18T14:30:00Z",
    status: "completed",
    type: "report",
  },
  {
    id: 2,
    title: "Client Presentation - ABC Corp",
    description: "Delivered product demo to potential client",
    completedDate: "2024-01-15T10:00:00Z",
    status: "completed",
    type: "meeting",
  },
  {
    id: 3,
    title: "Team Training Session",
    description: "Conducted new employee onboarding",
    completedDate: "2024-01-12T09:00:00Z",
    status: "completed",
    type: "training",
  },
  {
    id: 4,
    title: "System Update Implementation",
    description: "Updated CRM system with new features",
    completedDate: "2024-01-08T16:45:00Z",
    status: "completed",
    type: "technical",
  },
];

const getActivityColor = (type: string) => {
  switch (type) {
    case "report":
      return "#52c41a";
    case "meeting":
      return "#1890ff";
    case "training":
      return "#722ed1";
    case "technical":
      return "#faad14";
    case "review":
      return "#f5222d";
    default:
      return "#52c41a";
  }
};

const StaffProfile: React.FC = () => {
  // Use dummy data instead of context
  const [staff] = useState<Staff[]>(dummyStaffData);
  const [tasks] = useState<Task[]>(dummyTasksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const currentStaff = staff.find((s) => s.id === "1");
  const assignedTasks = tasks.filter((t) => t.assignedTo === "1");

  const completedTasks = assignedTasks.filter((t) => t.status === "Completed");
  const completionRate =
    assignedTasks.length > 0
      ? Math.round((completedTasks.length / assignedTasks.length) * 100)
      : 0;

  // KPI Card configurations
  const kpiCards = [
    {
      title: "Orders Processed",
      value: mockKPIData.ordersProcessed,
      target: 150,
      icon: <CheckSquareOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      color: "#1890ff",
      trend: "+12%",
      trendUp: true,
      suffix: "",
      description: "This month",
    },
    {
      title: "Revenue Generated",
      value: mockKPIData.revenueGenerated,
      target: 30000,
      icon: <DollarOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      color: "#52c41a",
      trend: "+18%",
      trendUp: true,
      prefix: "$",
      description: "Monthly total",
    },
    {
      title: "Customer Satisfaction",
      value: mockKPIData.customerSatisfaction,
      target: 5,
      icon: <HeartOutlined style={{ fontSize: 24, color: "#f5222d" }} />,
      color: "#f5222d",
      trend: "+0.4",
      trendUp: true,
      suffix: "/5.0",
      description: "Average rating",
    },
    {
      title: "Response Time",
      value: mockKPIData.avgResponseTime,
      target: 1,
      icon: <ThunderboltOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      color: "#faad14",
      trend: "-0.5h",
      trendUp: true,
      suffix: "h",
      description: "Average time",
      reverse: true, // Lower is better
    },
    {
      title: "Tasks Completed",
      value: mockKPIData.tasksCompleted,
      target: 100,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#722ed1" }} />,
      color: "#722ed1",
      trend: "+15",
      trendUp: true,
      suffix: "",
      description: "This month",
    },
    {
      title: "On-Time Delivery",
      value: mockKPIData.onTimeDelivery,
      target: 100,
      icon: <TruckOutlined style={{ fontSize: 24, color: "#13c2c2" }} />,
      color: "#13c2c2",
      trend: "+2%",
      trendUp: true,
      suffix: "%",
      description: "Delivery rate",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: {
    achievementName: string;
    description: string;
  }) => {
    console.log("Form Values:", values);
    // Call API hoặc xử lý dữ liệu ở đây
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <div>
      {/* Profile Section */}
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
            height: 120,
            margin: "-24px -24px 0 -24px",
            borderRadius: "8px 8px 0 0",
          }}
        />

        <div style={{ position: "relative", paddingTop: 24 }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Space size="large" align="start">
                <div style={{ position: "relative", marginTop: -60 }}>
                  <Avatar
                    size={96}
                    src={
                      currentStaff.avatarUrl ||
                      `https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=2`
                    }
                    style={{
                      border: "4px solid white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <Tag
                      color={
                        currentStaff.status === "Active" ? "success" : "warning"
                      }
                    >
                      {currentStaff.status}
                    </Tag>
                  </div>
                </div>

                <div>
                  <Title level={2} style={{ margin: 0 }}>
                    {currentStaff.fullName}
                  </Title>
                  <Text style={{ fontSize: 16, color: "#666" }}>
                    {currentStaff.role}
                  </Text>

                  <div style={{ marginTop: 16 }}>
                    <Space size="large" wrap>
                      <Space>
                        <MailOutlined />
                        <Text>{currentStaff.email}</Text>
                      </Space>
                      <Space>
                        <PhoneOutlined />
                        <Text>{currentStaff.phone}</Text>
                      </Space>
                      <Space>
                        <CalendarOutlined />
                        <Text>
                          Joined{" "}
                          {moment(new Date(currentStaff.createdAt)).format(
                            "MMM yyyy"
                          )}
                        </Text>
                      </Space>
                    </Space>
                  </div>
                </div>
              </Space>
            </Col>

            <Col>
              {/* REPLACED: Edit Profile -> Reward & Recognition */}
              <Button
                type="primary"
                icon={<TrophySVG />}
                onClick={handleOpenModal}
              >
                Reward &amp; Recognition
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Individual KPIs Section */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <BarChartOutlined />
                <span>Individual KPIs</span>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            {/* KPI Cards Grid */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              {kpiCards.map((kpi, index) => {
                const progress = kpi.reverse
                  ? Math.max(100 - (kpi.value / kpi.target) * 100, 0)
                  : Math.min((kpi.value / kpi.target) * 100, 100);

                const progressStatus =
                  progress >= 80
                    ? "success"
                    : progress >= 60
                    ? "normal"
                    : "exception";

                return (
                  <Col xs={24} sm={12} lg={8} key={index}>
                    <Card
                      size="small"
                      style={{
                        height: "100%",
                        borderLeft: `4px solid ${kpi.color}`,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      hoverable
                      bodyStyle={{ padding: "16px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Text
                            type="secondary"
                            style={{
                              fontSize: 12,
                              display: "block",
                              marginBottom: 4,
                            }}
                          >
                            {kpi.title}
                          </Text>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 4,
                            }}
                          >
                            <Text
                              strong
                              style={{ fontSize: 20, color: kpi.color }}
                            >
                              {kpi.prefix}
                              {typeof kpi.value === "number" && kpi.value > 1000
                                ? kpi.value.toLocaleString()
                                : kpi.value}
                              {kpi.suffix}
                            </Text>
                            <Tag
                              color={kpi.trendUp ? "success" : "error"}
                              style={{
                                fontSize: 10,
                                padding: "0 4px",
                                lineHeight: "16px",
                              }}
                            >
                              {kpi.trendUp ? "↗" : "↘"} {kpi.trend}
                            </Tag>
                          </div>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {kpi.description}
                          </Text>
                        </div>
                        <div style={{ marginLeft: 8 }}>{kpi.icon}</div>
                      </div>

                      <Tooltip
                        title={`${progress.toFixed(1)}% of target (${
                          kpi.target
                        }${kpi.suffix})`}
                      >
                        <Progress
                          percent={progress}
                          size="small"
                          status={progressStatus}
                          strokeColor={kpi.color}
                          showInfo={false}
                        />
                      </Tooltip>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>

          {/* Activity/Task History Section */}
          <Card title="Activity & Task History">
            <Timeline
              items={mockActivityHistory.map((activity) => ({
                dot: (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: getActivityColor(activity.type),
                      border: "2px solid #fff",
                      boxShadow:
                        "0 0 0 2px " + getActivityColor(activity.type) + "40",
                    }}
                  />
                ),
                children: (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 4,
                      }}
                    >
                      <Text strong style={{ fontSize: 14 }}>
                        {activity.title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {moment(new Date(activity.completedDate)).format(
                          "MMM dd, yyyy HH:mm"
                        )}
                      </Text>
                    </div>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, lineHeight: 1.4 }}
                    >
                      {activity.description}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Quick Stats */}
          <Card title="Quick Stats" style={{ marginBottom: 24 }}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Statistic
                  title="Total Tasks"
                  value={assignedTasks.length}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Completed"
                  value={completedTasks.length}
                  prefix={<TrophySVG />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Completion Rate"
                  value={completionRate}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Avg Rating"
                  value={mockKPIData.customerSatisfaction}
                  suffix="/5.0"
                  prefix={<StarSVG />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
            </Row>
          </Card>

          {/* Achievements Section */}
          <Card title="Achievements & Awards">
            <List
              dataSource={mockAchievements}
              renderItem={(achievement) => (
                <List.Item style={{ padding: "12px 0" }}>
                  <List.Item.Meta
                    avatar={
                      <Badge dot style={{ backgroundColor: achievement.color }}>
                        <Avatar
                          size="large"
                          style={{
                            backgroundColor: achievement.color,
                            color: "white",
                          }}
                          icon={achievement.icon}
                        />
                      </Badge>
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text strong style={{ fontSize: 14 }}>
                          {achievement.title}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {moment(new Date(achievement.date)).format(
                            "MMM yyyy"
                          )}
                        </Text>
                      </div>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {achievement.description}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Recent Tasks */}
          <Card title="Recent Tasks" style={{ marginTop: 24 }}>
            <List
              dataSource={assignedTasks.slice(0, 3)}
              renderItem={(task) => (
                <List.Item
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                  actions={[
                    <Tag
                      key="status"
                      color={
                        task.status === "Completed"
                          ? "success"
                          : task.status === "In Progress"
                          ? "processing"
                          : "default"
                      }
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {task.status}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor:
                            task.status === "Completed"
                              ? "#52c41a"
                              : task.status === "In Progress"
                              ? "#1890ff"
                              : "#d9d9d9",
                          marginTop: 8,
                        }}
                      />
                    }
                    title={
                      <Text
                        strong
                        style={{
                          fontSize: 14,
                          color: "#262626",
                          lineHeight: 1.4,
                        }}
                      >
                        {task.title}
                      </Text>
                    }
                    description={
                      <div style={{ marginTop: 4 }}>
                        <Text
                          type="secondary"
                          style={{
                            fontSize: 12,
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          {task.description.length > 60
                            ? task.description.substring(0, 60) + "..."
                            : task.description}
                        </Text>
                        <Space size={4}>
                          <CalendarOutlined
                            style={{ fontSize: 11, color: "#8c8c8c" }}
                          />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Due:{" "}
                            {moment(new Date(task.dueDate)).format(
                              "MMM dd, yyyy"
                            )}
                          </Text>
                        </Space>
                      </div>
                    }
                  />
                </List.Item>
              )}
              split={false}
              locale={{
                emptyText: (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "48px 24px",
                      background: "#fafafa",
                      borderRadius: 8,
                      margin: "16px 0",
                    }}
                  >
                    <CheckCircleOutlined
                      style={{
                        fontSize: 36,
                        color: "#d9d9d9",
                        marginBottom: 12,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 14,
                        color: "#8c8c8c",
                        fontWeight: 500,
                      }}
                    >
                      No recent tasks
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Tasks will appear here once assigned
                    </Text>
                  </div>
                ),
              }}
            />

            {assignedTasks.length > 3 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Button type="link" size="small">
                  View all tasks ({assignedTasks.length})
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="Reward & Recognition Form"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Achievement Name"
            name="achievementName"
            rules={[
              { required: true, message: "Please enter the achievement name" },
            ]}
          >
            <Input placeholder="Enter achievement name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffProfile;
