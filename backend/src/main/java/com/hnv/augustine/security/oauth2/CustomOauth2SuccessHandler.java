package com.hnv.augustine.security.oauth2;

import com.hnv.augustine.common.util.CookieUtil;
import com.hnv.augustine.common.util.HeaderUtil;
import com.hnv.augustine.feature.auth.service.RefreshTokenService;
import com.hnv.augustine.feature.user.entity.User;
import com.hnv.augustine.security.jwt.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomOauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

    @Value("${jwt.refresh-expiration}")
    private Long REFRESH_TOKEN_EXPIRATION_TIME;

    @Value("${spring.security.oauth2.frontend.call-back-uri}")
    private String FRONTEND_CALLBACK_URI;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication
    ) throws IOException, ServletException {
        CustomOidcUser customOidcUser = (CustomOidcUser) authentication.getPrincipal();

        assert customOidcUser != null;
        User user = customOidcUser.getUser();

        String accessToken = jwtProvider.generateJwtToken(user);
        String refreshToken = refreshTokenService.create(user,
                HeaderUtil.getClientIp(request),
                HeaderUtil.getUserAgent(request)
        );

        CookieUtil.addCookie(response, "refreshToken", refreshToken, "/api/v1/auth", REFRESH_TOKEN_EXPIRATION_TIME, true);

        String target = UriComponentsBuilder.fromUriString(FRONTEND_CALLBACK_URI)
                .queryParam("accessToken", accessToken)
                .toUriString();

        super.getRedirectStrategy().sendRedirect(request, response, target);
    }
}
