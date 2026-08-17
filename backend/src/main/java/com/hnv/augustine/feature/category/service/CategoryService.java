package com.hnv.augustine.feature.category.service;

import com.hnv.augustine.feature.category.dto.response.CategoryAdminResponse;

public interface CategoryService {
    CategoryAdminResponse getCategoriesDashboard(Integer parentId);
}
