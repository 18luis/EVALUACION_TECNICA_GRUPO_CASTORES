package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.servicios;

import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.modelos.Usuario;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.repositorio.UsuarioRepositorio;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServicio {

    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio, PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario guardar(Usuario usuario) {
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        return usuarioRepositorio.save(usuario);
    }

    public Usuario findByNombreDeUsuario(String nombreDeUsuario) {
        return usuarioRepositorio.findByNombreDeUsuario(nombreDeUsuario);
    }
}