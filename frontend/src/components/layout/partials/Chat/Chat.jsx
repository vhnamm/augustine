import React from 'react';
import styles from "./Chat.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPhone} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Button from '../../../../components/common/Button/Button';
const Chat = ({setOpenCenter}) => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.chat_header}>
            <div className={styles.btn_back} onClick={() => setOpenCenter(false)}>
                <FontAwesomeIcon icon={faAngleLeft} className={styles.icon}/>
                <span>Back</span>
            </div>

            <div className={styles.chat_title}>
                <h4>Contact Center</h4>
                <p>Hi! What can we help you with?</p>
            </div>

            <div className={styles.btn_call}>
                <a href="https://www.facebook.com/duymanhlemon#" target='_blank'>
                    <FontAwesomeIcon icon={faPhone} className={styles.icon}/>
                </a>
            </div>
        </div>

        <div className={styles.chat_content}>
            <p className={clsx(styles.chat_txt, styles.cus)}>Alo, anh chào Thi nhá, em là Thi hả Thi?</p>
            <p className={clsx(styles.chat_txt, styles.emp)}>Dạ không anh ơi anh lộn số rồi</p>
            <p className={clsx(styles.chat_txt, styles.cus)}>Ui Thi ơi… em đừng có chối, em mà không nói chuyện với anh là anh đăng hết thông tin của em lên mạng đấy</p>
            <p className={clsx(styles.chat_txt, styles.cus)}>Thông tin về tên, địa chỉ nhà, trường học, ở đâu, bố mẹ tên là gì anh có cả ở đây rồi Thi có cần anh cho nghe một số thông tin không?</p>
            <p className={clsx(styles.chat_txt, styles.emp)}>Anh ơi anh cần hỗ trợ gì về việc đặt mua hàng thì bên em giải quyết chứ không liên quan đến cá nhân nào ạ.</p>
            <p className={clsx(styles.chat_txt, styles.emp)}>Nếu quý khách không còn vấn đề gì thì augustine xin phép đóng trò chuyện tại đây</p>
            <p className={clsx(styles.chat_txt, styles.cus)}>Thi ạ em còn trẻ quá trạc tuổi em trai của anh, sao em lại dại dột thế</p>
            
        </div>

        <div className={styles.chat_send_wrap}>
            <input type="text" placeholder='Aa'className={styles.chat_form}/>
            <Button primary size="medium">Send</Button>
        </div>
    </div>
  );
};

export default Chat;