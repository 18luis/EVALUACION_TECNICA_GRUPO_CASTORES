package com.luis.molina.microservicio.inventario.ModuloInventario.controlador;

import com.luis.molina.microservicio.inventario.ModuloInventario.DTO.MovimientoSolicitudDTO;
import com.luis.molina.microservicio.inventario.ModuloInventario.DTO.ProductoCantidadSolicitudDTO;
import com.luis.molina.microservicio.inventario.ModuloInventario.DTO.ProductoEstatusSolicitudDTO;
import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Movimiento;
import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Producto;
import com.luis.molina.microservicio.inventario.ModuloInventario.servicios.MovimientoServicio;
import com.luis.molina.microservicio.inventario.ModuloInventario.servicios.ProductoServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
public class InventarioControlador {

    private final ProductoServicio productoServicio;

    private final MovimientoServicio movimientoServicio;

    public InventarioControlador(ProductoServicio productoServicio, MovimientoServicio movimientoServicio) {
        this.productoServicio = productoServicio;
        this.movimientoServicio = movimientoServicio;
    }

    @GetMapping("/productos")
    public List<Producto> productosDisponibles() {
        return productoServicio.productosDisponibles();
    }

    @GetMapping("/movimientos")
    public List<Movimiento> movimientosDisponibles() {
        return movimientoServicio.movimientosDisponibles();
    }

    @PostMapping("/registrar-movimiento")
    public ResponseEntity<String> registrar(@RequestBody MovimientoSolicitudDTO movimientoSolicitudDTO){
        movimientoServicio.guardar(movimientoSolicitudDTO);
        return ResponseEntity.ok("Movimiento registrado.");
    }

    @PostMapping("agregar-producto")
    public List<Producto> agregarProducto(@RequestBody String nombreProducto){
        return productoServicio.guardar(nombreProducto);
    }

    @PostMapping("aumentar-producto")
    public List<Producto> aumentarProducto(@RequestBody ProductoCantidadSolicitudDTO producto){
        return productoServicio.aumentar(producto.getProducto(), producto.getCantidad());
        //return ResponseEntity.ok("El producto: " + nombreP + " fue incrementado en el inventario exitosamente.");
    }

    @PostMapping("restar-producto")
    public List<Producto> restarProducto(@RequestBody ProductoCantidadSolicitudDTO producto){
        return productoServicio.restar(producto.getProducto(), producto.getCantidad());
        //return ResponseEntity.ok("El producto: " + nombreP + " fue incrementado en el inventario exitosamente.");
    }

    @PostMapping("estatus-producto")
    public List<Producto> estatusProducto(@RequestBody ProductoEstatusSolicitudDTO producto){
        return productoServicio.cambiarStatus(producto.getProducto(), producto.getEstatus());
    }

}
