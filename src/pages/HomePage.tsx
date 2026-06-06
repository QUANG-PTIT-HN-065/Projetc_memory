import React from "react";
import { Layout, Card, Typography, Row, Col, Space } from "antd";
import { BookOutlined, PictureOutlined, CustomerServiceOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Sun } from "lucide-react";
import WeatherCard from "./components/WeatherCard";
import { getCurrentDateText } from "../utils/dateUlity";
import Album from "../assets/img/Bg-Album.jpg";
import Music from "../assets/img/bg-Music.jpg";
import Diary from "../assets/img/bg-Diary.jpg";
import ToDoList from "../assets/img/bg-ToDoList.jpg";
import AIChat from "./AIChat/AIChat";

const { Header, Content, Footer } = Layout;

const { Title, Text } = Typography;

interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bg: string;
  bgImg: string;
}

const HomePage: React.FC = () => {
  const today = new Date();

  const dateText = getCurrentDateText();

  const menuItems: MenuItem[] = [
    {
      title: "Nhật ký",
      description: "Lưu giữ những dòng cảm xúc mỗi ngày",
      icon: <BookOutlined style={{ fontSize: 28, color: "#fa8c16" }} />,
      href: "/journal",
      bg: "#fff7e6",
      bgImg: `url(${Diary})`,
    },
    {
      title: "Album",
      description: "Bộ sưu tập ảnh và video",
      icon: <PictureOutlined style={{ fontSize: 28, color: "#eb2f96" }} />,
      href: "/albums",
      bg: "#fff0f6",
      bgImg: `url(${Album})`,
    },
    {
      title: "Âm nhạc",
      description: "Nghe các bài hát yêu thích",
      icon: <CustomerServiceOutlined style={{ fontSize: 28, color: "#13c2c2" }} />,
      href: "/music",
      bg: "#e6fffb",
      bgImg: `url(${Music})`,
    },
    {
      title: "Công Việc hôm nay",
      description: "Công việc cần làm trong ngày",
      icon: <UnorderedListOutlined style={{ fontSize: 28, color: "#fadb14" }} />,
      href: "/ToDoList",
      bg: "#feffe6",
      bgImg: `url(${ToDoList})`,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7e6 0%, #fffbe6 40%, #e6f7ff 100%)",
        borderRadius: 32,
      }}
    >
      <Header
        style={{
          background: "transparent",
          padding: "24px 48px 0",
          height: "auto",
        }}
      >
        <Row justify="space-between" align="middle" gutter={[24, 24]}>
          <Col>
            <Space align="center" size={16}>
              <Sun size={42} color="#fadb14" />
              <div>
                <Title level={1} style={{ margin: 0, fontSize: 42 }}>
                  Memory
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  Nhật Ký Hằng Ngày
                </Text>
              </div>
            </Space>
          </Col>

          <Col>
            <WeatherCard />
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: "24px 48px" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: 32,
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            marginBottom: 32,
          }}
        >
          <Text type="secondary" style={{ textTransform: "capitalize" }}>
            {dateText}
          </Text>

            <AIChat />
        </Card>

        <Title level={3}>Khám phá</Title>

        <Row gutter={[24, 24]}>
          {menuItems.map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.title}>
              <a href={item.href} style={{ textDecoration: "none" }}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    borderRadius: 24,
                    height: "100%",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    backgroundImage: item.bgImg,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}
                  bodyStyle={{
                    padding: 24,
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: "rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {item.icon}
                  </div>

                  <Title
                    level={4}
                    style={{
                      marginBottom: 8,
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </Title>

                  <Text
                    style={{
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item.description}
                  </Text>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "transparent",
          color: "#8c8c8c",
        }}
      >
        © {today.getFullYear()} Summer Diary ☀️
      </Footer>
    </Layout>
  );
};

export default HomePage;
