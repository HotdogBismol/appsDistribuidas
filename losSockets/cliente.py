import socket
import threading

def recibir_mensajes(cliente_socket):
    while True:
        try:
            mensaje = cliente_socket.recv(1024)
            print(mensaje.decode('utf-8'))
        except:
            break

# Configuración del cliente
cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cliente.connect(('192.168.228.81', 21))

nombre = input("Ingresa tu nombre: ")
cliente.send(nombre.encode('utf-8'))

hilo_recibir = threading.Thread(target=recibir_mensajes, args=(cliente,))
hilo_recibir.start()

while True:
    mensaje = input()
    cliente.send(f"{nombre}: {mensaje}".encode('utf-8'))