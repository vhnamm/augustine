import styles from './EditAddress.module.scss';
import { Link } from 'react-router-dom';

const EditAddress = () => {
  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>

        <div className={styles.header}>
          <Link to="/profile/address-book" className={styles.backBtn}>
            &lt; Address Book
          </Link>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input type="text" placeholder="Your first name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input type="text" placeholder="Your last name" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input type="tel" placeholder="(+84) ..." />
            </div>
          </div>

          <div className={styles.threeColRow}>
            <div className={styles.inputGroup}>
              <label>City</label>
              <div className={styles.selectWrapper}>
                <select defaultValue="">
                  <option value="" disabled>Select City</option>
                  <option value="hanoi">Hanoi</option>
                  <option value="hcm">Ho Chi Minh</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>District</label>
              <div className={styles.selectWrapper}>
                <select defaultValue="">
                  <option value="" disabled>Select District</option>
                  <option value="hadong">Ha Dong</option>
                  <option value="caugiay">Cau Giay</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Commune</label>
              <div className={styles.selectWrapper}>
                <select defaultValue="">
                  <option value="" disabled>Select Commune</option>
                  <option value="phuclas">Phuc La</option>
                  <option value="yennghia">Yen Nghia</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Detailed Address (House Number, Street...)</label>
              <input type="text" placeholder="Ex: 123 Nguyen Trai..." />
            </div>
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
          <Link to ="/profile/address-book/list">
              <button className={styles.discardBtn}>Discard Changes</button>
          </Link>
          <Link to ="/profile/address-book/list">
              <button className={styles.saveBtn}>Save Changes</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EditAddress;