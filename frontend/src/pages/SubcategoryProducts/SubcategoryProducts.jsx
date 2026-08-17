import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./SubcategoryProducts.module.scss";
import clsx from 'clsx';
import { faAngleLeft, faAngleRight, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/common/Button/Button';

const SubcategoryProducts = () => {
  const { subcategorySlug, productType } = useParams();
  const { category, setProductTypeName } = useOutletContext();
  const [productTypes, setProductTypes] = useState([]);
  const [active, setActive] = useState(0)

  const [products, setProducts] = useState([]);
  
  
  
  useEffect(() => {
    const fetchSubcategoryData = async () => {
      //lấy danh mục cháu từ danh mục con
      const prodTypeRawRes = await fetch(`http://localhost:3000/subcategories?slug=${subcategorySlug}&_embed=productTypes`)
      const prodTypeRes = await prodTypeRawRes.json()
      setProductTypes(prodTypeRes[0].productTypes)
      
    };
    
    fetchSubcategoryData();
  }, [subcategorySlug]);


  useEffect(() => {
    
    // nếu đang là trang sản phẩm của danh mục cháu thì return
    if(productType) return

    async function fetchSubcategoryProducts() {
      
      try {
        const rawRes = await fetch(`http://localhost:3000/subcategories?slug=${subcategorySlug}&_embed=products`)
        const res = await rawRes.json()
        setProducts(res[0].products)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSubcategoryProducts()
    
  }, [subcategorySlug, productType])

  useEffect(() => {
  

    async function fetchProductTypeProducts() {
      try {
        const rawRes = await fetch(`http://localhost:3000/productTypes?slug=${productType}&_embed=products`)
        const res = await rawRes.json()
        setProducts(res[0].products)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProductTypeProducts()
    
  }, [productType])

  function handleProductTypeClick(productTypeId, name){
    setActive(productTypeId)
    setProductTypeName(name)
  }
  return (
    <div className={clsx(styles.content_section)}>
      <div className={styles.content_header}>
        <ul className={styles.child_categories}>
          {productTypes.map((childCate) => {
            return <li 
            className={clsx(styles.child_cate_item, {[styles.active] : active == childCate.id && childCate.slug == productType})} key={childCate.id}
            onClick={() => handleProductTypeClick(childCate.id, childCate.name)}
            >
                    <Link to={`/category/${category.slug}/${subcategorySlug}/${childCate.slug}`}
                      className={styles.link}
                    >{childCate.name}</Link>
                  </li>
          })}
        </ul>

        <div className={styles.filter_wrap}>                             
            <FontAwesomeIcon icon={faFilter} className={styles.filter_icon}/>
            <span>Filter</span>
        </div>
      </div>

      <div className={styles.content_products}>
        <div className={clsx("row", styles.list_prod_wrap)}>
          {products.map(prod => {
              return (
                  <div className={clsx("col", "lg-3 md-6 sm-12")} key={prod.id}>
                      <div className={styles.card_item}>
                          <Link to={`/product/${prod.slug}`} className={styles.item_link}>
                          <div className={clsx(styles.item_img)}>
                              <img src={prod.images[0]} alt={prod.name} />
                          </div>
                          </Link>
      
                          <div className={styles.item_bottom_wrap}>
                              <h3 className={styles["item-name"]}>{prod.name}</h3>
                              <h4 className={styles["item-price"]}>{prod.price}đ</h4>
          
                              <div className={styles.item_foot_wrap}>
                                  <span className={styles.sold}>Sold {prod.soldCount}</span>
                                  <div>
                                    <span className={styles.rating}>{prod.rating}/5</span>
                                    <FontAwesomeIcon icon={faStar} className={styles.star}/>
                                  </div>
                              </div>
      
                          </div>
                      </div>
                  </div>
              )
              })}
        </div>
      </div>

      <ul className={styles.pagination}>
                <li>
                    <Button size="small" className={styles.btn_prev}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                </li>
                <li className={styles.pagin_item}>
                    1
                </li>
                <li>
                    <Button size="small" className={styles.btn_next} >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                </li>
            </ul>
    </div>
  );
};

export default SubcategoryProducts;