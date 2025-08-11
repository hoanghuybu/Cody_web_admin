import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useState } from "react";
import { StaffFormData } from "~/type";

const { Option } = Select;

interface AccountCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: StaffFormData) => void;
}

const AccountCreateModal: React.FC<AccountCreateModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setFieldsValue({ password });
    message.success("Strong password generated!");
  };

  const handleSubmit = async (values: StaffFormData) => {
    setLoading(true);
    try {
      await onSubmit(values);
      form.resetFields();
      onClose();
      message.success("Staff member created successfully!");
    } catch (error) {
      message.error("Failed to create staff member" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center text-lg font-semibold text-gray-800">
          <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
          Create New Staff Member
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="create-staff-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
        requiredMark={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="fullName"
            label={<span className="text-gray-700 font-medium">Full Name</span>}
            rules={[
              { required: true, message: "Please enter full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              placeholder="Enter full name"
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={
              <span className="text-gray-700 font-medium">Phone Number</span>
            }
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^[0-9+\-\s()]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input
              placeholder="Enter phone number"
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label={
            <span className="text-gray-700 font-medium">Email Address</span>
          }
          rules={[
            { required: true, message: "Please enter email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            placeholder="Enter email address"
            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Password</span>
              <Button
                type="link"
                onClick={generatePassword}
                className="p-0 h-auto text-blue-500 hover:text-blue-600"
                icon={<KeyOutlined />}
              >
                Generate Strong Password
              </Button>
            </div>
          }
          rules={[
            { required: true, message: "Please enter password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label={
            <span className="text-gray-700 font-medium">
              Role / Permission Level
            </span>
          }
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select role" className="h-10">
            <Option value="Admin">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Admin
              </div>
            </Option>
            <Option value="Management Staff">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Management Staff
              </div>
            </Option>
            <Option value="Sales Staff">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Sales Staff
              </div>
            </Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            onClick={handleCancel}
            className="h-10 px-6 border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="h-10 px-6 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
          >
            Create Staff Member
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AccountCreateModal;
