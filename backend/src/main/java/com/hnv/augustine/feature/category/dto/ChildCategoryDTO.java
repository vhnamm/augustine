package com.hnv.augustine.feature.category.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChildCategoryDTO {
    private Integer id;
    private String name;
    private String slug;
    private Boolean hasChild;
    private Integer productCount;
    private String path;
}
