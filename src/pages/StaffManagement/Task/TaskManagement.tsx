import {
  AppstoreOutlined,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useMemo, useState } from "react";
import ComponentCard from "~/components/common/ComponentCard";
import { initialStaffData, initialTaskData } from "~/dummy";
import { Staff, Task } from "~/type";
import KanbanBoard from "./KanbanBoard";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

const { Title, Text } = Typography;
const { Option } = Select;

const TaskManagement: React.FC = () => {
  // Local state management
  const [staff] = useState<Staff[]>(initialStaffData);
  const [tasks, setTasks] = useState<Task[]>(initialTaskData);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Helper functions
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || task.status === selectedStatus;
      const matchesAssignee =
        !selectedAssignee || task.assignedTo === selectedAssignee;
      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [tasks, searchTerm, selectedStatus, selectedAssignee]);

  // Add staff names to tasks
  const tasksWithNames = useMemo(() => {
    return filteredTasks.map((task) => ({
      ...task,
      assignedToName:
        staff.find((s) => s.id === task.assignedTo)?.fullName || "Unknown",
    }));
  }, [filteredTasks, staff]);

  const handleCreateTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "assignedToName">
  ) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      addTask(taskData);
      setIsCreateModalOpen(false);
      console.log("Task created successfully");
    } catch (error) {
      console.log("Failed to create task" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: Task) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      updateTask(taskData.id, taskData);
      setEditingTask(null);
      console.log("Task updated successfully");
    } catch (error) {
      console.log("Failed to update task" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    try {
      updateTaskStatus(taskId, newStatus);
      console.log("Task status updated successfully");
    } catch (error) {
      console.log("Failed to update task status" + error);
    }
  };
  const getStatusCounts = () => {
    return {
      total: tasks.length,
      new: tasks.filter((t) => t.status === "New").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div>
      <ComponentCard
        title={
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 24 }}
          >
            <Col>
              <Title level={2} style={{ margin: 0 }}>
                Task Management
              </Title>
              <Text type="secondary">
                Assign and track tasks across your team
              </Text>
            </Col>
            <Col>
              <Space>
                <Segmented
                  value={viewMode}
                  onChange={(value) => setViewMode(value as "table" | "kanban")}
                  options={[
                    { label: "Table", value: "table", icon: <TableOutlined /> },
                    {
                      label: "Kanban",
                      value: "kanban",
                      icon: <AppstoreOutlined />,
                    },
                  ]}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsCreateModalOpen(true)}
                  size="large"
                >
                  Add Task
                </Button>
              </Space>
            </Col>
          </Row>
        }
      >
        <>
          {/* Status Overview */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={6}>
              <Card size="small">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1890ff",
                    }}
                  >
                    {statusCounts.total}
                  </div>
                  <div style={{ color: "#666" }}>Total Tasks</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card size="small">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1890ff",
                    }}
                  >
                    {statusCounts.new}
                  </div>
                  <div style={{ color: "#666" }}>New</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card size="small">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#faad14",
                    }}
                  >
                    {statusCounts.inProgress}
                  </div>
                  <div style={{ color: "#666" }}>In Progress</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card size="small">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#52c41a",
                    }}
                  >
                    {statusCounts.completed}
                  </div>
                  <div style={{ color: "#666" }}>Completed</div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Filters */}
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="Search tasks by title or description..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                size="large"
              />
            </Col>
            <Col>
              <Select
                placeholder="All Status"
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: 150 }}
                size="large"
                allowClear
              >
                <Option value="New">New</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="All Assignees"
                value={selectedAssignee}
                onChange={setSelectedAssignee}
                style={{ width: 200 }}
                size="large"
                allowClear
              >
                {staff
                  .filter((s) => s.status === "Active")
                  .map((member) => (
                    <Option key={member.id} value={member.id}>
                      {member.fullName}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
        </>
      </ComponentCard>
      <div className="w-full m-1.5"></div>
      {/* Task Views */}
      {viewMode === "table" ? (
        <TaskTable tasks={tasksWithNames} onStatusChange={handleStatusChange} />
      ) : (
        <KanbanBoard
          tasks={tasksWithNames}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Create Modal */}
      <Modal
        visible={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        title="Create New Task"
        // maxWidth="lg"
      >
        <TaskForm
          staffList={staff.filter((s) => s.status === "Active")}
          onSubmit={handleCreateTask}
          isLoading={isLoading}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={!!editingTask}
        onCancel={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            staffList={staff.filter((s) => s.status === "Active")}
            initialData={editingTask}
            onSubmit={(data) => handleUpdateTask({ ...editingTask, ...data })}
            isLoading={isLoading}
            onCancel={() => setEditingTask(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default TaskManagement;
