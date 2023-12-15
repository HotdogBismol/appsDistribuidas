package calculadora;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement // Necesario para la serialización JAX-B.
public class Registro {
    private int id;
    private String usuario;
    private String contrasena;
    private double saldo;

    public Registro() {
        // Constructor vacío necesario para JAX-B.
    }

    // Getters y Setters necesarios para la serialización JAX-RS y la deserialización.
    public void setid(int id) {
        this.id = id;
    }
    
    public int getid() {
        return id;
    }
    
    public String getusuario() {
        return usuario;
    }

    public void setusuario(String usuario) {
        this.usuario = usuario;
    }

    public String getcontrasena() {
        return contrasena;
    }

    public void setcontrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public double getsaldo() {
        return saldo;
    }

    public void setsaldo(double saldo) {
        this.saldo = saldo;
    }
    

}
