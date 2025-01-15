package com.example.bee.controller.client;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

public class ImgurUploader {
    private static final String CLIENT_ID = "8c00806596f9a39"; // Client ID của bạn
    private static final String IMGUR_API_URL = "https://api.imgur.com/3/image";

    public static void main(String[] args) throws Exception {
        // Đọc file ảnh từ hệ thống
        File imageFile = new File("path/to/your/image.jpg"); // Đường dẫn ảnh cần tải lên
        byte[] imageBytes = new byte[(int) imageFile.length()];
        FileInputStream fileInputStream = new FileInputStream(imageFile);
        fileInputStream.read(imageBytes);

        // Chuyển ảnh thành base64
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        // Gửi yêu cầu lên Imgur
        String response = uploadImageToImgur(base64Image);

        // In kết quả trả về từ Imgur
        System.out.println("Imgur Response: " + response);
    }

    public static String uploadImageToImgur(String base64Image) throws IOException {
        // Tạo URL và kết nối HTTP
        URL url = new URL(IMGUR_API_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        // Thêm header Authorization với Client ID
        connection.setRequestProperty("Authorization", "Client-ID " + CLIENT_ID);
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        // Tạo dữ liệu form
        String data = "image=" + base64Image;

        // Gửi dữ liệu POST
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = data.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Đọc phản hồi từ Imgur
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return response.toString();
        }
    }
}

