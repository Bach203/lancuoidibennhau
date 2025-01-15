import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Divider, Row, Typography, message } from "antd";
import banner1 from "~/image/banner3.jpg";
import banner2 from "~/image/banner2.jpg";
import banner3 from "~/image/banner1.jpg";
import banner4 from "~/image/banner4.jpg";
import logo_1 from "~/image/white_on_black.png";
import Nike from "~/image/1.png";
import adidas from "~/image/2.png";
import puma from "~/image/3.png";
import mizuno from "~/image/4.png";
import kamito from "~/image/5.png";
import asics from "~/image/6.png";
import { Link } from "react-router-dom";
import request from "~/utils/request";
import { formatGiaTien } from "~/utils/formatResponse";
import ViewAllButton from "../san-pham/viewAllBtn";
import "./SPMN.css";
import "./SPBC.css";
import FAQ from "./FAQ";
import "./faq.css";
const { Title, Text } = Typography;
const { Meta } = Card;
const Home: React.FC = () => {
  const [sanPhamMoiNhat, setSanPhamMoiNhat] = useState([]);
  const [sanPhamBanChay, setSanPhamBanChay] = useState([]);
  useEffect(() => {
    // Call API sản phẩm mới nhất
    const fetchMoiNhat = async () => {
      try {
        const res = await request.get("san-pham", {
          params: {
            page: 1,
          },
        });
        setSanPhamMoiNhat(res.data.content);
        console.log(res.data.content);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu địa hình sân thất bại");
      }
    };

    // Call API Sản phẩm bán chạy nhất

    const fetchBanChayNhat = async () => {
      try {
        const res = await request.get("/san-pham", {
          params: {
            page: 1,
          },
        });
        setSanPhamBanChay(res.data.content);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu sản phẩm bán chạy nhất thất bại");
      }
    };

    fetchMoiNhat();
    fetchBanChayNhat();
  }, []);
  console.log(sanPhamMoiNhat);
  return (
    <>
      <Carousel autoplay>
        <div>
          <img src={banner1} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner2} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner3} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner4} width="100%" height="600px" />
        </div>
      </Carousel>
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        SẢN PHẨM MỚI NHẤT
      </Divider>
      <Row className="product-card-container" gutter={16}>
        {sanPhamMoiNhat.slice(0, 4).map((product) => (
          <Col key={product.id}>
            <Link
              to={`/san-pham/detail/${product.id}`}
              style={{ color: "black", margin: 0 }}
            >
              <Card
                hoverable
                className="Card"
                style={{ width: 300, marginBottom: 10, position: "relative" }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 280,
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        padding: "0px 10px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      alt="example"
                      src={product.listChiTietSanPham[0].anhUP}
                    />
                    {/* Div cho phần "CHI TIẾT SẢN PHẨM" */}
                    <div className="product-details-text">
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        CHI TIẾT SẢN PHẨM
                      </Text>
                    </div>
                  </div>
                }
              >
                {/* Khi hover, ẩn tên sản phẩm và giá tiền, chỉ hiển thị "CHI TIẾT SẢN PHẨM" */}
                <Divider style={{ margin: 0, padding: 0 }} />
                <div className="product-info">
                  <div className="product-name-price">
                    <Text style={{ textAlign: "left" }} strong>
                      {product.listChiTietSanPham[0].sanPham.ten}
                    </Text>
                    <Title level={5} style={{ color: "red", margin: 0 }}>
                      {formatGiaTien(product.listChiTietSanPham[0].giaTien)}
                    </Title>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        SẢN PHẨM BÁN CHẠY
      </Divider>
      <Row className="product-card-container" gutter={16}>
        {sanPhamBanChay.slice(0, 4).map((product) => (
          <Col key={product.id}>
            <Link
              to={`/san-pham/detail/${product.id}`}
              style={{ color: "black", margin: 0 }}
            >
              <Card
                hoverable
                className="bestSellingCard"
                style={{ width: 300, marginBottom: 10, position: "relative" }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 280,
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        padding: "0px 10px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      alt="product"
                      src={product.listChiTietSanPham[0].anhUP}
                    />
                    {/* Div cho phần "CHI TIẾT SẢN PHẨM" */}
                    <div className="product-details-text">
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        CHI TIẾT SẢN PHẨM
                      </Text>
                    </div>
                  </div>
                }
              >
                <Divider style={{ margin: 0, padding: 0 }} />
                <div className="product-info">
                  <div className="product-name-price">
                    <Text style={{ textAlign: "left" }} strong>
                      {product.listChiTietSanPham[0].sanPham.ten}
                    </Text>
                    <Title level={5} style={{ color: "red", margin: 0 }}>
                      {formatGiaTien(product.listChiTietSanPham[0].giaTien)}
                    </Title>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Row className="button-container">
        <ViewAllButton></ViewAllButton>
      </Row>
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        THƯƠNG HIỆU NỔI TIẾNG
      </Divider>
      <Row>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={Nike} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG NIKE{" "}
            </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={adidas} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG ADIDAS{" "}
            </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="http://localhost:5173/san-pham">
            <img src={puma} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG PUMA{" "}
            </span>
          </a>
        </Col>
      </Row>
      {/* // Dòng 2 */}
      <Row style={{ marginTop: 30 }}>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/#">
            <img src={mizuno} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG MIZUNO{" "}
            </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/#">
            <img src={asics} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG ASICS{" "}
            </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="http://localhost:5173/#">
            <img src={kamito} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG KAMITO{" "}
            </span>
          </a>
        </Col>
      </Row>
      <Divider style={{ margin: "20px 0", borderColor: "", borderWidth: 2 }} />
      <FAQ />
      {/* // Dòng 3 */}
      {/* <Row style={{ marginTop: 30 }}>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={grandsport} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG GRANDSPORT{" "}
            </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={xmunich} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG X MUNICH{" "}
            </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="http://localhost:5173/san-pham">
            <img src={joma} alt="" width={"100%"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              GIÀY ĐÁ BÓNG JOMA{" "}
            </span>
          </a>
        </Col>
      </Row> */}
      {/* ĐỊA HÌNH SÂN */}
      {/* <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        CHỌN GIÀY THEO ĐỊA HÌNH SÂN
      </Divider>
      <Row style={{ marginTop: 30, marginBottom: 30 }}>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={santunhien} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              SÂN CỎ TỰ NHIÊN{" "}
            </span>
          </a>
        </Col>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={sannhantao} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              SÂN CỎ NHÂN TẠO{" "}
            </span>
          </a>
        </Col>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="http://localhost:5173/san-pham">
            <img src={sanfutsal} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              SÂN FUTSAL{" "}
            </span>
          </a>
        </Col>
        <Col span={5}>
          <a href="http://localhost:5173/san-pham">
            <img src={sancat} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "#FF6600", fontWeight: "bolder" }}>
              SÂN CÁT{" "}
            </span>
          </a>
        </Col>
      </Row> */}
    </>
  );
};

export default Home;
