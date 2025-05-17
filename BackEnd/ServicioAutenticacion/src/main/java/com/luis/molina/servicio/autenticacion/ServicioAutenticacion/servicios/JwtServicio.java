package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.servicios;

import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO.AutenticacionRespuesta;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO.AutenticacionSolicitud;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.utileria.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtServicio {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtUtil jwtUtil;

    public JwtServicio(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsServiceImpl, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.jwtUtil = jwtUtil;
    }

    public AutenticacionRespuesta crearTokenJWT(AutenticacionSolicitud autenticacionSolicitud) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                autenticacionSolicitud.getNombreDeUsuario(), autenticacionSolicitud.getContrasenia(), List.of()));

        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(autenticacionSolicitud.getNombreDeUsuario());
        return new AutenticacionRespuesta(jwtUtil.generarToken(userDetails), userDetails.getUsername(), userDetails.getAuthorities().iterator().next().getAuthority());
    }
}