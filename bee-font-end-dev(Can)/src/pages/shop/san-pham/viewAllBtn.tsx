import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled component cho nút với hiệu ứng gradient di chuyển chỉ khi hover
const Button = styled.button`
background: linear-gradient(90deg, #2980b9, #2ecc71, #f39c12);
  ); /* Gradient mặc định */
  background-size: 300%; /* Tăng kích thước để tạo hiệu ứng chuyển động */
  color: white; /* Màu chữ mặc định */
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid transparent; /* Viền trong suốt */
  cursor: pointer;
  position: relative;
  overflow: hidden; /* Ẩn phần nào bị tràn ra ngoài */
  transition: color 0.3s ease; /* Hiệu ứng đổi màu chữ khi hover */

  &:hover {
    animation: gradientMove 2.5s linear infinite; /* Bắt đầu animation khi hover */
    color: black; /* Đổi màu chữ khi hover */
  }

  /* Định nghĩa animation */
  @keyframes gradientMove {
    0% {
      background-position: 100% 50%; /* Gradient bắt đầu từ trái */
    }
    100% {
      background-position: 0% 50%; /* Gradient chuyển sang phải */
    }
  }
`;

const Container = styled.div`
  display: flex; /* Sử dụng flexbox để căn giữa */
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  margin: 0; /* Loại bỏ margin mặc định của body */
`;

const ViewAllButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/san-pham"); // Chuyển hướng đến trang sản phẩm
  };

  return (
    <Container>
      <Button onClick={handleClick}>XEM TẤT CẢ SẢN PHẨM</Button>
    </Container>
  );
};

export default ViewAllButton;
