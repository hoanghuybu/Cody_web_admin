import {
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Staff, Task } from "~/type";

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
  staffList: Staff[];
  initialData?: Task;
  onSubmit: (
    data: Omit<Task, "id" | "createdAt" | "updatedAt" | "assignedToName">
  ) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  staffList,
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      title: values.title,
      description: values.description,
      assignedTo: values.assignedTo,
      dueDate: values.dueDate.toISOString(),
      status: initialData?.status || "New",
    });
  };

  const initialValues = initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        assignedTo: initialData.assignedTo,
        dueDate: dayjs(initialData.dueDate),
      }
    : {
        dueDate: dayjs(),
      };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      size="large"
    >
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          { required: true, message: "Please enter task title" },
          { min: 3, message: "Title must be at least 3 characters" },
        ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Enter task title"
          showCount
          maxLength={100}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter task description" },
          { min: 10, message: "Description must be at least 10 characters" },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Enter detailed task description"
          showCount
          maxLength={500}
        />
      </Form.Item>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <Form.Item
          label="Assign To"
          name="assignedTo"
          rules={[
            { required: true, message: "Please assign to a staff member" },
          ]}
        >
          <Select
            placeholder="Select staff member"
            suffixIcon={<UserOutlined />}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {staffList
              .filter((staff) => staff.status === "Active")
              .map((staff) => (
                <Option key={staff.id} value={staff.id}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={
                        staff.avatarUrl ||
                        `https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=2`
                      }
                      alt={staff.name}
                      style={{ width: 20, height: 20, borderRadius: "50%" }}
                    />
                    <span>{staff.name}</span>
                    <span style={{ color: "#8c8c8c", fontSize: "12px" }}>
                      ({staff.role})
                    </span>
                  </div>
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select due date" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            suffixIcon={<CalendarOutlined />}
            placeholder="Select due date"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          paddingTop: "24px",
          borderTop: "1px solid #f0f0f0",
          marginTop: "24px",
        }}
      >
        <Button size="large" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;
