package com.hnv.augustine.feature.category.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategorySearchResponse {
    private Integer id;
    private String categoryName;
    private String slug;

}
