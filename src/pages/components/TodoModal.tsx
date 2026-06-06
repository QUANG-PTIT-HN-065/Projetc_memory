import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type TodoItem from "../../Interfaces/TodoItem";

interface TodoModalProps {
  open: boolean;
  editingTodo: TodoItem | null; 
  onCancel: () => void;
  onSave: (values: Omit<TodoItem, "id" | "completed">) => void;
}

export default function TodoModal({ open, editingTodo, onCancel, onSave }: TodoModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      if (editingTodo) {
        form.setFieldsValue({
          text: editingTodo.text,
          priority: editingTodo.priority || "medium",
          deadline: editingTodo.deadline ? dayjs(editingTodo.deadline) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, editingTodo, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave({
        text: values.text,
        priority: values.priority,
        deadline: values.deadline ? values.deadline.toISOString() : undefined,
      });
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <Modal
      title={editingTodo ? "Cập nhật công việc" : "Thêm công việc mới"}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={editingTodo ? "Lưu thay đổi" : "Thêm mới"}
      cancelText="Hủy bỏ"
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="todoForm" style={{ marginTop: 16 }}>
        {/* Tên công việc */}
        <Form.Item
          name="text"
          label="Nội dung công việc"
          rules={[{ required: true, message: "Vui lòng nhập nội dung công việc!" }]}
        >
          <Input placeholder="Ví dụ: Họp Sprint Planning lúc 9h" />
        </Form.Item>

        {/* Mức độ ưu tiên */}
        <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="medium">
          <Select options={[
            { value: "low", label: "Thấp" },
            { value: "medium", label: "Trung bình" },
            { value: "high", label: "Cao" },
          ]} />
        </Form.Item>

        {/* Hạn chót */}
        <Form.Item name="deadline" label="Hạn chót (Deadline)">
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="Chọn ngày" />
        </Form.Item>
      </Form>
    </Modal>
  );
}