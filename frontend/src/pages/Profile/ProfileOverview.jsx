import styles from './ProfileOverview.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const ProfileOverview = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <img 
              src="/assets/Profile/494459034_24045947711679416_562608663695031876_n.jpg" 
              alt="User Avatar" 
            />
          </div>
          <h2 className={styles.userName}>Tâm Nguyễn</h2>
          <button className={styles.editBtn}>Edit Profile</button>
        </div>
        <div className={styles.profileActions}>
          <Link to="/profile/my-orders" className={styles.actionCard}>
            <FontAwesomeIcon icon={faBagShopping} className={styles.cardIcon}/>
            <span>My Orders</span>
          </Link>
          <Link to="/profile/address-book" className={styles.actionCard}>
            <FontAwesomeIcon icon={faLocationDot}  className={styles.cardIcon} />
            <span>Address Book</span>
          </Link>
          <Link to="/profile/payment/payment-method" className={styles.actionCard}>
            <FontAwesomeIcon icon={faCreditCard} className={styles.cardIcon}/>
            Payment Method
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;