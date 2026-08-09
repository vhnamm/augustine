import React from 'react';
import clsx from 'clsx';
import styles from './SummerCollection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SummerCollection = () => {
  return (
    <div className={styles.container}>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
            <span className={styles.subTitle}>SUMMER ESCAPE '25</span>
            <h1 className={styles.mainTitle}>Endless Summer</h1>
            <p className={styles.description}>
              Hòa mình vào bản giao hưởng của sóng biển và ánh nắng. <br/>
              Những thiết kế phóng khoáng dành riêng cho những tâm hồn tự do và những chuyến đi bất tận.
            </p>
        </div>

        <div className={styles.scrollDown}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>

      <div className={styles.introSection}>
        <h2>CHASING THE SUN</h2>
        <p>
          Mùa hè không chỉ là một mùa trong năm, đó là một trạng thái của tâm trí. 
          Bộ sưu tập Hè 2025 lấy cảm hứng từ những bờ biển Địa Trung Hải rực rỡ. 
          Chất liệu Linen tự nhiên, lụa mỏng nhẹ và những đường cắt xẻ táo bạo 
          sẽ giải phóng cơ thể bạn khỏi sự gò bó, mang lại cảm giác mát lạnh 
          tựa như làn gió biển mơn man trên da thịt.
        </p>
      </div>

      <div className={styles.zigzagSection}>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow1)}></div>
        </div>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow2)}></div>
            <div className={styles.textItem}>
                <h2>The Resort Wear</h2>
                <p>
                  Định nghĩa lại phong cách nghỉ dưỡng với những chiếc đầm Maxi bay bổng 
                  và Kaftan họa tiết nhiệt đới. Sự pha trộn giữa màu trắng tinh khôi của cát 
                  và xanh thẳm của đại dương tạo nên vẻ ngoài thanh lịch nhưng vẫn đầy sức sống. 
                  Hoàn hảo cho những buổi tiệc cocktail bên hồ bơi hay dạo bước trên bãi biển hoàng hôn.
                </p>
            </div>
        </div>

        <div className={clsx(styles.row, styles.reverse)}>
            <div className={clsx(styles.imageItem, styles.imageRow3)}></div>
            <div className={styles.textItem}>
                <h2>Swim & Silhouette</h2>
                <p>
                  Tôn vinh đường cong cơ thể với dòng đồ bơi thiết kế cao cấp. 
                  Những đường cắt High-cut táo bạo thập niên 90s quay trở lại, 
                  kết hợp cùng chi tiết khoét eo tinh tế. 
                  Chất liệu vải bơi co giãn 4 chiều, chống tia UV, vừa bảo vệ làn da, 
                  vừa giúp bạn tỏa sáng rực rỡ dưới ánh mặt trời.
                </p>
            </div>
        </div>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow4)}></div>
            <div className={styles.textItem}>
                <h2>Sun-Soaked Details</h2>
                <p>
                  Hoàn thiện vẻ ngoài với những phụ kiện đậm chất hè. 
                  Mũ cói rộng vành (Straw Hat) che chắn khuôn mặt kiêu kỳ, 
                  kết hợp cùng túi Tote đan thủ công và kính râm mắt mèo cổ điển. 
                  Những chi tiết nhỏ nhưng đắt giá, nâng tầm trang phục của bạn lên một đẳng cấp mới.
                </p>
            </div>
        </div>

      </div>

      <div className={styles.centerSection}>
          <div className={clsx(styles.imageBox, styles.imageCenter)}></div>
          
          <div className={styles.textBox}>
              <h2>Linen Luxe</h2>
              <p>
                Sự xa xỉ đến từ sự giản đơn. Những set đồ Linen (vải lanh) nguyên bản 
                với tông màu Beige, Kem và Xanh Olive. 
                Thoáng khí, thấm hút mồ hôi và mang lại vẻ ngoài "effortless chic" (đẹp không gắng gượng). 
                Lựa chọn tối thượng cho những ngày hè oi ả nơi đô thị.
              </p>
          </div>
      </div>

      <Link to ="/category/for-him" className={styles.banner}>
         <div className={styles.bannerContent}>
             <h2>DIVE IN</h2>
             <div className={styles.arrowRight}>
                 <FontAwesomeIcon icon={faArrowRight} />
             </div>
         </div>
      </Link>
      
    </div>
  );
};

export default SummerCollection;