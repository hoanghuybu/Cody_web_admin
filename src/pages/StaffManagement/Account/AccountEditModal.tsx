import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Staff } from "~/type";

const { Option } = Select;

interface AccountEditModalProps {
  visible: boolean;
  staff: Staff | null;
  onClose: () => void;
  onSubmit: (id: string, data: Partial<Staff>) => void;
}

const AccountEditModal: React.FC<AccountEditModalProps> = ({
  visible,
  staff,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff && visible) {
      form.setFieldsValue({
        fullName: staff.fullName,
        email: staff.email,
        phoneNumber: staff.phoneNumber,
        role: staff.role,
      });
    }
  }, [staff, visible, form]);

  const handleSubmit = async (values: Partial<Staff>) => {
    if (!staff) return;

    setLoading(true);
    try {
      await onSubmit(staff.id, values);
      onClose();
      message.success("Staff member updated successfully!");
    } catch (error) {
      message.error("Failed to update staff member" + error);
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
          <div className="w-1 h-6 bg-orange-500 rounded mr-3"></div>
          Edit Staff Member
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
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
            className="h-10 px-6 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
          >
            Update Staff Member
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AccountEditModal;
