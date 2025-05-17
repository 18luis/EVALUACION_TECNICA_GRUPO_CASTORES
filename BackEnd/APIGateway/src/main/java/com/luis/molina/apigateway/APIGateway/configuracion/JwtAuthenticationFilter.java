package com.luis.molina.apigateway.APIGateway.configuracion;

import com.luis.molina.apigateway.APIGateway.utileria.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.reactive.CorsUtils;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final ValidadorRutas validadorRutas;
    private final JwtUtil jwtUtil;
    private final RestTemplate template;

    public JwtAuthenticationFilter(ValidadorRutas validadorRutas, JwtUtil jwtUtil, RestTemplate template) {
        super(Config.class);
        this.validadorRutas = validadorRutas;
        this.jwtUtil = jwtUtil;
        this.template = template;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {

            if (validadorRutas.isSecured.test(exchange.getRequest())) {

                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {
                    if (jwtUtil.validarToken(authHeader)) {
                        /*Claims claims = Jwts.parser()
                                .setSigningKey(SECRET_KEY)
                                .parseClaimsJws(token)
                                .getBody();

                        String role = claims.get("role", String.class);

                        // Aquí defines qué roles pueden pasar
                        String path = exchange.getRequest().getURI().getPath();
                        if (path.startsWith("/inventory") && !(role.equals("admin") || role.equals("almacenista"))) {
                            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                            return exchange.getResponse().setComplete();
                        }*/
                    }
//                    //REST call to AUTH service
//                    template.getForObject("http://IDENTITY-SERVICE//validate?token" + authHeader, String.class);
                } catch (Exception e) {
                    throw new RuntimeException("un authorized access to application");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {

    }
}
