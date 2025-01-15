package com.example.bee.repository;


import com.example.bee.common.CommonEnum;
import com.example.bee.entity.SanPham;
import com.example.bee.model.response.SanPhamBanChayResponse;
import com.example.bee.model.response.SanPhamDetailResponse;
import com.example.bee.model.response.SanPhamFilterResponse;
import com.example.bee.model.response.SanPhamMoiNhatResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SanPhamRepository extends CrudRepository<SanPham, Long> {

    @Query("SELECT sp FROM SanPham sp LEFT JOIN ChiTietSanPham ctsp ON sp.id = ctsp.sanPham.id WHERE ctsp.id IS NULL ORDER BY sp.ngayTao DESC")
    List<SanPham> getAllSanPhamNullCTSP();

    @Query("SELECT DISTINCT obj FROM SanPham obj " +
            "INNER JOIN obj.listChiTietSanPham ctsp " +
            "LEFT JOIN obj.thuongHieu th " +
            "LEFT JOIN ctsp.loaiDe ld " +
            "LEFT JOIN ctsp.mauSac ms " +
            "LEFT JOIN ctsp.kichCo kc " +
            "WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) " +
            "AND (:thuongHieuId IS NULL OR th.id IN :thuongHieuId) " +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai) " +
            "AND (:loaiDeIds IS NULL OR ld.id IN :loaiDeIds) " +
            "AND (:mauSacIds IS NULL OR ms.id IN :mauSacIds) " +
            "AND (:kichCoIds IS NULL OR kc.id IN :kichCoIds) " +
            "AND (:minPrice IS NULL OR ctsp.giaTien >= :minPrice) " +
            "AND (:maxPrice IS NULL OR ctsp.giaTien <= :maxPrice) " +
            "ORDER BY obj.ngayTao DESC")
    Page<SanPham> findByAll(Pageable pageable,
                            @Param("searchText") String searchText,
                            @Param("thuongHieuId") List<Long> thuongHieuId,
                            @Param("trangThai") CommonEnum.TrangThaiSanPham trangThai,
                            @Param("loaiDeIds") List<Long> loaiDeIds,
                            @Param("mauSacIds") List<Long> mauSacIds,
                            @Param("kichCoIds") List<Long> kichCoIds,
                            @Param("minPrice") BigDecimal minPrice,
                            @Param("maxPrice") BigDecimal maxPrice);

    boolean existsByTen(String ten);

    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai = 'ACTIVE' ORDER BY sp.ngayTao DESC")
    List<SanPham> get5SanPhamMoiNhat();
    @Query(value = "SELECT new com.example.bee.model.response.SanPhamFilterResponse(" +
            "sp.id, " +
            "sp.ten, " +
            "MIN(cps.giaTien), " +
            "MAX(cps.giaTien), " +
            "hi.duongDan, " +
            "sp.ngayTao) " +
            "FROM SanPham sp " +
            "LEFT JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "LEFT JOIN HinhAnhSanPham hi ON sp.id = hi.sanPham.id " +
            "LEFT JOIN MauSac ms ON ms.id = cps.sanPham.id " +
            "LEFT JOIN ThuongHieu th ON th.id = sp.thuongHieu.id " +
            "LEFT JOIN LoaiDe ld on ld.id = cps.loaiDe.id " +
            "LEFT JOIN KichCo kc on kc.id = cps.kichCo.id " +
            "WHERE cps.trangThai = 'ACTIVE' " +
            "AND (" +
            "(:search IS NOT NULL AND (" +
            "sp.ten LIKE CONCAT('%', :search, '%') " +
            "OR CAST(cps.kichCo.kichCo as string)  LIKE CONCAT('%', :search, '%') " +
            "OR ld.ten LIKE CONCAT('%', :search, '%') " +
            "OR ms.ten LIKE CONCAT('%', :search, '%') " +
            "OR th.ten LIKE CONCAT('%', :search, '%')" +
            ")) " +
            "OR :search IS NULL) " +
            "AND cps.giaTien BETWEEN :minPrice AND :maxPrice " +
            "GROUP BY hi.duongDan, sp.ten, sp.id, sp.ngayTao " +
            "ORDER BY sp.ngayTao DESC", nativeQuery = false)
    Page<SanPhamFilterResponse> filterSanPham(Pageable pageable,
                                              @Param("minPrice") BigDecimal minPrice,
                                              @Param("maxPrice") BigDecimal maxPrice,
                                              @Param("search") String search);




    @Query("SELECT NEW com.example.bee.model.response.SanPhamMoiNhatResponse(sp.id, sp.ten, MIN(cps.giaTien), MAX(cps.giaTien), hi.duongDan) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "JOIN HinhAnhSanPham hi ON sp.id = hi.sanPham.id " +
            "WHERE sp.trangThai = 'ACTIVE' " +
            "AND hi.id = (SELECT MIN(hi2.id) FROM HinhAnhSanPham hi2 WHERE hi2.sanPham.id = sp.id) " +
            "GROUP BY sp.id, sp.ten, hi.duongDan " +
            "ORDER BY MAX(cps.ngayTao) DESC")
    List<SanPhamMoiNhatResponse> findAllSanPhamMoiNhat();

    @Query("SELECT NEW com.example.bee.model.response.SanPhamBanChayResponse(sp.id, sp.ten, MIN(ctsp.giaTien), MAX(ctsp2.giaTien), ha.duongDan, SUM(hdct.soLuong)) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham ctsp ON sp.id = ctsp.sanPham.id " +
            "JOIN ChiTietSanPham ctsp2 ON sp.id = ctsp2.sanPham.id " +
            "JOIN HoaDonChiTiet hdct ON ctsp.id = hdct.chiTietSanPham.id " +
            "JOIN HoaDon hd ON hdct.hoaDon.id = hd.id " +
            "JOIN HinhAnhSanPham ha ON sp.id = ha.sanPham.id " +
            "WHERE hd.trangThaiHoaDon = 'APPROVED' " +
            "AND sp.trangThai = 'ACTIVE' " +
            "AND ha.id = (SELECT MIN(hi2.id) FROM HinhAnhSanPham hi2 WHERE hi2.sanPham.id = sp.id) " +
            "AND ctsp.giaTien = (SELECT MIN(ctsp3.giaTien) FROM ChiTietSanPham ctsp3 WHERE ctsp3.sanPham.id = sp.id) " +
            "AND ctsp2.giaTien = (SELECT MAX(ctsp4.giaTien) FROM ChiTietSanPham ctsp4 WHERE ctsp4.sanPham.id = sp.id) " +
            "GROUP BY sp.id, sp.ten, ha.duongDan, sp.ngayTao " +
            "ORDER BY SUM(hdct.soLuong) DESC")
    List<SanPhamBanChayResponse> findAllSanPhamBanChay();

    @Query("SELECT NEW com.example.bee.model.response.SanPhamDetailResponse(sp.id, sp.ma, sp.ten, sp.moTa, MIN(cps.giaTien), MAX(cps.giaTien), sp.trangThai) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "WHERE sp.id = :id")
    SanPhamDetailResponse getDetailSanPham(@Param("id") Long id);

}
