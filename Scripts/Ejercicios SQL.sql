Traer todos los productos que tengan una venta.

R:  SELECT p.idProducto, p.nombre, p.precio FROM productos p INNER JOIN ventas v ON p.idProducto = v.idProducto WHERE v.cantidad > 1;




Traer todos los productos que tengan ventas y la cantidad total de productos vendidos.

R:  SELECT p.idProducto, p.nombre, p.precio v.cantidad as cantidad_total_vendidos FROM productos p INNER JOIN ventas v ON p.idProducto = v.idProducto;




Traer todos los productos (independientemente de si tienen ventas o no) y la suma total ($) vendida por
producto.

R:  SELECT p.idProducto, p.nombre, p.precio COALESCE(SUM(v.cantidad * p.precio), 0) as total_vendido FROM productos p LEFT JOIN ventas v ON p.idProducto = v.idProducto;