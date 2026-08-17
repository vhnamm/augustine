import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, replace, useLocation, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Form, Input, message, Button } from 'antd';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { googleLoginUrl } from '~services/auth.service';

const OAUTH_ERROR_MESSAGES = {
    access_denied: 'Bạn đã huỷ đăng nhập bằng Google',
    login_failed: 'Đăng nhập bằng Google thất bại, vui lòng thử lại',
};

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const location = useLocation();
    const from = location.state?.from || '/'
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const oauthError = searchParams.get('oauth_error');
        if (!oauthError) return;
        message.error(OAUTH_ERROR_MESSAGES[oauthError] || 'Đăng nhập bằng Google thất bại');
        searchParams.delete('oauth_error');
        setSearchParams(searchParams, { replace: true });
    }, [searchParams, setSearchParams]);

    const handleGoogleLogin = () => {
        window.location.href = googleLoginUrl;
    };

    const handleSubmit = async (values) => {
        setSubmitting(true)
        try{
            
            await login(values) 
            message.success("Đăng nhập thành công")
            navigate(from, {replace: true})
        }catch(err){
            message.error(err.response?.data?.message || "Đăng nhập thất bại")
        }finally{
            setSubmitting(false)
        }
        
    };

    return (
        <div className={styles.loginContainer}>
            <div className={clsx(styles.brandLogo, styles.animateEnter)} style={{ animationDelay: '0.1s' }}>
                augustine
            </div>

            <div className={styles.loginCard}>
                <Link to="/" className={clsx(styles.btnBack, styles.animateEnter)} style={{ animationDelay: '0.2s' }}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back
                </Link>

                <div className={clsx(styles.headerText, styles.animateEnter)} style={{ animationDelay: '0.3s' }}>
                    <h1>Welcome back!</h1>
                    <p>We're glad to see you again</p>
                </div>
                
                <Form 
                    className={styles.loginForm} 
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        className={clsx(styles.inputGroup, styles.animateEnter)} 
                        style={{ animationDelay: '0.4s' }}>
                        <Input
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="password"
                        className={clsx(styles.inputGroup, styles.animateEnter)} 
                        style={{ animationDelay: '0.5s' }}>

                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Button
                        htmlType='submit'
                        disabled={submitting}
                        className={clsx(styles.submitBtn, styles.animateEnter)}
                        style={{ animationDelay: '0.6s' }}
                    >
                        {submitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Form>

                <div className={clsx(styles.socialLogin, styles.animateEnter)} style={{ animationDelay: '0.7s' }}>
                    <p className={styles.dividerText}>or sign in with</p>

                    <div className={styles.socialIcons}>
                        <button type="button" onClick={handleGoogleLogin} className={clsx(styles.socialBtn, styles.google)}>
                            <FontAwesomeIcon icon={faGoogle} />
                            <span>Continue with Google</span>
                        </button>

                        <a href="https://account.apple.com/sign-in" target="_blank" className={clsx(styles.socialBtn, styles.apple)}>
                            <FontAwesomeIcon icon={faApple} />
                            <span>Continue with Apple</span>
                        </a>

                        <a href="https://www.facebook.com/tam.nguyen.18007" target="_blank" className={clsx(styles.socialBtn, styles.facebook)}>
                            <FontAwesomeIcon icon={faFacebookF} />
                            <span>Continue with Facebook</span>
                        </a>
                    </div>
                </div>

                <div 
                    className={clsx(styles.footerLink, styles.animateEnter)}
                    style={{ animationDelay: '0.8s' }}
                >
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;