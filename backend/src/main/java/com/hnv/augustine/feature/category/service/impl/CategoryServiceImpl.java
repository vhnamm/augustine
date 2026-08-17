package com.hnv.augustine.feature.category.service.impl;

import com.hnv.augustine.feature.category.dto.response.CategoryAdminResponse;
import com.hnv.augustine.feature.category.dto.response.CategorySearchResponse;
import com.hnv.augustine.feature.category.repository.CategoryRepository;
import com.hnv.augustine.feature.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @PreAuthorize("hasAuthority('category:manage')")
    public CategoryAdminResponse getCategoriesDashboard(Integer parentId) {

    }

    @PreAuthorize("hasAuthority('category:manage')")
    public List<CategorySearchResponse>  getSearchCategory(String keyword) {

    }
}
