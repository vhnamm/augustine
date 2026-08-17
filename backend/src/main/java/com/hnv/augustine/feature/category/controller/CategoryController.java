package com.hnv.augustine.feature.category.controller;

import com.hnv.augustine.feature.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/admin/categories")
    public ResponseEntity<?> getDashboardCategory(
           @RequestParam Integer parentId
    ){

    }

    @GetMapping("/admin/categories/search")
    public ResponseEntity<?> getSearchCategory(@RequestParam String keyword){

    }
}
