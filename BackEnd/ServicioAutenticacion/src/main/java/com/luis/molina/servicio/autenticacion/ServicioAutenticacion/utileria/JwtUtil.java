package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.utileria;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String key;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(key.getBytes());
    }

    @Value("${jwt.expiracion}")
    private long jwtExpirationInMs;

    public String generarToken(UserDetails userDetails) {
        Date now = new Date(System.currentTimeMillis());
        Date expiracion = new Date(System.currentTimeMillis() + jwtExpirationInMs);
        return Jwts.builder()
                .claim("rol", userDetails.getAuthorities())
                .subject(userDetails.getUsername())
                .issuedAt(now)
                .expiration(expiracion)
                .signWith(getSecretKey(), Jwts.SIG.HS256)
                .compact();
    }

    public boolean validarToken(String token) {
        try {
            Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public String getUsuarioDeJWT(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}