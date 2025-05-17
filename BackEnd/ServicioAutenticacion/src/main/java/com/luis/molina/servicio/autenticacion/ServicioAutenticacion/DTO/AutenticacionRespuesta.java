package com.luis.molina.servicio.autenticacion.ServicioAutenticacion.DTO;

public class AutenticacionRespuesta {

    private final String token;
    private String nombre;
    private String rol;

    public AutenticacionRespuesta(String token, String nombre, String rol) {
        this.token = token;
        this.nombre = nombre;
        this.rol = rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }
}