import styles from './AddressBook.module.scss';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddressBook = () => {
  const defaultAddress = {
    id: 1,
    name: 'Tâm Nguyễn',
    phone: '(+84) 0123456789',
    address: '123, Nguyen Trai Street, Ha Dong District, Ha Noi'
  };

  const otherAddresses = [
    {
      id: 2,
      name: 'Sơn Tùng M-TP',
      phone: '(+84) 0123456789',
      address: '123, Nguyen Trai Street, Ha Dong District, Ha Noi'
    },
    {
      id: 3,
      name: 'Trịnh Trần Phương Tuấn',
      phone: '(+84) 0123456789',
      address: '123, Nguyen Trai Street, Ha Dong District, Ha Noi'
    }
  ];

  return (
    <div className={styles.addressPage}>
      <div className={styles.container}>

        <div className={styles.header}>
          <Link to="/profile/overview" className={styles.backBtn}>
            <FontAwesomeIcon icon={faAngleLeft} />Overview
          </Link>
        </div>

        <div className={styles.section}>
          <Link to="/profile/address-book/edit" className={styles.addressCard}>
            <div className={styles.infoCol}>
              <h5 className={styles.name}>{defaultAddress.name}</h5>
              <p className={styles.phone}>{defaultAddress.phone}</p>
              <p className={styles.address}>{defaultAddress.address}</p>
            </div>
            <div className={styles.actionCol}>
              <span className={styles.arrow}>&gt;</span>
            </div>
          </Link>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.title}>
              Other Addresses <span className={styles.count}>({otherAddresses.length} addresses)</span>
            </h4>
            <Link to="/profile/address-book/add" className={styles.editBtn}>Edit</Link>
          </div>

          <div className={styles.list}>
            {otherAddresses.map((addr) => (
              <Link to="/profile/address-book/edit" key={addr.id} className={styles.addressCard}>
                <div className={styles.infoCol}>
                  <h5 className={styles.name}>{addr.name}</h5>
                  <p className={styles.phone}>{addr.phone}</p>
                  <p className={styles.address}>{addr.address}</p>
                </div>
                <div className={styles.actionCol}>
                  <span className={styles.arrow}>&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddressBook;