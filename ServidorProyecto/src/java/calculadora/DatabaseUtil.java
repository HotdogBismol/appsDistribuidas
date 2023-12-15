package calculadora;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DatabaseUtil {

    public static void insertarRegistro(String usuario, String contra) {
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

            String sql = "INSERT INTO usuarios (usuario,contrasena) VALUES (?, ?)";
            stmt = conn.prepareStatement(sql);

            stmt.setString(1, usuario);
            stmt.setString(2, contra);

            stmt.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
        
        public static List<Registro> consultarRegistros() {
        List<Registro> registros = new ArrayList<>();
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

            String sql = "SELECT id, usuario, contrasena, saldo FROM usuarios";
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                Registro registro = new Registro();
                registro.setid(rs.getInt("id"));
                registro.setusuario(rs.getString("usuario"));
                registro.setcontrasena(rs.getString("contrasena"));
                registro.setsaldo(rs.getDouble("saldo"));
                registros.add(registro);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        return registros;
    }

    public static List<Registro> consultarRegistrosD(String usuario) {
    List<Registro> registros = new ArrayList<>();
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "SELECT id, usuario, contrasena, saldo FROM usuarios WHERE usuario = ?";
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, usuario); // Aquí se establece el parámetro para el nombre de usuario
        rs = stmt.executeQuery();

        while (rs.next()) {
            Registro registro = new Registro();
            registro.setid(rs.getInt("id"));
            registro.setusuario(rs.getString("usuario"));
            registro.setcontrasena(rs.getString("contrasena"));
            registro.setsaldo(rs.getDouble("saldo"));
            
            registros.add(registro);
        }
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    return registros;
}

        
    public static void actualizarRegistro(int id, String usuario, String contrasena, double saldo) {
    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "UPDATE usuarios SET usuario = ?, contrasena = ?, saldo = ? WHERE id = ?";
        stmt = conn.prepareStatement(sql);

        stmt.setString(1, usuario);
        stmt.setString(2, contrasena);
        stmt.setDouble(3, saldo);
        stmt.setInt(4, id);

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}

    public static void eliminarRegistro(int id) {
    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "DELETE FROM usuarios WHERE id = ?";
        stmt = conn.prepareStatement(sql);

        stmt.setInt(1, id);

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
    
    
    //-------------------- Catalogo -----------
        public static void insertarLibro(String titulo, 
                                         String autor, 
                                         double precio, 
                                         String descri, 
                                         int estock, 
                                         String imagen, 
                                         String categoria) {
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

            String sql = "INSERT INTO catalogo (titulo,autor,precio,deques,estock,imagen,categoria) VALUES (?, ?, ?, ?, ?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            stmt.setString(1, titulo);
            stmt.setString(2, autor);
            stmt.setDouble(3, precio);
            stmt.setString(4, descri);
            stmt.setInt(5, estock);
            stmt.setString(6, imagen);
            stmt.setString(7, categoria);

            stmt.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
        
    public static List<RCatalogo> consultarCatalogo() {
    List<RCatalogo> catalogo = new ArrayList<>();
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        // Asegúrate de que esta consulta SQL refleje tu estructura de tabla y columnas
        String sql = "SELECT idLibro, titulo, autor, precio, deques, estock, imagen, categoria FROM catalogo";
        stmt = conn.createStatement();
        rs = stmt.executeQuery(sql);

        while (rs.next()) {
            RCatalogo item = new RCatalogo();
            item.setidLibro(rs.getInt("idLibro"));
            item.setTitulo(rs.getString("titulo"));
            item.setAutor(rs.getString("autor"));
            item.setPrecio(rs.getDouble("precio"));
            item.setDescri(rs.getString("deques"));
            item.setEstock(rs.getInt("estock"));
            item.setImagen(rs.getString("imagen"));
            item.setCategoria(rs.getString("categoria"));
            catalogo.add(item);
        }
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    return catalogo;
}
   
    public static List<RCatalogo> consultarCatalogoPorId(int idLibro) {
    List<RCatalogo> catalogo = new ArrayList<>();
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "SELECT idLibro, titulo, autor, precio, deques, estock, imagen, categoria FROM catalogo WHERE idLibro = ?";
        stmt = conn.prepareStatement(sql);
        stmt.setInt(1, idLibro); // Establecer el idLibro como parámetro

        rs = stmt.executeQuery();

        while (rs.next()) {
            RCatalogo item = new RCatalogo();
            item.setidLibro(rs.getInt("idLibro"));
            item.setTitulo(rs.getString("titulo"));
            item.setAutor(rs.getString("autor"));
            item.setPrecio(rs.getDouble("precio"));
            item.setDescri(rs.getString("deques"));
            item.setEstock(rs.getInt("estock"));
            item.setImagen(rs.getString("imagen"));
            item.setCategoria(rs.getString("categoria"));
            catalogo.add(item);
        }
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    return catalogo;
}

    
    
    public static void actualizarLibro(int id,String titulo, 
                                         String autor, 
                                         double precio, 
                                         String descri, 
                                         int estock, 
                                         String imagen, 
                                         String categoria) {
    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "UPDATE catalogo SET titulo = ?, autor = ?, precio = ?, deques = ?, estock = ?, imagen = ?, categoria = ? WHERE idLibro = ?";
        stmt = conn.prepareStatement(sql);

        stmt.setString(1, titulo);
        stmt.setString(2, autor);
        stmt.setDouble(3, precio);
        stmt.setString(4, descri);
        stmt.setInt(5, estock);
        stmt.setString(6, imagen);
        stmt.setString(7, categoria);
        stmt.setInt(8, id);

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}

    public static void eliminarLibro(int id) {
    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "DELETE FROM catalogo WHERE idLibro = ?";
        stmt = conn.prepareStatement(sql);

        stmt.setInt(1, id);

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
    
        //-------------------- Orden -----------
    public static void insertarOrden(String idusuario, String idlibro) {
    Connection conn = null;
    PreparedStatement stmt = null;
    
    // Formateador para convertir la fecha actual en formato de fecha de MySQL
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String fechaActual = dateFormat.format(new Date());

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "INSERT INTO orden (idUsuario, idLibro, fecha) VALUES (?, ?, ?)"; // Asegúrate de que la columna se llame 'fecha' en tu base de datos
        stmt = conn.prepareStatement(sql);

        stmt.setString(1, idusuario);
        stmt.setString(2, idlibro);
        stmt.setString(3, fechaActual); // Usar la fecha actual formateada

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}    
    
    public static List<ROrden> consultarOrdenes() {
    List<ROrden> ordenes = new ArrayList<>();
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "SELECT idOrden, idUsuario, idLibro, fecha FROM orden";
        stmt = conn.createStatement();
        rs = stmt.executeQuery(sql);

        while (rs.next()) {
            ROrden orden = new ROrden();
            orden.setIdOrden(rs.getInt("idOrden"));
            orden.setIdUsuario(rs.getInt("idUsuario"));
            orden.setIdLibro(rs.getInt("idLibro"));
            orden.setFecha(rs.getDate("fecha")); // Asegúrate de que el tipo de columna sea compatible
            ordenes.add(orden);
        }
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    return ordenes;
}
 
    public static void eliminarOrden(int id) {
    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://192.168.226.132:3306/lachida", "miusuarionuevo", "micontraseña");

        String sql = "DELETE FROM orden WHERE idOrden = ?";
        stmt = conn.prepareStatement(sql);

        stmt.setInt(1, id);

        stmt.executeUpdate();
    } catch (SQLException | ClassNotFoundException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
    
    static void insertarRegistro(double num1, double num2, double resultado) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}