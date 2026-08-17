import React from "react";
import { Link } from "react-router-dom";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./OrderPlaced.module.scss";

const OrderPlaced = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <Link to="/" className={styles.backLink}>
          <span className={styles.backArrow}>&lt;</span>
          Back to Home
        </Link>
      </div>

      <div className={styles.emptyStateWrapper}>
        <div className={styles.emptyIconBox}>
          <div className={styles.bagIcon}>
            <div className={styles.bagTop}></div>
            <div className={styles.bagBody}></div>
            <div className={styles.bagHandle}></div>
          </div>
          <span className={styles.checkIcon}>
            <span className={styles.checkMark}>✓</span>
          </span>
        </div>

        <h2 className={styles.thankYouTitle}>
          Thank you for shopping at{" "}
          <span className={styles.brandName}>augustine</span>!
        </h2>

        <p className={styles.orderProcessing}>
          We are currently processing your order. You will receive a<br />
          shipping confirmation email when your order has been shipped.
        </p>

        <p className={styles.textOrderNumber}>
          Your order number <span className={styles.orderNumber}>#0126749</span>
        </p>
      </div>

      <div className={styles.suggest_container}>
        <h5 className={styles.suggest_title}>You May Also Like</h5>
        <div className={styles.suggest_list_wrap}>
          <ul className={styles.suggest_list}>
            {Array(4)
              .fill()
              .map((_, index) => {
                return (
                  <li key={index} className={styles.card_item}>
                    <Link to={`/`} className={styles.item_link}>
                      <div className={styles.item_img}>
                        <img
                          src="/assets/ao_thun_tay_xanh_sss.webp"
                          alt="anh"
                        />
                      </div>
                    </Link>

                    <div className={styles.item_bottom_wrap}>
                      <h3 className={styles["item-name"]}>
                        Áo thun Augustine kẻ sọc
                      </h3>
                      <h4 className={styles["item-price"]}>300000đ</h4>

                      <div className={styles.item_foot_wrap}>
                        <span className={styles.sold}>Sold 200</span>
                        <div>
                          <span className={styles.rating}>4.0/5</span>
                          <FontAwesomeIcon
                            icon={faStar}
                            className={styles.star}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={styles.viewAllWrapper}>
          <button className={styles.btn_allsuggest}>
            View All <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
