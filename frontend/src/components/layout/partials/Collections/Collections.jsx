import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./Collections.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popper from "~/components/common/Popper/Popper";
import { Link } from "react-router-dom";
const Collections = ({className}) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const rawRes = await fetch("http://localhost:3000/collections");
        const res = await rawRes.json();
        setCollections(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCollections();
  }, []);

  return (
    <div className={clsx( className,styles.collections_wrap)}>
      <h2>Collections</h2>

      <Popper className={clsx(styles.collections_dropdown)}>
        <ul className={clsx(styles.collections_options)}>
          {collections.map((collection) => {
            return (
              <li className={clsx(styles.option_item)} key={collection.id}>
                <Link className={clsx(styles.link)} to={`/collection/${collection.slug}`}>
                  {collection.name}

                  <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
                </Link>               
              </li>
            );
          })}
        </ul>
      </Popper>
    </div>
  );
};

export default Collections;
