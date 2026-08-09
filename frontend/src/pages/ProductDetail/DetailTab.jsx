import React from 'react';
import styles from "./DetailTab.module.scss"
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faBox, faShield, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/common/Button/Button';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const DetailTab = ({title, prod}) => {
    
  return (
    <div className={styles.wrapper}>
        {title == 1 && 
            <div className={styles.description_container}>
                <p className={styles.description}>{prod.description}</p>
            </div>
        }

        {title == 2 && 
            <div className={styles.description_container}>
                <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iure quaerat, dolore deserunt harum facere nulla quod minima maxime consequatur totam perspiciatis temporibus in delectus fugit quasi. Quidem, rem hic!
                Voluptatem quam laboriosam deleniti natus. Saepe dolor nobis ipsum aliquam expedita molestias voluptatibus modi? Iste, incidunt, debitis libero iure officia, harum recusandae voluptatem dolorum magnam eos iusto consequatur ab laborum.
                Unde sint temporibus excepturi quas accusamus laborum doloribus, blanditiis, placeat nam ab voluptatum. Sunt, porro dolor, quae earum eaque maiores, modi repellendus reprehenderit odio esse nisi magni labore. Optio, dolorem.</p>
            </div>
        }

        {title == 3 && 
            <div className={styles.review_container}>

                <div className={styles.review_header}>
                    <div className={styles.rate}>
                        <span>{prod.rating}/5 <FontAwesomeIcon className={styles.icon} icon={faStar} /></span>
                        
                        <span>{"(" + prod.reviewCount + " reviews)"}</span>
                    </div>

                    <Button className={styles.btn_viewall}>View all</Button>
                </div>

                <div className={styles.review_content}>
                    <ul className={styles.list_comment}>
                        <li className={styles.comment_item}>

                            <div className={styles.avatar}></div>

                            <div className={styles.comment_wrap}>
                                <div className={styles.comment_header}>
                                    <span className={styles.username}>Hoai nam</span>
                                    <div>
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                    </div>
                                    
                                </div>
                                
                                <p className={styles.comment_txt}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati harum assumenda ipsa sit 
                                    repellat, at deleniti suscipit quia, dolores consequuntur pariatur accusantium architecto ducimus 
                                    quibusdam. Dolorem esse magnam commodi itaque.
                                </p>
                            </div>
                        </li>

                        <li className={styles.comment_item}>

                            <div className={styles.avatar}></div>

                            <div className={styles.comment_wrap}>
                                <div className={styles.comment_header}>
                                    <span className={styles.username}>Hoai nam</span>
                                    <div>
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                    </div>
                                    
                                </div>
                                
                                <p className={styles.comment_txt}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati harum assumenda ipsa sit 
                                    repellat, at deleniti suscipit quia, dolores consequuntur pariatur accusantium architecto ducimus 
                                    quibusdam. Dolorem esse magnam commodi itaque.
                                </p>
                            </div>
                        </li>

                        <li className={styles.comment_item}>

                            <div className={styles.avatar}></div>

                            <div className={styles.comment_wrap}>
                                <div className={styles.comment_header}>
                                    <span className={styles.username}>Hoai nam</span>
                                    <div>
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                        <FontAwesomeIcon className={styles.icon} icon={faStar} />
                                    </div>
                                    
                                </div>
                                
                                <p className={styles.comment_txt}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati harum assumenda ipsa sit 
                                    repellat, at deleniti suscipit quia, dolores consequuntur pariatur accusantium architecto ducimus 
                                    quibusdam. Dolorem esse magnam commodi itaque.
                                </p>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
        }

        {title == 4 && 
            <div className={clsx(styles.delivery_container)}>
                <p style={{color: "#ccc", fontSize: "14px", margin: "6px 0"}}>Augustine commit 
                    <FontAwesomeIcon style={{color: "green", marginLeft: "6px"}} icon={faCircleCheck} />
                </p>
               <ul className={clsx(styles.commit_list, "row small-gutter")}>
                    <li className={clsx("col lg-6")}>
                        <div className={styles.commit_item}>
                            <FontAwesomeIcon className={styles.commit_icon} icon={faArrowsRotate} />
                            <p>Free returns and exchanges right from your home if you are not satisfied.</p>
                        </div>
                    </li>

                    <li className={clsx("col lg-6")}>
                        <div className={styles.commit_item}>
                            <FontAwesomeIcon className={styles.commit_icon} icon={faTruckFast} />
                            
                                <p>Express nationwide delivery within 3 - 5 days, guaranteed on-time</p>
                            
                        </div>  
                    </li>

                    <li className={clsx("col lg-6")}>
                        <div className={styles.commit_item}>
                            <FontAwesomeIcon className={styles.commit_icon} icon={faShield} />
                             <p>1 month official warranty, guaranteeing 100% genuine product quality.</p>
                        </div>
                    </li>

                    <li className={clsx("col lg-6")}>
                        <div className={styles.commit_item}>
                            <FontAwesomeIcon className={styles.commit_icon} icon={faBox} />
                             <p>Inspect goods before payment, professional and secure packaging.</p>
                        </div>
                    </li>
               </ul>
            </div>
        }
    </div>
  );
};

export default DetailTab;