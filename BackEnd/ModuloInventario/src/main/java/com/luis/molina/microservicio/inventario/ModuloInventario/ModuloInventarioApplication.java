package com.luis.molina.microservicio.inventario.ModuloInventario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ModuloInventarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuloInventarioApplication.class, args);
	}

}
