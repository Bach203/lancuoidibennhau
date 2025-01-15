package com.example.bee.controller.admin;

import com.example.bee.exception.BadRequestException;
import com.example.bee.model.request.create_request.CreatedSanPhamRequest;
import com.example.bee.model.request.update_request.UpdatedSanPhamRequest;
import com.example.bee.service.SanPhamService;
import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/san-pham")
public class SanPhamController {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    @Autowired
    private SanPhamService service;

    private List<Long> convertStringToList(String input) {
        if (input == null || input.isEmpty()) {
            return Collections.emptyList();  // Trả về danh sách rỗng nếu chuỗi đầu vào trống
        }
        return Arrays.stream(input.split(","))
                .map(Long::parseLong)
                .collect(Collectors.toList());
    }
    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "sortField", required = false) String sortField,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam(name = "sortOrder", defaultValue = "", required = false) String sortOrder,
            @RequestParam(name = "searchText", defaultValue = "") String searchText,
            @RequestParam(name = "listThuongHieu", defaultValue = "") List<Long> listThuongHieu,
            @RequestParam(name = "listLoaiDe", defaultValue = "") List<Long> listLoaiDe,
            @RequestParam(name = "listMauSac", defaultValue = "") List<Long> listMauSac,
            @RequestParam(name = "listKichCo", defaultValue = "")List<Long> listKichCo,
            @RequestParam(name = "trangThai", required = false) String trangThaiString
    ) {
//        List<Long> thuongHieuIds = convertStringToList(listThuongHieu);
//        List<Long> loaiDeIds = convertStringToList(listLoaiDe);
//        List<Long> kichCoIds = convertStringToList(listKichCo);
//        List<Long> mauSacIds = convertStringToList(listMauSac);
        return ResponseEntity.ok(service.getAll(page, pageSize, sortField, sortOrder, searchText, listThuongHieu, trangThaiString, listLoaiDe, listMauSac, listKichCo, minPrice, maxPrice));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody @Valid CreatedSanPhamRequest request, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMesage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMesage);
            }
            return new ResponseEntity<>(service.add(request), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    //    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody UpdatedSanPhamRequest request) {
//        return ResponseEntity.ok(service.update(id, request));
//    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody UpdatedSanPhamRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/san-pham-moi")
    public ResponseEntity<?> get5SanPhamMoiNhat() {
        return ResponseEntity.ok(service.get5SanPhamMoiNhat());
    }

    @GetMapping("/gia-tien-moi-nhat")
    public ResponseEntity<?> giaTien5SanPhamMoiNhat() {
        return ResponseEntity.ok(service.giaTien5SanPhamMoiNhat());
    }

    @GetMapping("/null-ctsp")
    public ResponseEntity<?> getSanPhamNullCTSP() {
        return ResponseEntity.ok(service.getAllSanPhamNullCTSP());
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterSanPham(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "9") Integer pageSize,
            @RequestParam(name = "sapXep",  defaultValue = "6") Integer sapXep,
            @RequestParam(name = "minPrice", defaultValue = "0") BigDecimal minPrice,
            @RequestParam(name = "maxPrice", defaultValue = "10000000")BigDecimal maxPrice,
            @RequestParam(name = "listThuongHieu", required = false) List<Long> listThuongHieu,
            @RequestParam(name = "listDiaHinhSan", required = false)List<Long> listDiaHinhSan,
            @RequestParam(name = "listLoaiDe",  required = false) List<Long> listLoaiDe,
            @RequestParam(name = "listKichCo", required = false)List<Long> listKichCo,
            @RequestParam(name = "listMauSac",  required = false) List<Long> listMauSac,
            @RequestParam(name = "search", defaultValue = "") String search
    ) {
        return ResponseEntity.ok(service.filterSanPham(page, pageSize, sapXep, minPrice, maxPrice, search));//
    }
}
