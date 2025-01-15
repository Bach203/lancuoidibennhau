import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { Image } from "antd";

import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";
import ModalSanPham from "./ModalSanPham";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { formatGiaTienVND } from "~/utils/formatResponse";
import HinhAnhSanPham from "~/pages/shop/gio-hang/HinhAnhSanPham";

interface DataGioHang {
  key: React.Key;
  soLuong: number;
  nguoiTao: string;
  maHoaDon: string;
  donGia: number; // Thêm giá trị đơn giá
  tongTien: number; // Thêm giá trị tổng tiền
  chiTietSanPham: {
    sanPham: {
      ten: string;
    };
    kichCo: {
      kichCo: number;
    };
    mauSac: {
      ten: string;
    };
    loaiDe: {
      ten: string;
    };
    soLuong: number; // Số lượng tồn kho
  };
}

interface TableSanPhamProps {
  id: number;
  passTotalPriceToParent: (price: number) => void;
}

const TableSanPham: React.FC<TableSanPhamProps> = ({
  id,
  passTotalPriceToParent,
}) => {
  const [dataGioHang, setDataGioHang] = useState<DataGioHang[]>([]);
  const [inputSoLuongList, setInputSoLuongList] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Text } = Typography;

  useEffect(() => {
    getDataGioHang();
  }, [id]);

  // Lấy dữ liệu giỏ hàng từ API
  const getDataGioHang = async () => {
    try {
      const response = await request.get(`hoa-don/${id}`);
      const gioHangData = response.data.hoaDonChiTietList.map((item) => ({
        ...item,
        donGia: item.chiTietSanPham.giaTien,
        tongTien: item.chiTietSanPham.giaTien * item.soLuong,
      }));
      setDataGioHang(gioHangData);
      setInputSoLuongList(gioHangData.map((item) => item.soLuong));
      setLoading(false);

      // Tính tổng tiền ban đầu khi load dữ liệu
      const totalPrice = gioHangData.reduce(
        (total, item) => total + item.tongTien,
        0
      );
      passTotalPriceToParent(totalPrice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Xử lý thay đổi số lượng sản phẩm
  const handleSoLuongChange = (index: number, newSoLuong: number) => {
    setInputSoLuongList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = newSoLuong;
      return updatedList;
    });
    if (newSoLuong > dataGioHang[index].chiTietSanPham.soLuong) {
      message.warning("Số lượng vượt quá số lượng tồn kho.");
      return;
    }
    // Cập nhật tổng tiền của sản phẩm khi thay đổi số lượng
    setDataGioHang((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].tongTien = updatedData[index].donGia * newSoLuong;
      return updatedData;
    });

    // Tính lại tổng tiền toàn bộ giỏ hàng và truyền về component cha
    const totalPrice = dataGioHang.reduce((total, item, idx) => {
      return total + (idx === index ? newSoLuong * item.donGia : item.tongTien);
    }, 0);
    passTotalPriceToParent(totalPrice);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const deleteHoaDonChiTiet = async (idHoaDonChiTiet: number) => {
    Modal.confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa sản phẩm không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await request.delete(`/hoa-don/${idHoaDonChiTiet}`);
          message.success("Đã xóa sản phẩm khỏi giỏ hàng");
          getDataGioHang();
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      },
    });
  };

  // Cấu hình các cột của bảng giỏ hàng
  const tableGioHang: ColumnsType<DataGioHang> = [
    {
      title: "#",
      dataIndex: "rowIndex",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Thông tin sản phẩm",
      dataIndex: "chiTietSanPham",
      key: "ten",
      align: "left",
      render: (chiTietSanPham) => (
        <Space direction="vertical" style={{ width: "100%" }}>
          {/* Hàng 1: Ảnh */}
          <Image
            width="140px"
            height="auto"
            src={chiTietSanPham.anhUP}
            fallback="http://localhost:8081/admin/api/file/view/fallback.jpg"
            style={{ objectFit: "contain" }} // Giữ tỷ lệ ảnh và không bị cắt
          />

          {/* Hàng 2: Nội dung chữ */}
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>{chiTietSanPham.sanPham.ten}</Text>
            <Text>{`[${chiTietSanPham.mauSac.ten} - ${chiTietSanPham.kichCo.kichCo} - ${chiTietSanPham.loaiDe.ten}]`}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      width: 60,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={record.chiTietSanPham.soLuong}
          value={inputSoLuongList[index]}
          onChange={(newSoLuong) => handleSoLuongChange(index, newSoLuong || 0)}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      render: (text) => formatGiaTienVND(text),
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      render: (text, record) => formatGiaTienVND(record.tongTien),
    },
    {
      title: "Xóa",
      dataIndex: "",
      key: "xoa",
      render: (item) => (
        <Button danger type="link" onClick={() => deleteHoaDonChiTiet(item.id)}>
          <Tooltip title="Xóa">
            <DeleteOutlined />
          </Tooltip>
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Giỏ hàng</div>
            <Row>
              <Col span={10}></Col>
              <Col span={7}></Col>
              <Col span={7}>
                <Button
                  type="primary"
                  style={{ float: "right", marginBottom: 15 }}
                  onClick={() => setIsModalVisible(true)}
                >
                  <Space>Thêm Sản phẩm</Space>
                </Button>
              </Col>
            </Row>
            <ModalSanPham
              loadData={getDataGioHang}
              idHoaDon={id}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          </>
        )}
        columns={tableGioHang}
        dataSource={dataGioHang}
        loading={loading}
      />
    </>
  );
};

export default TableSanPham;
