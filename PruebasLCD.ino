#include <LiquidCrystal.h>
// Se incluye la libreria 

// Se declaran los pines que vamos a usar
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
//mandamos a llamar la libreria LiquidCrystal y metemos las variables que declaramos
//En este orden
void setup() {
  // put your setup code here, to run once:
  lcd.begin(16,2);
  // Inicializamos la pantalla especificando que es de 16x2
}

void loop() {
  // put your main code here, to run repeatedly:
  lcd.setCursor(0,0);
  //coordenadas donde empieza a escribir(esquina superior derecha)
  lcd.print("Hola Mundo");
}
