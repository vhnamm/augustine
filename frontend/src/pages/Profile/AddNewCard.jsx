import React from 'react';
import styles from './AddNewCard.module.scss';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddNewCard = () => {
  const cardTypes = [
    {
      id: 'visa',
      name: 'VISA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png'
    },
    {
      id: 'jcb',
      name: 'JCB',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png'
    },
    {
      id: 'amex',
      name: 'American Express',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png'
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png'
    }
  ];

  return (
    <div className={styles.addCardPage}>
      <div className={styles.container}>

        <div className={styles.header}>
          <Link to="/profile/payment/payment-method" className={styles.backBtn}>
            <FontAwesomeIcon icon={faAngleLeft} />Add New Card
          </Link>
        </div>

        <h4 className={styles.sectionTitle}>Select A Card</h4>

        <div className={styles.cardGrid}>
          {cardTypes.map((card) => (
            <Link 
              to="/profile/payment/addNewCard/cardDetails" 
              key={card.id}
              className={styles.cardOption} 
            >
              <div className={styles.logoBox}>
                <img src={card.logo} alt={card.name} />
              </div>
              
              <span className={styles.cardName}>{card.name}</span>
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <Link to="/profile/payment/payment-method">
            <button className={styles.returnBtn}>Return</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AddNewCard;