import React from 'react';
import styles from './AdminHeader.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = () => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.search_form}>
        <button className={styles.btn_search}><FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon_search}/></button>
        <input type="text" placeholder='Search for products, order...'/>
      </form>

      <div className={styles.header_right_wrap}>
        <span>
            <FontAwesomeIcon className={styles.icon_bell} icon={faBell} />
        </span>

        <div className={styles.user_wrap}>
            <div className={styles.ava}></div>

            <div className={styles.name_wrap}>
                <p className={styles.user_name}>Tâm Nguyễn</p>
                <p className={styles.role}>Admin</p>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;