package com.hnv.augustine.feature.category.repository;

import com.hnv.augustine.feature.category.entity.Category;
import com.hnv.augustine.feature.category.projection.CategoryBreadcrumb;
import com.hnv.augustine.feature.category.projection.CategorySummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = """
            WITH RECURSIVE child_node AS (
                 -- anchor
                SELECT id AS category_id,
                       id AS root_id,
                       category_name AS category_name,
                       slug AS root_slug
                FROM categories
                WHERE (:parentId IS NULL AND parent_id IS NULL) OR parent_id = :parentId
                
                UNION ALL
                -- recursive
                SELECT c.id,
                        cn.root_id,
                        cn.category_name,
                        cn.root_slug
                FROM categories c
                JOIN child_node cn ON cn.category_id = c.parent_id
            ) 
            SELECT cn.root_id AS categoryId
                    , cn.category_name AS categoryName
                    , cn.root_slug AS slug
                    , COUNT(p.id) AS productCount
            FROM child_node cn 
            LEFT JOIN products p ON p.category_id = cn.category_id
            GROUP BY cn.root_id, cn.category_name, cn.root_slug
            """, nativeQuery = true)
   List<CategorySummary> findChildrenWithProductCount(@Param("parentId") Integer parentId);

    @Query(value = """
            WITH RECURSIVE breadcrumb AS (
                SELECT id, parent_id, category_name, slug, 0 AS depth
                FROM categories
                WHERE id = :categoryId

                UNION ALL

                SELECT parent.id, parent.parent_id, parent.category_name, parent.slug, breadcrumb.depth + 1
                FROM categories parent
                JOIN breadcrumb ON breadcrumb.parent_id = parent.id
            )
            SELECT id AS categoryId,
                   category_name AS categoryName,
                   slug
            FROM breadcrumb
            ORDER BY depth DESC
            """, nativeQuery = true)
    List<CategoryBreadcrumb> findBreadcrumbByCategoryId(@Param("categoryId") Integer categoryId);

    List<Category> findByCategoryNameIgnoreCase(String categoryName);

}
