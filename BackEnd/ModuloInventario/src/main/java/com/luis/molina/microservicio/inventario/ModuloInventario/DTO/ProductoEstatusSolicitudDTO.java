package com.luis.molina.microservicio.inventario.ModuloInventario.DTO;

public class ProductoEstatusSolicitudDTO {

    private Long producto;
    private String estatus;

    public ProductoEstatusSolicitudDTO() {
    }

    public ProductoEstatusSolicitudDTO(Long producto, String estatus) {
        this.producto = producto;
        this.estatus = estatus;
    }

    public Long getProducto() {
        return producto;
    }

    public void setProducto(Long producto) {
        this.producto = producto;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }
}
