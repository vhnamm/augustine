package com.hnv.augustine.feature.category.mapper;

import com.hnv.augustine.feature.category.dto.response.CategorySearchResponse;
import com.hnv.augustine.feature.category.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategorySearchResponse toCategorySearchResponse(Category category);
}
