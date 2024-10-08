import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, DashboardOutlined, DownOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, message, Dropdown } from "antd";
import logo from "../../assets/logo.png";
import Home from "../../pages/home";
import EmployeePage from "../../pages/employee"; // เพิ่มการนำเข้าหน้า Employee
import EditEmployee from "../../pages/employee/edit";
import CreateEmployee from "../../pages/employee/create";
import ProfilePage from "../../pages/profile"; // เพิ่มเส้นทางไปหน้าโปรไฟล์
const { Header, Content, Footer } = Layout;

const FullLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      Logout();
    } else if (e.key === "profile") {
      setCurrentPage("profile");
      navigate("/profile");
    }
  };

  const userMenu = (
    <Menu
      onClick={handleMenuClick}
      style={{ 
        fontFamily: 'Kanit, sans-serif',
        backgroundColor: '#003366',
        color: '#FFD700',
        border: 'none'
      }}
    >
      <Menu.Item
        key="profile"
        style={{ 
          fontFamily: 'Kanit, sans-serif',
          color: '#FFD700',
          transition: 'background 0.3s',
          backgroundColor: 'transparent',
          borderRadius: '4px',
        }}
      >
        <UserOutlined style={{ marginRight: '8px', color: '#FFD700' }} />
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        style={{ 
          fontFamily: 'Kanit, sans-serif',
          color: '#FFD700',
          transition: 'background 0.3s',
          backgroundColor: 'transparent',
          borderRadius: '4px',
        }}
      >
        <UserOutlined style={{ marginRight: '8px', color: '#FFD700' }} />
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", fontFamily: 'Kanit, sans-serif', backgroundColor: '#003366' }}>
      {contextHolder}
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Header style={{ background: "#003366", height: "80px", padding: "0 16px", position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Left Section: Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" style={{ width: "60px", height: "auto", marginRight: "16px" }} />
            </div>
            
            {/* Right Section: Menu and User Dropdown */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[page ? page : "home"]}
                selectedKeys={[location.pathname]}
                style={{ 
                  background: "transparent", 
                  border: 'none', 
                  marginRight: '16px',
                  lineHeight: '64px',
                  fontFamily: 'Kanit, sans-serif'
                }}
              >
                <Menu.Item
                  key="/"
                  onClick={() => setCurrentPage("home")}
                  style={{ 
                    borderRadius: '4px', 
                    transition: 'background 0.3s', 
                    background: location.pathname === "/" ? "#1a2a40" : "transparent",
                    marginRight: '16px', 
                    color: '#FFD700',
                  }}
                  className="menu-item"
                >
                  <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
                    <DashboardOutlined style={{ marginRight: '8px' }} />
                    <span>Home</span>
                  </Link>
                </Menu.Item>

                {/* เพิ่มเมนู Employee */}
                <Menu.Item
                  key="/employee"
                  onClick={() => setCurrentPage("employee")}
                  style={{ 
                    borderRadius: '4px', 
                    transition: 'background 0.3s', 
                    background: location.pathname === "/employee" ? "#1a2a40" : "transparent",
                    color: '#FFD700'
                  }}
                  className="menu-item"
                >
                  <Link to="/employee" style={{ display: 'flex', alignItems: 'center', color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
                    <TeamOutlined style={{ marginRight: '8px' }} />
                    <span>Employee Management</span>
                  </Link>
                </Menu.Item>
              </Menu>
              <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                <Button
                  style={{ 
                    backgroundColor: "#003366", 
                    color: "#FFD700", 
                    border: 'none', 
                    fontFamily: 'Kanit, sans-serif',
                    borderRadius: '4px',
                    marginLeft: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    padding: '0 16px',
                    height: '40px'
                  }}
                >
                  <UserOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Layout style={{ marginTop: "48px", display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Content style={{ 
            flex: 1, 
            padding: 0,
            margin: 0,
            background: "#FFFFFF",
            minHeight: 'calc(100vh - 80px - 64px)',
            overflow: "hidden",
          }}>
            <Breadcrumb style={{ margin: "16px 0" }} />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee" element={<EmployeePage />} /> {/* เพิ่ม Route สำหรับ Employee */}
                <Route path="/employee/edit/:id" element={<EditEmployee />} />
                <Route path="/employee/create" element={<CreateEmployee />} />
                <Route path="/profile" element={<ProfilePage />} />{/* Add Profile Route */}
                
              </Routes>
            </div>
          </Content>

          <Footer style={{ textAlign: "center", background: "#003366", color: "#FFD700", height: '64px', fontFamily: 'Kanit, sans-serif' }}>
            TWN RENT CAR
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
