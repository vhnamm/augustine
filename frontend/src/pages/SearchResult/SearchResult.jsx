import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import styles from './SearchResult.module.scss'
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import Filter from '~/components/common/Filter/Filter';
import Modal from '~/components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';


const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const[opdenModal, setOpenModal] = useState(false);
  const [animate, setAnimate] = useState(false)
  const [page, setPage] = useState(1);
  const [totalProds, setTotalProds] = useState(0);
  
  const keyword = decodeURIComponent(searchParams.get("keyword"))
  

  useEffect(() => {
    const seperatedKeyword = keyword.trim().split(" ").filter(Boolean);
    const queryString = seperatedKeyword
        .map((word) => `name_like=${word}`)
        .join("&");

    const fetchSearchResults = async () => {
      try {
        const rawRes = await fetch(`http://localhost:3000/products?${queryString}&_limit=12&_page=${page}`);
        const res = await rawRes.json();
        let total = rawRes.headers.get("X-Total-Count");

        setTotalProds(total);
        setSearchResults(res);
        console.log(rawRes);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
  }

  fetchSearchResults();
}, [keyword, page])


  function handleOpenModal(){
    setAnimate(true)
    setOpenModal(true)

  }

  function handleCloseModal(){
    setAnimate(false)
    setTimeout(() => {
      setOpenModal(false)
    } , 300);
  }

  function handleSwitchPage(index){
    
    setPage(index)
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", index);
      return params;
    });
  }
  return (
    
    <>

      {opdenModal &&
        <Modal type="left" onClose={handleCloseModal} 
          className={clsx(styles.modal_filter_wrap, {[styles.animate] : animate, [styles.close] : !animate})}
        >
          <Filter onClose ={handleCloseModal}></Filter>
        </Modal>
      }
      <div className={clsx(styles.wrapper)}>
      <div className={clsx("grid wide")}>
        

        <div className={styles.option_wrapper}>

        {searchResults.length > 0 ? <h2 className={styles.text_label}>
                  Kết quả tìm kiếm cho: <span className={styles.keyword}>{keyword}</span> <span className={styles.number_prod}>{totalProds} sản phẩm</span>
                  </h2> : 
                
                  <h2>Không tìm thấy sản phẩm nào cho: {keyword}</h2>
                }
            
          

          <div onClick={() => handleOpenModal()} className={styles.filter_wrap}>
              
              <FontAwesomeIcon icon={faFilter} className={styles.filter_icon}/>
              <span>Filter</span>
            </div>
        </div>
        <div className={clsx("row")}>
          {searchResults.map(prod => {
            return (
              <div className={clsx("col", "lg-3")} key={prod.id}>
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

        <div className={styles.pagination}>
          <Button size="small" className={styles.btn_prev} disabled = {page == 1} onClick={() => handleSwitchPage(page - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          <ul className={styles.pagination_list}>

            {Array(Math.ceil(totalProds/12)).fill().map((_ , index) => {
              
              return (
                <li key={index} className={clsx(styles.btn_switch_page, {[styles.active] : page == index+1})}
                  onClick={() => handleSwitchPage(index +1  )}
                >
                {index + 1}</li>
              )
            })}

          </ul>
          <Button size="small" className={styles.btn_next} disabled={page == Math.ceil(totalProds/12)} onClick={() => handleSwitchPage(page + 1) }>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchResult;