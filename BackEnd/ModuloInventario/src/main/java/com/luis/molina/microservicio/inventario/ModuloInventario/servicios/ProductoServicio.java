package com.luis.molina.microservicio.inventario.ModuloInventario.servicios;

import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Producto;
import com.luis.molina.microservicio.inventario.ModuloInventario.repositorio.ProductoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServicio {

    private final ProductoRepositorio productoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio) {
        this.productoRepositorio = productoRepositorio;
    }

    public List<Producto> productosDisponibles() {
        return productoRepositorio.findAll();
    }

    public List<Producto> guardar(String nombreProducto) {
        Producto producto = new Producto(nombreProducto, 0, "ACTIVO");
        productoRepositorio.save(producto);
        return productoRepositorio.findAll();
    }

    public List<Producto> aumentar(Long producto, Long cantidad) {
        Producto productoO = productoRepositorio.findById(producto).orElseThrow(() -> new RuntimeException("Error, producto no encontrado."));
        productoO.setCantidad(cantidad);
        productoRepositorio.save(productoO);
        return productoRepositorio.findAll();
    }

    public List<Producto> restar(Long producto, Long cantidad) {
        Producto productoO = productoRepositorio.findById(producto).orElseThrow(() -> new RuntimeException("Error, producto no encontrado."));
        productoO.setCantidad(productoO.getCantidad() - cantidad);
        productoRepositorio.save(productoO);
        return productoRepositorio.findAll();
    }

    public List<Producto> cambiarStatus(Long producto, String nuevoStatus) {
        Producto productoO = productoRepositorio.findById(producto).orElseThrow(() -> new RuntimeException("Error, producto no encontrado."));
        productoO.setEstatus(nuevoStatus);
        productoRepositorio.save(productoO);
        return productoRepositorio.findAll();
    }

}
