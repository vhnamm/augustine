package com.hnv.augustine.feature.product.entity;

import com.hnv.augustine.feature.category.entity.Category;
import com.hnv.augustine.feature.product.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    @Nationalized
    private String name;

    @Column(length = 100, nullable = false)
    private String slug;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(columnDefinition = "TEXT")
    @Nationalized
    private String description;

    @Column(columnDefinition = "TEXT")
    @Nationalized
    private String shortDescription;

    @Column(name = "review_count")
    @Builder.Default
    private Integer reviewCount = 0;

    @Enumerated(EnumType.ORDINAL)
    @Builder.Default
    private ProductStatus status =  ProductStatus.ACTIVE;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
