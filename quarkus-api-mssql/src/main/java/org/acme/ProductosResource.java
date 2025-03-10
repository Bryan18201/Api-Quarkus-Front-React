package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/productos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class ProductosResource {

    @GET
    public List<Producto> obtenerProductos() {
        // Retorna todos los productos
        return Producto.listAll();
    }

    @POST
    public Response crearProducto(Producto producto) {
        producto.persist();
        return Response.status(Response.Status.CREATED).entity(producto).build();
    }

    @PUT
    @Path("/{id}")
    public Response actualizarProducto(@PathParam("id") Long id, Producto producto) {
        Producto existente = Producto.findById(id);
        if (existente == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existente.nombre = producto.nombre;
        existente.precio = producto.precio;
        existente.persist();
        return Response.ok(existente).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminarProducto(@PathParam("id") Long id) {
        boolean eliminado = Producto.deleteById(id);
        if (!eliminado) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }

}
