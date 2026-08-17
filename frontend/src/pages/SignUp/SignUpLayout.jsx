import { Outlet } from 'react-router-dom';
import styles from './SignUp.module.scss'; 

const SignUpLayout = () => {
    return (
        <div className={styles.signUpContainer}>
            <div className={styles.brandLogo}>
                augustine 
            </div>
            <div className={styles.signUpCard}>
                <Outlet/>
            </div>
        </div>
    );
};

export default SignUpLayout;