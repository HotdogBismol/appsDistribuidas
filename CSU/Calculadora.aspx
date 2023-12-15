<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Calculadora.aspx.cs" Inherits="CalculadoraClient.CSU.Calculadora" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Calculadora SOAP</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
body {
    font-family: 'Comic Sans MS', sans-serif;
    background-color:bisque;
    color: #fff;
    text-align: center;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.calculator {
    width: 400px;
    height: 400px;
    background-color: #9b59b6;
    border: 2px solid #7e349d;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

input[type="text"] {
    width: calc(100% - 22px);
    height: 40px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 30px;
    border: none;
    border-radius: 10px;
    text-align: right;
}

.btn {
    width: 100%;
    height: 80px;
    font-size: 24px;
    background-color: #8e44ad;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn.clear {
    background-color: #c0392b;
}

.btn.equal {
    background-color: #27ae60;
}

.btn.operator {
    background-color: #f39c12;
}

.btn:hover {
    background-color: #6c3483;
}

#result {
    margin-top: 10px;
    font-size: 30px;
    color: black;
}


    </style>
    <script src="https://kit.fontawesome.com/d6992cba57.js" crossorigin="anonymous"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="calculator">
            <h1>Calculadora SOAP</h1>
            <input type="text" id="textBoxInput" placeholder="Valor 1" runat="server" />
            <input type="text" id="textBoxInput2" placeholder="Valor 2" runat="server" />
            <br />
            <asp:Button ID="btnSumar" CssClass="btn" Text="➕" runat="server" OnClick="btnSumar_Click" />
            <asp:Button ID="btnRestar" CssClass="btn" Text="➖" runat="server" OnClick="btnRestar_Click" />
            <asp:Button ID="btnMultiplicar" CssClass="btn" Text="✖️" runat="server" OnClick="btnMultiplicar_Click" />
            <asp:Button ID="btnDividir" CssClass="btn" Text="➗" runat="server" OnClick="btnDividir_Click" />
            <asp:Button ID="btnPotencia" CssClass="btn" Text="∧" runat="server" OnClick="btnPotencia_Click" />
            <asp:Button ID="btnRaiz" CssClass="btn" Text="√" runat="server" OnClick="btnRaiz_Click" />
            <asp:Button ID="btnLimpiar" CssClass="btn clear" Text="🗑️" runat="server" OnClick="btnLimpiar_Click" />
            
            <div id="resultContainer" runat="server">
            <div id="result" runat="server"></div>
            </div>
        </div>
    </form>
</body>
</html>
