import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SignUp.module.scss';
import { Button, Form, Input, Modal, message } from 'antd';
import { register, confirmOtp, googleLoginUrl } from '../../services/auth.service';

const RESEND_COOLDOWN = 60;

const SignUp = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [submitting, setSubmitting] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [confirming, setConfirming] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const formValuesRef = useRef(null);

    useEffect(() => {
        form.resetFields();
    }, [form]);

    useEffect(() => {
        if (!otpOpen || cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [otpOpen, cooldown]);

    const handleSubmit = async (values) => {
        setSubmitting(true);
        try {
            const data = await register({
                email: values.email,
                password: values.password,
                fullName: values.fullName,
            });
            formValuesRef.current = values;
            setOtp('');
            setOtpOpen(true);
            setCooldown(RESEND_COOLDOWN);
            message.success(data.message || 'Vui lòng kiểm tra hộp thư để lấy mã OTP');
        } catch (error) {
            message.error(error.response?.data?.message || 'Đăng ký thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        if (cooldown > 0 || !formValuesRef.current) return;
        setResending(true);
        try {
            const data = await register(formValuesRef.current);
            setCooldown(RESEND_COOLDOWN);
            message.success(data.message || 'Đã gửi lại mã OTP');
        } catch (error) {
            message.error(error.response?.data?.message || 'Gửi lại mã OTP thất bại');
        } finally {
            setResending(false);
        }
    };

    const handleConfirmOtp = async () => {
        if (!otp || otp.length < 6 || !formValuesRef.current) return; //ko lam gi

        setConfirming(true);
        try {
            await confirmOtp({email: formValuesRef.current.email, otp: otp})
            navigate('/login');
        } catch (error) {
            message.error(error.response?.data?.message || 'Xác thực OTP thất bại');
        } finally {
            setConfirming(false);
        }
    };

    const handleCancelOtp = () => {
        setOtpOpen(false);
        setOtp('');
    };

    return (
        <>


            <Link to="/login" className={clsx(styles.btnBack, styles.animateEnter)} style={{ animationDelay: '0.1s' }}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '8px' }} /> Back
            </Link>

            <div className={clsx(styles.headerText, styles.animateEnter)} style={{ animationDelay: '0.2s' }}>
                <h1>Create account</h1>
                <p>Join Augustine in just a few seconds</p>
            </div>

            <Form
                form={form}
                autoComplete="off"
                className={styles.signUpForm}
                onFinish={handleSubmit}
            >
                {/* Decoy fields to stop Chrome from treating this as a login form and autofilling email/password */}
                <input type="text" name="username" autoComplete="username" style={{ display: 'none' }} />
                <input type="password" name="password" autoComplete="new-password" style={{ display: 'none' }} />

                <Form.Item
                    name="fullName"
                    className={clsx(styles.inputGroup, styles.animateEnter)}
                    style={{ animationDelay: '0.3s' }}
                    rules={[{required: true, message: 'Vui lòng nhập tên của bạn'}]}
                >
                    <Input
                        placeholder='Enter full name'
                        autoComplete="off"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    className={clsx(styles.inputGroup, styles.animateEnter)}
                    style={{ animationDelay: '0.35s' }}
                    rules={[
                        {required: true, message: 'Vui lòng nhập email'},
                        {type: 'email', message:'Email không đúng định dạng'}
                    ]}
                >
                    <Input
                        placeholder='Email'
                        autoComplete="off"
                        name="signup-email-field"
                    />
                </Form.Item>

                <Form.Item
                    name='password'
                    className={clsx(styles.inputGroup, styles.animateEnter)}
                    style={{ animationDelay: '0.4s' }}
                    rules={[
                        {required: true, }
                    ]}
                >
                    <Input.Password
                        placeholder='Password'
                        autoComplete="new-password"
                        name="signup-password-field"
                    />
                </Form.Item>

                <Form.Item
                    name='repassword'
                    className={clsx(styles.inputGroup, styles.animateEnter)}
                    style={{ animationDelay: '0.45s' }}
                    dependencies={["password"]}
                    rules={[
                        {required: true, message: 'Vui lòng nhập mật khẩu'},
                        ({getFieldValue}) => ({
                            validator(_, value){
                                if(!value || value === getFieldValue('password')){
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error("Nhập lại mật khẩu không chính xác"))
                            }

                        })
                    ]}
                >
                    <Input.Password
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        name="signup-repassword-field"

                    />
                </Form.Item>



                <Button
                    htmlType='submit'
                    loading={submitting}
                    className={clsx(styles.submitBtn, styles.animateEnter)}
                    style={{ animationDelay: '0.5s' }}
                    >

                    Create Account
                </Button>
            </Form>

            <Modal
                open={otpOpen}
                onCancel={handleCancelOtp}
                footer={null}
                centered
                closeIcon={<span className={styles.otpCloseIcon}>&times;</span>}
                className={styles.otpModal}
            >
                <div className={styles.otpModalContent}>
                    <h2>Xác thực OTP</h2>
                    <p>
                        Mã OTP đã được gửi đến <strong>{formValuesRef.current?.email}</strong>. Vui lòng nhập mã để hoàn tất đăng ký.
                    </p>

                    <Input.OTP
                        length={6}
                        value={otp}
                        onChange={setOtp}
                        className={styles.otpInput}
                        autoFocus
                    />

                    <div className={styles.otpActions}>
                        <Button
                            block
                            onClick={handleResendOtp}
                            loading={resending}
                            disabled={cooldown > 0}
                            className={styles.otpResendBtn}
                        >
                            {cooldown > 0 ? `Gửi lại mã (${cooldown}s)` : 'Gửi lại mã'}
                        </Button>

                        <Button
                            block
                            type="primary"
                            onClick={handleConfirmOtp}
                            loading={confirming}
                            disabled={otp.length < 6}
                            className={styles.otpConfirmBtn}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className={clsx(styles.socialLogin, styles.animateEnter)} style={{ animationDelay: '0.6s' }}>
                <p className={styles.dividerText}>or continue with</p>
                <button
                    type="button"
                    onClick={() => { window.location.href = googleLoginUrl; }}
                    className={styles.socialBtn}
                >
                    <FontAwesomeIcon icon={faGoogle} />
                    <span>Continue with Google</span>
                </button>
            </div>

            <div className={clsx(styles.acceptTerms, styles.animateEnter)} style={{ animationDelay: '0.65s' }}>
                <p>By creating an account, you agree to the Terms and Privacy Policy.</p>
            </div>

            <div className={clsx(styles.toLogin, styles.animateEnter)} style={{ animationDelay: '0.7s' }}>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </>
    );
};

// Cấu hình Theme khớp 100% với biến SCSS

export default SignUp;