package com.luis.molina.microservicio.inventario.ModuloInventario.repositorio;

import com.luis.molina.microservicio.inventario.ModuloInventario.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
}