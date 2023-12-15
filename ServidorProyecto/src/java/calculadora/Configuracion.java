package calculadora;

import javax.ws.rs.core.Application;
import javax.ws.rs.ApplicationPath;
import java.util.Set;
import java.util.HashSet;

@ApplicationPath("webresources")
public class Configuracion extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(calculadora.Calculadora.class);
        resources.add(calculadora.filtroCor.class); // Añade tu filtro CORS aquí
        // Agrega otras clases de recursos aquí si es necesario
    }
}
