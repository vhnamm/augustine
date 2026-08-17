import React from 'react';
import clsx from 'clsx';
import styles from './AutumnCollection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AutumnCollection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
            <span className={styles.subTitle}>FALL WINTER '25</span>
            <h1 className={styles.mainTitle}>The Golden Hour</h1>
            <p className={styles.description}>
              Khoảnh khắc giao mùa tuyệt đẹp được dệt nên từ những gam màu đất nung, <br/>
              cam cháy và chất liệu da lộn cổ điển.
            </p>
        </div>
        <div className={styles.scrollDown}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>

      <div className={styles.introSection}>
        <h2>THE NOSTALGIA OF AUTUMN</h2>
        <p>
          Khi những chiếc lá bắt đầu chuyển màu cũng là lúc tủ đồ cần sự thay đổi. 
          Bộ sưu tập Mùa Thu 2025 mang đậm hơi thở Retro thập niên 70s. 
          Sự kết hợp giữa áo Trench Coat dáng suông, len vặn thừng và bốt da cao cổ 
          tạo nên vẻ ngoài phóng khoáng, lãng mạn như những thước phim điện ảnh cũ.
        </p>
      </div>

      <div className={styles.zigzagSection}>
        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow1)}></div>
        </div>
        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow2)}></div>
            <div className={styles.textItem}>
                <h2>The Classic Trench</h2>
                <p>
                  Biểu tượng bất hủ của mùa thu. Chiếc áo Trench Coat màu Beige 
                  với chất liệu Gabardine chống thấm nhẹ. 
                  Phom dáng Oversize hiện đại giúp bạn dễ dàng khoác ngoài mọi trang phục, 
                  từ váy lụa mỏng manh đến những bộ suit dày dặn.
                </p>
            </div>
        </div>
        <div className={clsx(styles.row, styles.reverse)}>
            <div className={clsx(styles.imageItem, styles.imageRow3)}></div>
            <div className={styles.textItem}>
                <h2>Cozy Knits</h2>
                <p>
                  Những chiếc áo len vặn thừng (Cable Knit) dày dặn với tông màu nâu hạt dẻ (Chestnut) 
                  và cam đất (Terracotta). Cảm giác mềm mại, ấm áp ôm lấy cơ thể 
                  trong những buổi chiều thu se lạnh.
                </p>
            </div>
        </div>
        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow4)}></div>
            <div className={styles.textItem}>
                <h2>Suede & Leather</h2>
                <p>
                  Chất liệu da lộn (Suede) mềm mại và da bóng (Leather) cá tính 
                  tạo nên sự tương phản thú vị. Chân váy midi da nâu phối cùng bốt cao cổ 
                  là công thức hoàn hảo cho vẻ ngoài thanh lịch mà vẫn đầy khí chất.
                </p>
            </div>
        </div>

      </div>
      <div className={styles.centerSection}>
          <div className={clsx(styles.imageBox, styles.imageCenter)}></div>
          
          <div className={styles.textBox}>
              <h2>Vintage Blazer</h2>
              <p>
                Chiếc Blazer kẻ sọc (Check Blazer) mang âm hưởng học đường (Dark Academia). 
                Đường cắt may chuẩn xác cùng chi tiết khuy đồng cổ điển 
                tôn lên vẻ đẹp tri thức và sự tinh tế trong từng đường nét.
              </p>
          </div>
      </div>
      <Link to ="/category/for-him" className={styles.banner}>
         <div className={styles.bannerContent}>
             <h2>FALL IN LOVE</h2>
             <div className={styles.arrowRight}>
                 <FontAwesomeIcon icon={faArrowRight} />
             </div>
         </div>
      </Link>
      
    </div>
  );
};

export default AutumnCollection;