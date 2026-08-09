import React, { useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss'
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faMinus, faPlus, faSpinner, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd';

import Button from '../../components/common/Button/Button';
import DetailTab from './DetailTab';
import Modal from '../../components/common/Modal/Modal';

const listInfo = [
  {name: "Description", id: 1},
  {name: "Composition", id: 2},
  {name: "Reviews", id: 3},
  {name: "Delivery & Return", id: 4}

]

const Product = () => {
  const {slug} = useParams()
  
  const [product, setProduct] = useState({})
  const [variantId, setVariantId] = useState(0)
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tabId, setTabId] = useState(1)
  const [loading, setLoading] = useState(true)
  const [openSizeChart, setOpenSizeChart] = useState(false)


  useEffect(() => {
    let timeId;
    async function fetchProduct(){
      try {
        const rawRes = await fetch(`http://localhost:3000/products?slug=${slug}`)
        const res = await rawRes.json()

        setProduct(res[0])
        timeId = setTimeout(() => {
          setLoading(false)
        }, 1000)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()

    return (() => clearTimeout(timeId))
  }, [slug])
  console.log(product)

  if(loading) return <div className={styles.loading}>
    <FontAwesomeIcon icon={faSpinner} className={styles.iconLoading}/>
    <p style={{color: "#fff", fontSize: "12px", marginTop: "8px"}}>Loading...</p>
    </div>

  function handleChangeVariant(variantId) {
    setVariantId(variantId)
  }

  function handleInputQuantity(e){
    let userInput = e.target.value.trim()
    if(userInput == ""){
      setQuantity(1)
      return
    }
    setQuantity(Number(userInput))
  }

  function handleOpenToast(){
    notification.open({
      message: 'Add to cart success',
      placement: 'topRight',
      duration: 3,
      description: (
        <div className={styles.confirm_body}>
          <div className={styles.confirm_img}>
            <img src={product.variants[variantId].images[0]} alt="anh" />
          </div>

          <div className={styles.confirm_info}>
            <h4 className={styles.confirm_product_name}>
              {product.name}
            </h4>

            <span>SKU: {product.variants[variantId].sizes[size].sku}</span>

            <div className={styles.price_quan}>
              <h5>{product.price}đ</h5>
              <span style={{fontSize: "11px"}}>x{quantity}</span>
            </div>
          </div>
        </div>
      ),
      btn: <a href="/cart" className={styles.cta_viewcart}>View cart</a>,
    })
  }



  return (
       <>
       {openSizeChart && 
          <Modal onClose={() => setOpenSizeChart(false)} type="center">
              <Button onClick={() => setOpenSizeChart(false)} className={styles.btn_close_chart} primary size="small">X</Button>
              <div className={styles.size_chart_img}></div>
          </Modal>
       }
        {/* phan san pham */}
        <div className={clsx("grid wide")}>
         <div className={styles.container}>
            <div className={clsx("row large-gutter")}>
              <div className={clsx(styles.image_col, "col lg-6 md-12 sm-12")}>
                
                <div className={styles.prod_main_img}>
                  {product && <img src={product.variants[variantId].images[0]} alt="anh" />}
                </div>
              </div>

              <div className={clsx(styles.info_col, "col lg-6 md-12 sm-12")}>
                <div className={styles.info_wrap}>
                  <div className={styles.info_header}>
                    <h3 className={styles.product_name}>{product.name}</h3>
                    <FontAwesomeIcon icon={faHeart} className={styles.icon}/>
                  </div>
                  {/* SKU  + price*/}

                  <div className={styles.sku_price_wrap}>
                     <h3 className={styles.price}>{product.price + " VND"}</h3>
                    <p className={styles.product_sku}>{product.variants[variantId].sizes[size].sku}</p>

                  </div>
                  

                 

                  <div className={styles.color_wrap}>
                    <span>Color</span>
                    {/* render color */}
                    <ul className={styles.color_list}>
                        {product.variants.map((variant, index) => {
                          return <li 
                            key={variant.id} className={styles.color_item} style={{backgroundColor: `${variant.colorHex}`}}
                            onClick={() => handleChangeVariant(index)}
                          ></li>
                        })}
                    </ul>
                  </div>

                  <div className={styles.size_wrap}>
                    <div className={styles.size_header}>
                        <span>Size</span>
                        <span onClick={() => setOpenSizeChart(true)} className={styles.size_chart}>Size chart</span>
                    </div>
                    <ul className={styles.size_list}>
                      {
                        product.variants[variantId].sizes.map((sizeItem, index) => {
                          return <li className={clsx(styles.size_item, {[styles.active] : size == index})} key={index}
                            onClick={() => setSize(index)}
                          >{sizeItem.size}</li>
                        })
                      }
                    </ul>
                  </div>

                  <div className={styles.quantity_form}>
                    <p>Quantity</p>
                    <div className={styles.spinner_wrap}>
                      <Button disabled = {quantity === 1} className={styles.minus} onClick={() => setQuantity(quantity - 1)}>
                      <FontAwesomeIcon icon={faMinus} />

                      </Button>

                      
                      <input type="number"
                        className={styles.input_quan}
                        value={quantity}
                        
                        onChange={(e) => handleInputQuantity(e)}
                      />
                      <Button className={styles.plus} onClick={() => setQuantity(quantity + 1)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </div>

                  <Button primary className={clsx(styles.btn_cta)}
                    onClick={() => handleOpenToast()}
                  >Add to Bag</Button>

                    <ul className={styles.tab_container}>
                    {listInfo.map((tab) => {
                      return <li key={tab.id} onClick={() => setTabId(tab.id)}
                            className={clsx({[styles.active] : tabId == tab.id})}
                      >{tab.name}
                      
                      </li>
                    })}
                  </ul>
                  <DetailTab title={tabId} prod={product}></DetailTab>
                </div>

              </div>
            </div>
            {/* row ảnh phụ */}
            <div className={clsx("row medium-gutter", styles.sub_img_wrapper)}>
              <div className={clsx("col lg-6")}>
                <div className={styles.img_des}>
                  <p >{product.description}</p>
                </div>
                
              </div>

              {product.variants[variantId].images.map((img) => {
                return <div className={clsx("col lg-6", styles.container_col)}>
                  <div className={styles.prod_main_img}>
                    <img src={`${img}`} alt="anh" />
                  </div>
                </div>
              })}
              <div className={clsx("col lg-6")}>
                <div className={styles.img_last_des}>
                  <p >{product.shortDescription}</p>
                </div>
              </div>
            </div>

          {/* suggest product list */}
          <div className={styles.suggest_container}>
            <h5 className={styles.suggest_title}>You May Also Like</h5>
            <ul className={clsx(styles.suggest_list, "row")}>

              {Array(4).fill().map(() => {

                return(
                    <li className={clsx("col lg-3")}>
                
                      <div className={styles.card_item}>
                        <Link to={`/`} className={styles.item_link}>
                          <div className={clsx(styles.item_img)}>
                            <img src="/assets/ao_thun_tay_xanh_sss.webp" alt="anh"/>
                          </div>
                        </Link>

                        <div className={styles.item_bottom_wrap}>
                          <h3 className={styles["item-name"]}>Áo thun Augustine kẻ sọc</h3>
                          <h4 className={styles["item-price"]}>300000đ</h4>

                          <div className={styles.item_foot_wrap}>
                            <span className={styles.sold}>Sold 200</span>
                            <div>
                              <span className={styles.rating}>4.0/5</span>
                              <FontAwesomeIcon icon={faStar} className={styles.star}/>
                            </div>
                          </div>

                        </div>
                        </div>
                    </li>
                )
              })}
            </ul>

            <Button className={styles.btn_allsuggest} outlined size="medium">View All <FontAwesomeIcon icon={faArrowRight} /></Button>
          </div>
         </div>
       </div>
       </>
  );
};

export default Product;