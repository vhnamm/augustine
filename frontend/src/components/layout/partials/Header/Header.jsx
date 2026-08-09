  import React, { useState } from "react";
  import clsx from "clsx";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Link } from "react-router-dom";
  import { faHeart } from "@fortawesome/free-regular-svg-icons";
  import styles from "./Header.module.scss";
  import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
  import Button from "~components/common/Button/Button";
  import SearchForm from "../Search/SearchForm";
  import Menu from "../Menu/Menu";
  import Collections from "../Collections/Collections";
  import CartHeader from "../CartHeader/CartHeader";
  import Modal from "../../../../components/common/Modal/Modal";
  import Chat from "../Chat/Chat";

  const Header = () => {


    const [openCenter, setOpenCenter] = useState(false)

    function handleCloseChat(){
      setOpenCenter(false)
    }
    return (
      <>
        {openCenter && (
          <Modal type="left" color="dark" onClose={handleCloseChat}>
            <Chat setOpenCenter={setOpenCenter}></Chat>
          </Modal>
        )}


        <header className="wrapper_header">
        <div className={clsx(styles.header_wrap, "grid", "wide")}>

          

          <div className={clsx(styles.header_left_wrap)}>
            <div className={clsx(styles.logo)}>
              <Link to="/" className={styles.name_web}>augustine</Link>
            </div>

            <Menu className={styles.pc_menu}/>
            <Collections className={styles.pc_collection}/>
          </div>

          <SearchForm className={styles.search_form}/>

           <div className={styles.header_mobi_left}>
              <div className={styles.hamburger}>
              <FontAwesomeIcon icon={faBars} />
              </div>

              <div className={styles.search_mobile}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
           </div>

          <div className={clsx(styles.header_actions)}>
          
            <Button className={styles.contact} primary size="medium" onClick={() => setOpenCenter(true)}>
              Contact Us
            </Button>
            <div className={styles.favourite}>
              <FontAwesomeIcon icon={faHeart} className={styles.fav_icon}/>
            </div>
            <CartHeader />
            
            <Link to="/profile" className={styles.ava}>
              <img src="/assets/Profile/494459034_24045947711679416_562608663695031876_n.jpg" alt="ava" />
            </Link>
          </div>
        </div>
      </header>
      </>
    );
  };

  export default Header;
