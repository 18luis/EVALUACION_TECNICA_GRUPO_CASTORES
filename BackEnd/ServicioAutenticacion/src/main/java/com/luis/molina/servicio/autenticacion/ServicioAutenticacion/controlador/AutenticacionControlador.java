package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.controlador;

import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO.AutenticacionRespuesta;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO.AutenticacionSolicitud;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.modelos.Usuario;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.servicios.JwtServicio;
import com.luis.molina.servicio.autenticacion.ServicioAutenticacion.servicios.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autenticacion")
public class AutenticacionControlador {

    private final JwtServicio jwtServicio;
    private final UsuarioServicio usuarioServicio;

    public AutenticacionControlador(JwtServicio jwtServicio, UsuarioServicio usuarioServicio) {
        this.jwtServicio = jwtServicio;
        this.usuarioServicio = usuarioServicio;
    }

    @PostMapping("/iniciar-sesion")
    public ResponseEntity<AutenticacionRespuesta> crearTokenAutenticacion(@RequestBody AutenticacionSolicitud autenticacionSolicitud) throws Exception {
        return ResponseEntity.ok(jwtServicio.crearTokenJWT(autenticacionSolicitud));
    }

    @PostMapping("/registrarse")
    public ResponseEntity<String> registrarUsuario(@RequestBody Usuario usuario) {
        if (usuarioServicio.findByNombreDeUsuario(usuario.getNombreDeUsuario()) != null) {
            return ResponseEntity.badRequest().body("Ya existe ese nombre de usuario, intenta usar otro.");
        }
        usuarioServicio.guardar(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }
}