/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calculadora;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Stateless
@Path("/webresources")
public class Calculadora 
{
    
    // -------------------- Cosas de Usuario    --------------------
    @POST
    @Path("usuariosInsertar")
    public Response Suma(@QueryParam("usuario")String usuario,@QueryParam("contrasena") String contra){
        DatabaseUtil.insertarRegistro(usuario, contra);
        return Response.ok().entity("Usuario Agregado").build();
    }
    
    @GET
    @Path("usuariosConsultar")
    public List<Registro> getRegistros() {
    return DatabaseUtil.consultarRegistros();
    }
    
    @GET
    @Path("usuariosConsultarD")
    public List<Registro> getRegistrosD(@QueryParam("usuario") String usuario) {
    return DatabaseUtil.consultarRegistrosD(usuario);
    }


    @PUT
    @Path("usuariosEditar")
    public Response actualizarRegistro(@QueryParam("id") int id, 
                                   @QueryParam("usuario") String usuario, 
                                   @QueryParam("contrasena") String contrasena,
                                   @QueryParam("saldo") double saldo){
    DatabaseUtil.actualizarRegistro(id, usuario, contrasena, saldo);
    return Response.ok().entity("Registro actualizado con éxito").build();
    }

    @DELETE
    @Path("usuariosEliminar")
    public Response eliminarRegistro(@QueryParam("id") int id) {
    DatabaseUtil.eliminarRegistro(id);
    return Response.ok().entity("Registro eliminado con éxito").build();
    }
    
    
    //--------------------  catalogo -----------------
    
    @POST
    @Path("catalogoInsertar")
    public Response insertarCatalogo(@QueryParam("titulo")String titulo,
                                     @QueryParam("autor") String autor,
                                     @QueryParam("precio") double precio,
                                     @QueryParam("descri") String descri,
                                     @QueryParam("estock") int estock,
                                     @QueryParam("imagen") String imagen,
                                     @QueryParam("categoria") String categoria){
        DatabaseUtil.insertarLibro(titulo, autor, precio,descri,estock,imagen,categoria);
        return Response.ok().entity("Usuario Agregado").build();
    }
    
    @GET
    @Path("catalogoConsultar")
    public List<RCatalogo> getCatalogo() {
    return DatabaseUtil.consultarCatalogo();
    }
    
    @GET
    @Path("catalogoConsultarPorId")
    public List<RCatalogo> getCatalogoPorId(@QueryParam("id") int idLibro) {
    return DatabaseUtil.consultarCatalogoPorId(idLibro);
    }


    @PUT
    @Path("catalogoEditar")
    public Response actualizarLibro(@QueryParam("id") int id, 
                                     @QueryParam("titulo")String titulo,
                                     @QueryParam("autor") String autor,
                                     @QueryParam("precio") double precio,
                                     @QueryParam("descri") String descri,
                                     @QueryParam("estock") int estock,
                                     @QueryParam("imagen") String imagen,
                                     @QueryParam("categoria") String categoria){
    DatabaseUtil.actualizarLibro(id, titulo, autor, precio, descri, estock, imagen, categoria);
    return Response.ok().entity("Registro actualizado con éxito").build();
    }
    
    @DELETE
    @Path("catalogoEliminar")
    public Response eliminarLibro(@QueryParam("id") int id) {
    DatabaseUtil.eliminarLibro(id);
    return Response.ok().entity("Registro eliminado con éxito").build();
    }
    
    // -------------------- Cosas de Ordenes    --------------------
    
    @POST
    @Path("ordenInsertar")
    public Response agregarOrdenxd(@QueryParam("idusuario")String idusuario,@QueryParam("idlibro") String idlibro){
        DatabaseUtil.insertarOrden(idusuario, idlibro);
        return Response.ok().entity("Usuario Agregado").build();
    }
    
    @GET
    @Path("ordenConsultar")
    public List<ROrden> getOrden() {
    return DatabaseUtil.consultarOrdenes();
    }
    
    
    @DELETE
    @Path("ordenEliminar")
    public Response eliminarOrden(@QueryParam("id") int id) {
    DatabaseUtil.eliminarOrden(id);
    return Response.ok().entity("Registro eliminado con éxito").build();
    }
    
}
