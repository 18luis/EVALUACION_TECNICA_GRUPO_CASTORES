package com.luis.molina.microservicio.inventario.ModuloInventario.DTO;

public class ProductoCantidadSolicitudDTO {

    private Long producto;
    private Long cantidad;

    public ProductoCantidadSolicitudDTO() {
    }

    public ProductoCantidadSolicitudDTO(Long producto, Long cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    public Long getProducto() {
        return producto;
    }

    public void setProducto(Long producto) {
        this.producto = producto;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
