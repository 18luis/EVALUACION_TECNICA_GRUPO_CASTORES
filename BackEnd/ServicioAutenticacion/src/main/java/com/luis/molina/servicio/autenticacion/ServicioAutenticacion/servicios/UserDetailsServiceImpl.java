package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.servicios;

import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.modelos.Usuario;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.repositorio.UsuarioRepositorio;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepositorio usuarioRepositorio;

    public UserDetailsServiceImpl(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public UserDetails loadUserByUsername(String nombreDeUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByNombreDeUsuario(nombreDeUsuario);
        if (usuario == null) {
            throw new UsernameNotFoundException("El usuario no existe.");
        }
        return new org.springframework.security.core.userdetails.User(usuario.getNombreDeUsuario(), usuario.getContrasenia(),  Collections.singletonList(new SimpleGrantedAuthority(usuario.getRol())));
    }
}