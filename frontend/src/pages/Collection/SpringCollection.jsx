import React from 'react';
import clsx from 'clsx';
import styles from './SpringCollection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SpringCollection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
            <span className={styles.subTitle}>NEW ARRIVALS</span>
            <h1 className={styles.mainTitle}>Spring Awakening '25</h1>
            <p className={styles.description}>
              Đánh thức vẻ đẹp tiềm ẩn với những thiết kế lụa là mềm mại, <br/>
              kết hợp cùng bảng màu pastel thanh lịch để khởi đầu một mùa xuân rạng rỡ.
            </p>
        </div>

        <div className={styles.scrollDown}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className={styles.introSection}>
        <h2>THE SPRING AWAKENING '25</h2>
        <p>
          Đón chào mùa mới với những thiết kế tôn vinh sự tự do và nét thanh lịch đương đại. 
          Chúng tôi tin rằng thời trang không chỉ là trang phục, mà là ngôn ngữ của cảm xúc. 
          Chất liệu lụa satin mềm mại, linen thoáng khí cùng bảng màu pastel nhẹ nhàng sẽ đánh thức 
          vẻ đẹp rạng rỡ nhất của bạn, mang lại nguồn năng lượng tươi mới cho những ngày đầu năm.
        </p>
      </div>

      <div className={styles.zigzagSection}>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow1)}></div>
        </div>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow2)}></div>
            <div className={styles.textItem}>
                <h2>The Linen Edit</h2>
                <p>
                  Khám phá vẻ đẹp mộc mạc nhưng đầy khí chất của dòng vải Linen tự nhiên. 
                  Những chiếc váy được thêu tay tỉ mỉ với họa tiết hoa cỏ mùa xuân, 
                  mang lại cảm giác thoáng mát tuyệt đối cho những ngày nắng nhẹ. 
                  Một sự lựa chọn hoàn hảo để dạo phố, kết hợp sự thoải mái với vẻ ngoài sang trọng, không gắng gượng.
                </p>
            </div>
        </div>
        <div className={clsx(styles.row, styles.reverse)}>
            <div className={clsx(styles.imageItem, styles.imageRow3)}></div>
            <div className={styles.textItem}>
                <h2>Soft Tailoring</h2>
                <p>
                  Phá vỡ quy tắc cứng nhắc của trang phục công sở truyền thống. 
                  Bộ sưu tập suit mùa này mang phom dáng oversize phóng khoáng, 
                  kết hợp cùng tông màu trung tính ấm áp. 
                  Chất vải nhẹ tênh giúp bạn thoải mái di chuyển linh hoạt từ văn phòng đến những buổi tiệc tối 
                  mà vẫn giữ được thần thái chuyên nghiệp và đầy quyền lực.
                </p>
            </div>
        </div>
        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow4)}></div>
            <div className={styles.textItem}>
                <h2>Evening Breeze</h2>
                <p>
                  Lấy cảm hứng từ những cơn gió đêm mát lành, thiết kế đầm lụa satin (Silk Satin) 
                  ôm nhẹ lấy đường cong cơ thể một cách đầy ý nhị. 
                  Ánh nhũ ngọc trai trên bề mặt vải bắt sáng tuyệt đẹp dưới ánh đèn, 
                  cùng những đường cắt xẻ táo bạo giúp mỗi bước đi của bạn thêm phần uyển chuyển và quyến rũ khó cưỡng.
                </p>
            </div>
        </div>

      </div>
      <div className={styles.centerSection}>
          <div className={clsx(styles.imageBox, styles.imageCenter)}></div>
          <div className={styles.textBox}>
              <h2>Modern Muse Trench</h2>
              <p>
                Chiếc áo khoác Trench Coat kinh điển được làm mới với gam màu Beige ấm áp và chất liệu chống thấm nhẹ. 
                Đây không chỉ là một chiếc áo khoác, mà là biểu tượng thời trang trường tồn với thời gian. 
                Dễ dàng khoác ngoài váy lụa mỏng manh hay bộ suit năng động, tạo nên lớp layer hoàn hảo cho tiết trời se lạnh.
              </p>
          </div>
      </div>
      <Link to ="/category/for-him" className={styles.banner}>
         <div className={styles.bannerContent}>
             <h2>SHOP THE LOOK</h2>
             <div className={styles.arrowRight}>
                 <FontAwesomeIcon icon={faArrowRight} />
             </div>
         </div>
      </Link>
      
    </div>
  );
};

export default SpringCollection;