package com.hnv.augustine.feature.category.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryAdminResponse {
    private List<ChildCategoryDTO> items;
    private List<BreadcrumbDashboardDTO> breadcrumb;
}
