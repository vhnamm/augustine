import React from 'react';
import styles from './PaymentMethod.module.scss';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PaymentMethod = () => {
  return (
    <div className={styles.paymentPage}>
      <div className={styles.container}>

        <div className={styles.header}>
          <Link to="/profile/overview" className={styles.backBtn}>
            <FontAwesomeIcon icon={faAngleLeft} />Overview
          </Link>
        </div>

        <div className={styles.sectionHeader}>
          <h4 className={styles.title}>Your Cards (1 card)</h4>
          <button className={styles.editBtn}>Edit</button>
        </div>

        <Link to ="/profile/payment/editCard/cardDetails" className={styles.cardList}>

          <div className={styles.paymentCard}>
            <div className={styles.cardLeft}>
              <div className={styles.cardLogo}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                />
              </div>

              <div className={styles.cardInfo}>
                <h5 className={styles.cardName}>Mastercard</h5>
                <span className={styles.status}>Đã xác minh</span>
                <p className={styles.cardNumber}>**** **** **12 3456</p>
              </div>
            </div>

            <div className={styles.cardRight}>
              <span className={styles.arrow}>&gt;</span>
            </div>
          </div>

        </Link>

        <div className={styles.actionArea}>
          <Link to="/profile/payment/addNewCard" className={styles.newCardBtn}>+ New Card</Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentMethod;