import React from "react";
import { Collapse, Typography, Divider } from "antd";
import "./FAQ.css";

const { Panel } = Collapse;
const { Title } = Typography;

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Làm thế nào để đặt hàng?",
      answer:
        "Bạn có thể đặt hàng trực tiếp trên website bằng cách chọn sản phẩm, thêm vào giỏ hàng và hoàn tất quy trình thanh toán. Nếu cần hỗ trợ, hãy liên hệ hotline của chúng tôi.",
    },
    {
      question: "Phương thức thanh toán là gì?",
      answer:
        "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng hoặc thanh toán khi nhận hàng (COD).",
    },
    {
      question: "Làm sao để kiểm soát đơn hàng của mình đã đặt ở website?",
      answer: "Đăng ký tài khoản tại website http://localhost:5173/sign-up.",
    },
    {
      question: "Làm sao để biết đơn hàng đã được xác nhận?",
      answer:
        "Sau khi quý khách đặt hàng thành công sẽ có thông báo tin nhắn xác nhận qua email.",
    },
    {
      question: "Làm thế nào để liên hệ hỗ trợ khách hàng?",
      answer:
        "Bạn có thể liên hệ với chúng tôi qua hotline 0977424983, email chuclvph24643@fpt.edu.vn .",
    },
  ];

  return (
    <div className="faq-container">
      <Title level={2} className="faq-title">
        CÂU HỎI THƯỜNG GẶP (FAQ)
      </Title>
      <Collapse accordion className="faq-collapse">
        {faqs.map((faq, index) => (
          <Panel
            header={<div className="faq-question">{faq.question}</div>}
            key={index + 1}
            className="faq-item"
          >
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
