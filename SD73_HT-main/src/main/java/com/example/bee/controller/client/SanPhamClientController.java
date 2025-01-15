package com.example.bee.controller.client;

import com.example.bee.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/san-pham")
public class SanPhamClientController {
    @Autowired
    private SanPhamService service;

    @GetMapping("/ban-chay-nhat")
    public ResponseEntity<?> banChayNhat() {
        return ResponseEntity.ok(service.get5SanPhamBanChayNhat());
    }


}
