package com.luis.molina.apigateway.APIGateway.configuracion;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class ValidadorRutas {

    public static final List<String> openApiEndpoints = List.of(
            "/api/autenticacion/registrarse",
            "/api/autenticacion/iniciar-sesion",
            "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
