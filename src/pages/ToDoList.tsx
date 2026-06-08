import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, List, Checkbox, Typography, Space, Card, Tag, Empty, message, Spin, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TodoModal from "../pages/components/TodoModal";
import type TodoItem  from "../Interfaces/TodoItem";

// Import Firebase init (side-effect: đảm bảo app đã được khởi tạo)
import "../firebase";

// Import các hàm SDK đã được generate từ Data Connect
import { listTodoItems, createTodoItem, updateTodoItem, deleteTodoItem, toggleTodoItemCompleted } from "@dataconnect/generated";

import type { PriorityLevel } from "@dataconnect/generated";

const { Title, Text } = Typography;


export default function ToDoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Hàm tải danh sách todo từ database
  const fetchTodos = useCallback(async () => {
    try {
      const result = await listTodoItems();
      const items: TodoItem[] = result.data.todoItems.map((item) => ({
        id: item.id,
        text: item.text,
        completed: item.completed,
        priority: (item.priority as TodoItem["priority"]) ?? undefined,
        deadline: item.deadline ?? undefined,
      }));
      setTodos(items);
    } catch (error) {
      console.error("Lỗi khi tải danh sách công việc:", error);
      message.error("Không thể tải danh sách công việc!");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tải danh sách todo khi component mount (gọi bất đồng bộ để tránh setState đồng bộ trong effect)
  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [fetchTodos]);

  const handleOpenAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo: TodoItem) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Xử lý logic lưu dữ liệu từ Modal gửi về (Gộp cả Thêm và Sửa)
  const handleSaveTodo = async (values: Omit<TodoItem, "id" | "completed">) => {
    try {
      if (editingTodo) {
        // Cập nhật công việc cũ trong database
        await updateTodoItem({
          id: { id: editingTodo.id },
          text: values.text,
          priority: (values.priority as PriorityLevel) ?? null,
          deadline: values.deadline ?? null,
        });
        // Cập nhật local state
        setTodos(todos.map((t) => (t.id === editingTodo.id ? { ...t, ...values, completed: t.completed } : t)));
        message.success("Đã cập nhật công việc!");
      } else {
        // Thêm công việc mới vào database
        const response = await createTodoItem({
          text: values.text,
          completed: false,
          priority: (values.priority as PriorityLevel) ?? null,
          deadline: values.deadline ?? null,
        });

        // Thêm item mới vào local state ngay lập tức (không cần fetch lại)
        const newTodo: TodoItem = {
          id: response.data?.todoItem_insert?.id || `temp-${Date.now()}`, // Nếu API trả về ID, dùng nó, nếu không dùng temp ID
          text: values.text,
          completed: false,
          priority: values.priority,
          deadline: values.deadline,
        };

        setTodos([newTodo, ...todos]); // Thêm vào đầu danh sách
        setCurrentPage(1); // Quay lại trang 1 để thấy item mới
        message.success("Đã thêm công việc mới!");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu công việc:", error);
      message.error("Không thể lưu công việc!");
    }
  };

  const handleToggleTodo = async (id: string, currentCompleted: boolean) => {
    try {
      await toggleTodoItemCompleted({
        id: { id },
        completed: !currentCompleted,
      });
      // Cập nhật state local ngay lập tức cho UX mượt
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      message.error("Không thể cập nhật trạng thái!");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoItem({ id: { id } });
      // Cập nhật state local ngay lập tức
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);

      // Nếu trang hiện tại không còn item, chuyển về trang trước
      const newTotalPages = Math.ceil(newTodos.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      message.success("Đã xóa công việc!");
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
      message.error("Không thể xóa công việc!");
    }
  };

  const getPriorityTag = (priority?: string) => {
    switch (priority) {
      case "high":
        return <Tag color="error">Cao</Tag>;
      case "low":
        return <Tag color="default">Thấp</Tag>;
      default:
        return <Tag color="warning">Trung bình</Tag>;
    }
  };

  // Tính toán phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = todos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <div style={{ padding: "2rem",minHeight: "100vh", margin: "0 auto" ,background: "linear-gradient(135deg, #fff7e6 0%, #fffbe6 40%, #e6f7ff 100%)", }}>
      <Space style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeftOutlined /> Quay lại Trang Chủ
        </Link>
      </Space>

      <Card
        bordered={false}
        style={{ borderRadius: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}
        title={
          <Title level={2} style={{ margin: 0 }}>
            Quản Lý Công Việc
          </Title>
        }
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddModal} style={{ borderRadius: 8 }}>
            Tạo việc mới
          </Button>
        }
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        ) : todos.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có công việc nào!" />
        ) : (
          <>
            <List
              dataSource={paginatedTodos}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="edit" type="text" icon={<EditOutlined style={{ color: "#1890ff" }} />} onClick={() => handleOpenEditModal(item)} />,
                    <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTodo(item.id)} />,
                  ]}
                >
                  <div style={{ flex: 1 }}>
                    <Checkbox checked={item.completed} onChange={() => handleToggleTodo(item.id, item.completed)}>
                      <Text delete={item.completed} type={item.completed ? "secondary" : undefined} style={{ fontSize: 16 }}>
                        {item.text}
                      </Text>
                    </Checkbox>

                    <div style={{ marginTop: 6, marginLeft: 24 }}>
                      {getPriorityTag(item.priority)}
                      {item.deadline && (
                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
                          Hạn chót: {dayjs(item.deadline).format("DD/MM/YYYY")}
                        </Text>
                      )}
                    </div>
                  </div>
                </List.Item>
              )}
            />

            {/* Phân trang */}
            {totalPages > 1 && (
              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <Pagination current={currentPage} total={todos.length} pageSize={itemsPerPage} onChange={(page) => setCurrentPage(page)} showSizeChanger={false} />
              </div>
            )}
          </>
        )}
      </Card>

      {/* Gọi Modal cấu hình */}
      <TodoModal open={isModalOpen} editingTodo={editingTodo} onCancel={() => setIsModalOpen(false)} onSave={handleSaveTodo} />
    </div>
  );
}
