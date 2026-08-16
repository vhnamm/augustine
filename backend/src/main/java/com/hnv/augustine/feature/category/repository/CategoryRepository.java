package com.hnv.augustine.feature.category.repository;

import com.hnv.augustine.feature.category.entity.Category;
import com.hnv.augustine.feature.category.projection.CategorySummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = """
            WITH RECURSIVE child_node AS (
                 -- anchor
                SELECT id as categoryId,
                       id AS root_id,
                       category_name AS categoryName,
                       slug
                FROM categories
                WHERE (:parentId IS NULL AND parent_id IS NULL) OR parent_id = :parentId
                
                UNION ALL
                -- recursive
                SELECT c.id
                        cn.root_id
                        cn.categoryName
                        cn.slug
                FROM categories c
                JOIN child_node cn ON cn.categoryId = c.parent_id
            ) 
            SELECT cn.root_id AS categoryId
                    cn.categoryName AS categoryName
                    cn.slug AS slug
                    COUNT(p.id) AS productCount
            FROM child_node cn 
            LEFT JOIN products p ON p.category_id = cn.categoryId
            GROUP BY cn.root_id, cn.categoryName, cn.slug
            """, nativeQuery = true)
   List<CategorySummary> findChildrenWithProductCount(@Param("parentId") Integer parentId);



}
