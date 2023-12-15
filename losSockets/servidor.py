import socket

# Configurar el cliente
host = '127.0.0.1'
port = 12345
client_id = input("Ingresa tu identificador único: ")

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((host, port))

# Enviar el identificador único al servidor
client_socket.send(client_id.encode('utf-8'))

while True:
    message = input("Escribe tu mensaje (o 'exit' para salir): ")
    if message == 'exit':
        break

    # Enviar mensaje al servidor
    client_socket.send(message.encode('utf-8'))

# Cerrar la conexión
client_socket.close()
