import React, { useState } from "react";
import { Modal, message, Spin } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import request, { request4s } from "~/utils/request";
interface HinhAnhModalProps {
  openModal: boolean;
  closeModal: () => void;
  fileList: any[]; // Chắc chắn rằng fileList là một mảng
  setFileList: React.Dispatch<React.SetStateAction<any[]>>; // Cập nhật fileList
}

const HinhAnhModal: React.FC<HinhAnhModalProps> = ({
  openModal,
  closeModal,
  fileList = [], // Cung cấp giá trị mặc định là một mảng rỗng
  setFileList,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // Hàm xử lý thay đổi file (Khi người dùng chọn ảnh)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // Lọc các file đã chọn và tạo URL tạm thời
      const newFileList = Array.from(files).map((file) => {
        const preview = URL.createObjectURL(file); // Tạo URL tạm thời cho file
        return {
          name: file.name,
          url: preview, // Đường dẫn tạm thời
          originFileObj: file, // Lưu file gốc
        };
      });
      setFileList([...fileList, ...newFileList]);
    }
  };

  // Hàm xem trước ảnh
  const handlePreview = (file: any) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  // Hàm đóng modal preview ảnh
  const handleCancel = () => {
    setPreviewOpen(false);
  };

  // Hàm xử lý khi nhấn "Ok" trong modal
  const okModal = async () => {
    if (fileList.length === 0) {
      message.warning("Vui lòng tải ảnh lên");
      return;
    }
    // Chỉ lưu danh sách ảnh vào bộ nhớ trong ứng dụng React (fileList)
    console.log("Danh sách ảnh đã tải lên: ", fileList);

    message.success("Thêm ảnh thành công!");
    closeModal(); // Đóng modal sau khi nhấn "Ok"
  };

  return (
    <Spin spinning={loading}>
      <Modal
        title="HÌNH ẢNH SẢN PHẨM"
        open={openModal}
        onCancel={closeModal}
        okText={
          <span>
            <PictureOutlined style={{ marginRight: 5 }} />
            THÊM ẢNH
          </span>
        }
        cancelText="Hủy"
        onOk={okModal}
        width={600}
      >
        {/* Input HTML để chọn ảnh */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple // Cho phép chọn nhiều ảnh
          style={{ marginBottom: 16 }}
        />

        {/* Hiển thị danh sách các ảnh đã chọn */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <div
                key={index}
                style={{
                  margin: "8px",
                  cursor: "pointer",
                  width: "80px",
                  height: "80px",
                  position: "relative",
                }}
                onClick={() => handlePreview(file)}
              >
                <img
                  src={file.url} // Hiển thị đường dẫn ảnh tạm thời
                  alt={file.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))
          ) : (
            <p>Chưa có ảnh nào được chọn</p> // Nếu fileList trống, hiển thị thông báo
          )}
        </div>

        {/* Modal xem trước ảnh */}
        <Modal
          width={617}
          style={{ top: 20 }}
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Modal>
    </Spin>
  );
};

export default HinhAnhModal;
