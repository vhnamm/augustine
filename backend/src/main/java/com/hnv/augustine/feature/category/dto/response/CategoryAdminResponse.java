package com.hnv.augustine.feature.category.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hnv.augustine.feature.category.dto.BreadcrumbDashboardDTO;
import com.hnv.augustine.feature.category.dto.ChildCategoryDTO;
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
