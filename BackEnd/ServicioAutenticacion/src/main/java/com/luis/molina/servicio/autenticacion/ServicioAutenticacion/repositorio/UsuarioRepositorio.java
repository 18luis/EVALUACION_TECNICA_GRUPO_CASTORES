package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.repositorio;

import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Usuario findByNombreDeUsuario(String nombreDeUsuario);
    Boolean existsByNombreDeUsuario(String nombreDeUsuario);
}