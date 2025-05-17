package com.luis.molina.microservicio.inventario.ModuloInventario.servicios;

import com.luis.molina.microservicio.inventario.ModuloInventario.DTO.MovimientoSolicitudDTO;
import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Movimiento;
import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Producto;
import com.luis.molina.microservicio.inventario.ModuloInventario.repositorio.MovimientoRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class MovimientoServicio {

    private final MovimientoRepositorio movimientoRepositorio;

    public MovimientoServicio(MovimientoRepositorio movimientoRepositorio) {
        this.movimientoRepositorio = movimientoRepositorio;
    }

    public List<Movimiento> movimientosDisponibles() {
        return movimientoRepositorio.findAll();
    }

    public void guardar(MovimientoSolicitudDTO movimientoSolicitudDTO) {
        LocalDateTime now = LocalDateTime.now();
        String fecha = now.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        String hora = now.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        Movimiento movimiento = new Movimiento(movimientoSolicitudDTO.getTipoMovimiento(), movimientoSolicitudDTO.getAutor(), fecha, hora);
        movimientoRepositorio.save(movimiento);
    }

}
