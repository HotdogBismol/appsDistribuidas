package calculadora;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement // Necesario para la serialización JAX-B.

public class RCatalogo {
    private int idLibro;
    private String titulo;
    private String autor;
    private double precio;
    private String descri;
    private int estock;
    private String imagen;
    private String categoria;

    // Constructor por defecto
    public RCatalogo() {
    }
    
    public void setidLibro(int idLibro) {
        this.idLibro = idLibro;
    }
    
    public int getidLibro() {
        return idLibro;
    }

    // Getters y setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDescri() {
        return descri;
    }

    public void setDescri(String descri) {
        this.descri = descri;
    }

    public int getEstock() {
        return estock;
    }

    public void setEstock(int estock) {
        this.estock = estock;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}


