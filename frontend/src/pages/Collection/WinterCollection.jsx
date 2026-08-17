import clsx from 'clsx';
import styles from './WinterCollection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const WinterCollection = () => {
  return (
    <div className={styles.container}>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
            <span className={styles.subTitle}>WINTER '25 EDIT</span>
            <h1 className={styles.mainTitle}>The Winter Solstice</h1>
            <p className={styles.description}>
              Khám phá bản giao hưởng của những lớp len cashmere thượng hạng <br/>
              và sắc màu trầm mặc, mang lại hơi ấm tuyệt đối giữa trời đông.
            </p>
        </div>

        <div className={styles.scrollDown}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className={styles.introSection}>
        <h2>THE ART OF WARMTH</h2>
        <p>
          Khi nhiệt độ giảm xuống cũng là lúc phong cách lên ngôi. 
          Bộ sưu tập Mùa Đông 2025 tôn vinh nghệ thuật "Layering" (phối đồ nhiều lớp). 
          Sự kết hợp giữa len Merino mềm mại, áo khoác dạ cấu trúc (Structured Coat) 
          và những đường cắt may sắc sảo sẽ giúp bạn kiêu hãnh bước đi trong gió lạnh 
          với vẻ ngoài sang trọng và ấm áp nhất.
        </p>
      </div>

      <div className={styles.zigzagSection}>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow1)}></div>
        </div>
        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow2)}></div>
            <div className={styles.textItem}>
                <h2>The Statement Coat</h2>
                <p>
                  Điểm nhấn không thể thiếu của mùa đông. Những chiếc áo khoác dạ dáng dài (Wool Trench Coat) 
                  với tông màu lạc đà (Camel) hoặc xám than (Charcoal) kinh điển. 
                  Phom dáng cứng cáp giúp định hình cơ thể, vừa giữ ấm tuyệt đối, 
                  vừa tạo nên khí chất quyền lực cho người mặc.
                </p>
            </div>
        </div>

        <div className={clsx(styles.row, styles.reverse)}>
            <div className={clsx(styles.imageItem, styles.imageRow3)}></div>
            <div className={styles.textItem}>
                <h2>Luxurious Knits</h2>
                <p>
                  Đắm mình trong sự mềm mại của len Cashmere và Mohair. 
                  Những thiết kế áo len cổ lọ (Turtleneck) hay Cardigan dáng thụng 
                  được dệt tỉ mỉ, mang lại cảm giác êm ái như một cái ôm ấm áp 
                  vào những ngày đông buốt giá.
                </p>
            </div>
        </div>

        <div className={styles.row}>
            <div className={clsx(styles.imageItem, styles.imageRow4)}></div>
            <div className={styles.textItem}>
                <h2>Midnight Velvet</h2>
                <p>
                  Dành cho những buổi tiệc đêm lễ hội. Chất liệu nhung (Velvet) đen tuyền 
                  hoặc đỏ rượu vang (Burgundy) quyến rũ bắt sáng lấp lánh dưới ánh đèn. 
                  Một vẻ đẹp cổ điển, bí ẩn và đầy mê hoặc, biến bạn thành tâm điểm của mọi ánh nhìn.
                </p>
            </div>
        </div>

      </div>

      <div className={styles.centerSection}>
          <div className={clsx(styles.imageBox, styles.imageCenter)}></div>
          
          <div className={styles.textBox}>
              <h2>Obsidian Leather</h2>
              <p>
                Sự nổi loạn tinh tế với chất liệu da thuần chay (Vegan Leather) cao cấp. 
                Áo khoác Biker hay quần da bóng mờ không chỉ chắn gió hoàn hảo 
                mà còn mang lại vẻ ngoài hiện đại, cá tính và sắc sảo.
              </p>
          </div>
      </div>

      <Link to ="/category/for-him" className={styles.banner}>
         <div className={styles.bannerContent}>
             <h2>EXPLORE WINTER</h2>
             <div className={styles.arrowRight}>
                 <FontAwesomeIcon icon={faArrowRight} />
             </div>
         </div>
      </Link>
      
    </div>
  );
};

export default WinterCollection;