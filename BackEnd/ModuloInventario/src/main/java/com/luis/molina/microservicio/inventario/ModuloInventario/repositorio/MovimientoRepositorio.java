package com.luis.molina.microservicio.inventario.ModuloInventario.repositorio;

import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientoRepositorio extends JpaRepository<Movimiento, Long> {
}