import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from "./CategoryProducts.module.scss";
import clsx from 'clsx';
import { faAngleDown, faAngleLeft, faAngleRight, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/common/Modal/Modal';
import Filter from '../../components/common/Filter/Filter'
import Button from '../../components/common/Button/Button';


const CategoryProducts = () => {

    const {category} = useOutletContext()
    const [productsByGender, setProductsByGender] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        async function fetchProducts(){
            try {
                const rawRes = await fetch(`http://localhost:3000/products?categoryId=${category.id}`)
                const res = await rawRes.json()
                setProductsByGender(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()
    }, [category.id])

    function handleOpenFilter(){
        setOpenModal(true)
        setAnimate(true)
    }
    function handleCloseFilter(){
        setAnimate(false)

        setTimeout(() => {
            setOpenModal(false)
        }, 300)
        
    }
    return(
        <>
        {openModal && (
            <Modal type="left" onClose={handleCloseFilter} className={clsx(styles.modal_filter_wrap ,{[styles.animate]:animate, [styles.close] : !animate} )}>
                <Filter gender={false} onClose={handleCloseFilter}></Filter>
            </Modal>
        )}
        <div className={styles.gender_outlet_wapper}>
            <div className={styles.action_wrapper}>
                <div className={styles.order_by}>
            
                    <span>Price</span>
                    <FontAwesomeIcon icon={faAngleDown} className={styles.angle_down}/>
                </div>


                <div className={styles.filter_wrap} onClick={() => handleOpenFilter()}>                             
                    <FontAwesomeIcon icon={faFilter} className={styles.filter_icon}/>
                    <span>Filter</span>
                </div>

                
            </div>

            <div className={clsx("row", styles.products_list)}>
                {productsByGender.map(prod => {
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
        </>
    )
};

export default CategoryProducts;