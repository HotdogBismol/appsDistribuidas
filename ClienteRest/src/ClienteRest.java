import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javafx.scene.layout.HBox;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
public class ClienteRest extends Application {

    @Override
    public void start(Stage primaryStage) {
        
        String ip = "192.168.230.243";
        //String ip = "localhost";
        String puerto = "8080";
        String cliente = "Java";
        
        //  Componentes de la interfaz
        Label num1Label = new Label("Número 1:");
        TextField num1Field = new TextField();
        Label num2Label = new Label("Número 2:");
        TextField num2Field = new TextField();
        
        //  Botones de la interfaz
        Button sumButton = new Button("+");
        Button resButton = new Button("−");
        Button multButton = new Button("×");
        Button divButton = new Button("÷");
        Button cosButton = new Button("cos");
        Button coshButton = new Button("cosh");
        Button eButton = new Button("e");
        Button facButton = new Button("!");
        Button logaButton = new Button("log");
        Button modButton = new Button("mod");
        Button potButton = new Button("^");
        Button raizButton = new Button("√2");
        Button senButton = new Button("sen");
        Button senhButton = new Button("senh");
        Button tanButton = new Button("tan");
        Button tanhButton = new Button("tanh");
        
        //  Etiqueta de resultado
        Label resultLabel = new Label();
        
        num1Label.setStyle("-fx-font-size: 12;");
        num1Field.setStyle("-fx-font-size: 14;");
        num2Label.setStyle("-fx-font-size: 12;");
        num2Field.setStyle("-fx-font-size: 14;");
        resultLabel.setStyle("-fx-font-size: 16; -fx-text-alignment: center; -fx-padding: 10;");
        num1Field.setMaxWidth(50);
        num2Field.setMaxWidth(50);
        

        // Configurar el evento del botón   SUMA
        sumButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/suma?num1=" + num1 + "&num2=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   RESTA
        resButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/resta?numeroUno=" + num1 + "&numeroDos=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        //  Configurar el evento del botón    MULTIPLICACION
        multButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/multiplicacion?numeroUno=" + num1 + "&numeroDos=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });

                
        //  Configurar el evento del botón    DIVISION
        divButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/division?numero_1=" + num1 + "&numero_2=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });

        // Configurar el evento del botón   COS
        cosButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/cos?cos=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });

        // Configurar el evento del botón   COSH
        coshButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/cosh?cosh=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });        
        
        // Configurar el evento del botón   E
        eButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/e?e=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   FAC
        facButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/factorial?base=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   LOGARITMO
        logaButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/logaritmo?log=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   MODULO
        modButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/modulo?num1=" + num1 + "&num2=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   POTENCIA
        potButton.setOnAction(e -> {
            String num1 = num1Field.getText();
            String num2 = num2Field.getText();
            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/potencia?num1=" + num1 + "&num2=" + num2+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   RAIZ
        raizButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/raizCuadrada?raiz=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   SEN
        senButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/sin?seno=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   SENH
        senhButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/sinh?senoh=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        // Configurar el evento del botón   TAN
        tanButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/tan?tan=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        //  Configurar el evento del botón   TANH
        tanhButton.setOnAction(e -> {
            String num1 = num1Field.getText();

            String url = "http://"+ ip +":"+ puerto +"/elRest/webresources/webresources/tanh?tanh=" + num1+"&tcliente="+cliente;

            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet request = new HttpGet(url);
                HttpResponse response = httpClient.execute(request);
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                resultLabel.setText("Respuesta del Servidor: " + result.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });
        
        
    
        //  Configurar el diseño de la interfaz
        //  Crear HBox para los botones
        HBox buttonBox = new HBox(10);
        buttonBox.setAlignment(Pos.CENTER);
        buttonBox.getChildren().addAll(sumButton, resButton, multButton, divButton);

        HBox buttonBox1 = new HBox(10);
        buttonBox1.setAlignment(Pos.CENTER);
        buttonBox1.getChildren().addAll(potButton,raizButton,modButton);

        HBox buttonBox2 = new HBox(10);
        buttonBox2.setAlignment(Pos.CENTER);
        buttonBox2.getChildren().addAll(cosButton,coshButton,eButton,facButton,logaButton,senButton);

        HBox buttonBox3 = new HBox(10);
        buttonBox3.setAlignment(Pos.CENTER);
        buttonBox3.getChildren().addAll(senButton,senhButton,tanButton,tanhButton);

            
        //  Espacio para los input de entrada
        HBox inputBox = new HBox(10);
        inputBox.setAlignment(Pos.CENTER);
        inputBox.getChildren().addAll(num1Label, num1Field, num2Label, num2Field);

        // Crear VBox principal
        VBox root = new VBox(10); // Espaciado vertical de 10 píxeles entre los nodos
        root.setAlignment(Pos.CENTER); // Centrar los elementos en el VBox
        root.getChildren().addAll(resultLabel, inputBox, buttonBox, buttonBox1, buttonBox2, buttonBox3); // Agregar HBox al VBox

        root.setMinSize(300, 350);

        // Configurar la escena y mostrar la ventana
        Scene scene = new Scene(root);
        primaryStage.setTitle("Calculadora");
        primaryStage.setScene(scene);
        primaryStage.show();

    }

    public static void main(String[] args) {
        launch(args);
    }
}
