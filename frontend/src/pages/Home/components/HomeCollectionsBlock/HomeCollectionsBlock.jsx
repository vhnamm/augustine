import React from "react";
import clsx from "clsx";
import Card from "~/components/common/Card/Card";

import styles from "./HomeCollectionsBlock.module.scss";
import Button from "~/components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomeCollectionsBlock = ({ products, collection }) => {
  return (
    <div className={clsx(styles.collection_wrap)}>
      <Link to={`collection/${collection.slug}`} className={clsx(styles.collection_banner)}>
        <img src={collection.image} alt="banner" />
        <div className={styles.collection_banner_text}>
          <h2 className={clsx(styles["collection_banner-title"])}>
          {collection.title}
        </h2>
        <p className={clsx(styles["collection_banner-description"])}>{collection.description}</p>
        <p className={clsx(styles["collection_banner-subdescription"])}>{collection.sub_description}</p>
        </div>
      </Link>

      <div className={clsx("grid", "wide", styles.collection_item_wrap)}>
        <h2 className={styles.featuring}>FEATURING</h2>
        <div className={clsx("row", styles["item-row"], "small-gutter")}>
          {products.map((product) => {
            return (
              <Link to={`/product/${product.slug}`} className={clsx("col", "lg-3 md-6 sm-12", styles["home-item"])} key={product.id}>
                <Card  className={clsx(styles.item_in_col)}>
                  <div className={clsx(styles["collection_item-img"])}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className={clsx(styles.name_price_wrap)}>
                    <h4 className={clsx(styles.item_name)}>{product.name}</h4>
                    <h4 className={clsx(styles["collection_item-price"])}>
                      {product.price + "đ"}
                    </h4>
                    
                  </div>

                  <div className={clsx(styles.item_bottom)}>
                    <h4 className={clsx(styles.sold)}>Sold {product.soldCount}</h4>

                    <div className={clsx(styles.rating)}>
                      
                      <span>{product.rating}/5</span>
                      <FontAwesomeIcon className={clsx(styles.star)} icon={faStar} />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <Button to={`/search/?keyword=a`} outlined rounded size="large" className={clsx(styles.more_btn)}>
        Shop now <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default HomeCollectionsBlock;
