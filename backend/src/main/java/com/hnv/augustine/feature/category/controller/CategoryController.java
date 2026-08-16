package com.hnv.augustine.feature.category.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {

    @GetMapping("/admin/categories")
    public ResponseEntity<?> getDashboardCategory(
           @RequestParam Integer parentId,
           @RequestParam String keyword
    ){

    }
}
