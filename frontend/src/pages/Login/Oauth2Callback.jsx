import React, { useEffect } from 'react';
import { replace, useLocation, useSearchParams } from 'react-router-dom';
import { setAccessToken } from '../../services/http';
import { message } from 'antd';

const Oauth2Callback = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    

    useEffect(() => {
        const accessToken = searchParam.get("accessToken")
        setAccessToken(accessToken)

        const redirectPath = sessionStorage.getItem("redirect_oauth_path") || "/"
        sessionStorage.removeItem("redirect_oauth_path")

        message.success("Đăng nhập thành công")

        navigate(redirectPath, {replace: true})
    }, [])
    
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <Spin size="large" tip="Processing login..." />
        </div>
    );
};

export default Oauth2Callback;