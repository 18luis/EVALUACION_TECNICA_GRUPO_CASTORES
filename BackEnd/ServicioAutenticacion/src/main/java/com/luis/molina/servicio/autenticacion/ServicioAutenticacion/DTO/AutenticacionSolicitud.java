package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO;

public class AutenticacionSolicitud {

    private String nombreDeUsuario;
    private String contrasenia;

    public String getNombreDeUsuario() {
        return nombreDeUsuario;
    }

    public void setNombreDeUsuario(String nombreDeUsuario) {
        this.nombreDeUsuario = nombreDeUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}
