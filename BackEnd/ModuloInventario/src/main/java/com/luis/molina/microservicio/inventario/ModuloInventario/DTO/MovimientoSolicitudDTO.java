package com.luis.molina.microservicio.inventario.ModuloInventario.DTO;

public class MovimientoSolicitudDTO {

    private String tipoMovimiento;
    private String autor;

    public MovimientoSolicitudDTO() {
    }

    public MovimientoSolicitudDTO(String tipoMovimiento, String autor) {
        this.tipoMovimiento = tipoMovimiento;
        this.autor = autor;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }
}
