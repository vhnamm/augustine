import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from "./Category.module.scss";
import clsx from 'clsx';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Category = () => {
  const { slug, subcategorySlug, productType } = useParams();
  
  const [category, setCategory] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0)
  const [subcategoryName, setSubcategoryName] = useState("")
  const [productTypeName, setProductTypeName] = useState("")

  

  
  useEffect(() => {
    const fetchCategoryData = async () => {
      const cateRawRes = await fetch(`http://localhost:3000/categories?slug=${slug}`)
      const cateRes = await cateRawRes.json()
      

      const categoryId = cateRes[0].id
      setCategory(cateRes[0])

      const subcateRawRes = await fetch(`http://localhost:3000/subcategories?categoryId=${categoryId}`)
      const subcateRes = await subcateRawRes.json()
      setSubcategories(subcateRes)
      setLoading(false)
      console.log(subcateRes)
    };
    
    fetchCategoryData();
  }, [slug]);

  useEffect(() => {
    setActiveCategory(0);
    setSubcategoryName("");
  }, [slug]);

  

  if (loading) return <div className={clsx(styles.loading)}>Loading...</div>;
  
  

  return (
    <div className={clsx(styles.category_container, "grid wide")}>
      <aside className={styles.parent_categories}>
          <ul className={styles.subcate_wrap}>
            <li className={styles.subcate_item}
              onClick={() => {
              setActiveCategory(0)
              setSubcategoryName("")
              }}
            >
              <Link to={`/category/${slug}`} className={clsx(styles["subcate_item-name"],
                {[styles.active]:activeCategory === 0}
              )}>All</Link>
            </li>
            {
              subcategories.map((subcategory) => {
                return (<li key={subcategory.id} className={styles.subcate_item}
                    onClick={() => {
                      setActiveCategory(subcategory.id)
                      setSubcategoryName(subcategory.name)
                    }}
                >
                  <Link to={`/category/${slug}/${subcategory.slug}`} className={clsx(styles["subcate_item-name"],
                    {[styles.active] : activeCategory === subcategory.id}
                  )}>
                    {subcategory.name}
                  </Link>
                </li>)
              })
            }
          </ul>
      </aside>

      {/* Main content area */}
      <main className={clsx(styles.main_content)}>

        {/* breadcrumb */}
        <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>

            <span> <FontAwesomeIcon icon={faAngleRight} /> </span>

            {!subcategoryName ? <span className={styles.active_breadcrumb}>{category.name}</span> : 
            <Link to={`/category/${slug}`} onClick={() => {setSubcategoryName("")
              setActiveCategory(0)
            }}>{category.name}</Link>
            }
            
            {subcategoryName && (
              <>
                <span> <FontAwesomeIcon icon={faAngleRight} /> </span>
                {!productType?
                  
                  <span className={styles.active_breadcrumb}>{subcategoryName}</span>
                : 
                  <Link to={`/category/${slug}/${subcategorySlug}`}>{subcategoryName}</Link>

                }
                
              </>
            )}

            {
              productType && (
                <>
                  <span> <FontAwesomeIcon icon={faAngleRight} /> </span>
                  <span className={styles.active_breadcrumb}>{productTypeName}</span>
                </>
              )
            }
        </div>

        <Outlet context={{ category, setProductTypeName }} />
      </main>
    </div>
  );
};

export default Category;