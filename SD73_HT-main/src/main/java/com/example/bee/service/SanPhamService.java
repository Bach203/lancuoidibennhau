package com.example.bee.service;

import com.example.bee.model.request.create_request.CreatedSanPhamRequest;
import com.example.bee.model.request.update_request.UpdatedSanPhamRequest;
import com.example.bee.model.response.*;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamService {

    Page<SanPhamResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText,
                                 List<Long> listThuongHieu, String trangThaiString, List<Long> listLoaiDe, List<Long> listMauSac, List<Long> listKichCo, BigDecimal minPrice, BigDecimal maxPrice);

    List<SanPhamResponse> getAllSanPhamNullCTSP();

    SanPhamResponse add(CreatedSanPhamRequest request);

    SanPhamResponse update(Long id, UpdatedSanPhamRequest request);

    void delete(Long id);

    SanPhamResponse findById(Long id);

    Page<SanPhamFilterResponse> filterSanPham(
            Integer page,
            Integer pageSize,
            Integer sapXep,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String search
    );

    List<SanPhamResponse> get5SanPhamMoiNhat();

    List<SanPhamMoiNhatResponse> giaTien5SanPhamMoiNhat();

    List<SanPhamBanChayResponse> get5SanPhamBanChayNhat();

    SanPhamDetailResponse getSanPhamDetail(Long id);

}
