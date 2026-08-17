package com.hnv.augustine.feature.product.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ProductStatus {
    ACTIVE("Đang bán"),
    INACTIVE("Đã ẩn"),
    DELETED("Đã xoá");

    private String label;
}
