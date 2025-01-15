package com.example.bee.model.response;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SqlResultSetMapping(
        name = "ThongKeSanPhamHotResponse",
        classes = {
                @ConstructorResult(
                        targetClass = ThongKeSanPhamHotResponse.class,
                        columns = {
                                @ColumnResult(name = "id",type = Long.class),
                                @ColumnResult(name = "tenSanPham",type = String.class),
                                @ColumnResult(name = "doanhThu",type = BigDecimal.class)
                        }
                )
        }
)
public class ThongKeSanPhamHotResponse {
    private Long id;

    private String tenSanPham;

    private BigDecimal doanhThu;
}
