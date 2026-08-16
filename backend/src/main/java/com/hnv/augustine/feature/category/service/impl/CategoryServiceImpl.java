package com.hnv.augustine.feature.category.service.impl;

import com.hnv.augustine.feature.category.dto.CategoryAdminResponse;
import com.hnv.augustine.feature.category.service.CategoryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class CategoryServiceImpl implements CategoryService {

    @PreAuthorize("hasAuthority('category:manage')")
    public CategoryAdminResponse getCategoriesDashboard(Integer parentId, String search) {
        //neu co thi trar ra cac danh muc theo keyword, ko theo tree drilldown
        if(StringUtils.hasLength(search)){

        }

    }
}
