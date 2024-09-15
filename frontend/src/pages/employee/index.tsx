import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetUsers, DeleteUsersById } from "../../services/https/index";
import { UsersInterface } from "../../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function EmployeePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id") || ""; // Ensure myId is a string

  const columns: ColumnsType<UsersInterface> = [
    {
      title: "",
      render: (record) => (
        <>
          {myId !== record.ID && (
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteUserById(record.ID)}
            />
          )}
        </>
      ),
    },
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "นามสกุล",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "วัน/เดือน/ปี เกิด",
      key: "birthday",
      render: (record) => <>{dayjs(record.birthday).format("DD/MM/YYYY")}</>,
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "เพศ",
      key: "gender",
      render: (record) => <>{record?.gender?.gender}</>,
    },
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/employee/edit/${record.ID}`)}
        >
          แก้ไขข้อมูล
        </Button>
      ),
    },
  ];

  const deleteUserById = async (id: string) => {
    try {
      let res = await DeleteUsersById(id);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        await getUsers(); // Update the user list
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการลบข้อมูล",
      });
    }
  };

  const getUsers = async () => {
    try {
      let res = await GetUsers();
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        setUsers([]);
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      setUsers([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {contextHolder}

      <Row justify="space-between" align="middle">
        <Col>
          <h2>จัดการข้อมูลพนักงาน</h2>
        </Col>

        <Col>
          <Space>
            <Link to="/employee/create" style={{ display: 'flex', alignItems: 'center', color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
              <Button type="primary" icon={<PlusOutlined />}>
              <span>สร้างข้อมูล</span>
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={users}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
}

export default EmployeePage;
