import React from 'react';
import styles from './CardDetails.module.scss';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardDetails = () => {
  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>

        <div className={styles.header}>

          <Link to="/profile/payment/payment-method" className={styles.backBtn}>
            <FontAwesomeIcon icon={faAngleLeft} />Payment Method
          </Link>
        </div>

        <div className={styles.formCard}>

          <div className={styles.inputGroup}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="Enter name on card" />
          </div>

          <div className={styles.inputGroup}>
            <label>Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" />
          </div>

          <div className={styles.twoColRow}>
            <div className={styles.inputGroup}>
              <label>Expiration Date</label>
              <div className={styles.selectWrapper}>
                <select defaultValue="">
                  <option value="" disabled>MM/YY</option>
                  <option value="01/25">01/25</option>
                  <option value="02/25">02/25</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>CVC</label>
              <input type="text" placeholder="123" maxLength="3" />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Card Billing Address</label>
            <input type="text" placeholder="Enter billing address" />
          </div>
          <div className={styles.checkboxRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Make Default Address
            </label>
          </div>

        </div>
        <div className={styles.actions}>
          <Link to="/profile/payment/payment-method">
            <button className={styles.discardBtn}>Discard Changes</button>
          </Link>
          <Link to ="/profile/payment/payment-method">
            <button className={styles.saveBtn}>Save Changes</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CardDetails;