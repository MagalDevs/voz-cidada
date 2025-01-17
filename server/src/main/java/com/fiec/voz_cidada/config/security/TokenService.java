package com.fiec.voz_cidada.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fiec.voz_cidada.domain.auth_user.AuthUser;
import com.fiec.voz_cidada.domain.auth_user.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${security.token.secret")
    private String secret;
    @Value("${security.token.expire-lenght}")
    private Long expireLenght;

    private static final String tokenTypeClaim = "token_type";
    private static final String rolesClaim = "roles";

    public LoginResponseDTO createAuthTokens(AuthUser user) {
        return LoginResponseDTO.builder()
                .accessToken(createAccessToken(user))
                .refreshToken(createRefreshToken(user))
                .build();
    }

    public String createAccessToken(AuthUser user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        String issuerUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        try {
            return JWT.create()
                    .withIssuer(issuerUrl)
                    .withSubject(user.getId())
                    .withClaim(tokenTypeClaim, "ACCESS")
                    .withClaim(rolesClaim, user.getRole().name())
                    .withExpiresAt(LocalDateTime.now().plusSeconds(expireLenght).toInstant(ZoneOffset.of("-03:00")))
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating access token: ", e);
        }
    }

    private String createRefreshToken(AuthUser user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        String issuerUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        try {
            return JWT.create()
                    .withIssuer(issuerUrl)
                    .withSubject(user.getId())
                    .withClaim(tokenTypeClaim, "REFRESH")
                    .withExpiresAt(LocalDateTime.now().plusSeconds(expireLenght*24).toInstant(ZoneOffset.of("-03:00")))
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating refresh token: ", e);
        }
    }

    public String getTokenSubject(String token, String tokenType) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        String issuerUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        try {
            return JWT.require(algorithm)
                    .withIssuer(issuerUrl)
                    .withClaim(tokenTypeClaim, tokenType)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

    public String validateAccessToken(String token) {
        return getTokenSubject(token, "ACCESS");
    }

    public String validateRefreshToken(String token) {
        return getTokenSubject(token, "REFRESH");
    }

}
