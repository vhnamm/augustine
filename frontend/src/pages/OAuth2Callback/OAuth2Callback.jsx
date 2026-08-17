import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import useAuth from '~/hooks/useAuth';

const OAuth2Callback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { loginWithAccessToken } = useAuth();
    const handled = useRef(false);

    useEffect(() => {
        if (handled.current) return;
        handled.current = true;

        const accessToken = searchParams.get('accessToken');
        if (!accessToken) {
            message.error('Đăng nhập bằng Google thất bại');
            navigate('/login', { replace: true });
            return;
        }

        loginWithAccessToken(accessToken);
        navigate('/', { replace: true });
    }, [searchParams, loginWithAccessToken, navigate]);

    return null;
};

export default OAuth2Callback;
