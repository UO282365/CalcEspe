

class CalculadoraRPN {

    constructor() {

        this.pila = new Array();
        this.aux = true;
        this.decimalBool = false;
    }

    iniciar() {
        this.pantalla = document.querySelector('input[name="pantalla"]');
        this.pantallaPila = document.querySelector('textarea');
        this.pantalla.value = 0;
        document.addEventListener('keydown', (event) => {
            this.pulsaTeclado(event);
        });
    }

    pulsaTeclado(evento) {
        if (evento.key >= "0" && evento.key <= "9")
            this.digito(Number(evento.key));
        if (evento.altKey && evento.key == "v")
            this.cambiarSigno();

        if (evento.altKey && evento.key == "o") {
            evento.preventDefault();
            this.on();
        }
        if (evento.altKey && evento.key == "e") {
            evento.preventDefault();
            this.ce();
        }
        if (evento.altKey && evento.key == "r") {
            evento.preventDefault();
            this.calculo("raiz");
        }
        if (evento.altKey && evento.key == "p") {
            evento.preventDefault();
            this.operar("mod");
        }

        if (evento.key == "*")
            this.operar("*");
        if (evento.key == "/")
            this.operar("/");
        if (evento.key == "-")
            this.operar("-");
        if (evento.key == "+")
            this.operar("+");

        if (evento.key == ".")
            this.decimal();
        if (evento.key == "Enter")
            this.enter();

        if (evento.key === "Delete") {//usa el suprimir
            this.del();
        }

        if (evento.key === "p" && evento.altKey) {
            this.calculo("arcsen");
        }
        if (evento.key === "l" && evento.altKey) {
            this.calculo("arctan");
        }
        if (evento.key === "i" && evento.altKey) {
            this.calculo("arccos");
        }


        if (evento.key === "U" && evento.shiftKey) {
            this.calculo("cuadrado");
        }
        if (evento.key === "Y" && evento.shiftKey) {
            this.operar("elevado");
        }
        if (evento.key === "s" && evento.altKey) {
            this.calculo("sen");
        }
        if (evento.key === "t" && evento.altKey) {
            this.calculo("tan");
        }
        if (evento.key === "c" && evento.altKey) {
            this.calculo("cos");
        }
        if (evento.key === "d" && evento.altKey) {
            this.calculo("potenciaDiez");
        }
        if (evento.key === "l" && evento.altKey) {
            this.calculo("log");
        }
        if (evento.key === "x" && evento.altKey) {
            this.calculo("exp");
        }

        if (evento.key === "a" && evento.altKey) {
            this.digito(Number(Math.PI));
        }
        if (evento.key === "!") {
            this.calculo("fact");
        }


    }

    del() {
        this.pantalla.value = this.pantalla.value.slice(0, -1);
        if (this.pantalla.value.length == 0) {
            this.pantalla.value = "0"
            this.aux = true;
        }
    }

    on() {
        this.pila = new Array();
        this.aux = true;
        this.decimalBool = false;
        this.pantalla.value = 0;
        this.mostrar();
    }

    ce() {
        this.pantalla.value = 0;
        this.aux = true;
        this.mostrar();
    }

    digito(n) {
        if (this.aux == true) {
            this.pantalla.value = "";
            this.aux = false
            this.decimalBool = true;
        }
        var str = this.pantalla.value + n;
        this.pantalla.value = str;
    }

    enter() {
        var str = this.pantalla.value;
        this.pila.push(str);
        this.mostrar();
        this.pantalla.value = 0;
        this.aux = true;
        this.decimalBool = true;
    }
    decimal() {
        if (this.decimalBool == true) {
            if (this.aux) {
                var str = "0.";
                this.aux = false;
            }
            else {
                var str = this.pantalla.value + ".";
            }
            this.pantalla.value = str;
            this.decimalBool = false;
        }
    }

    operar(signo) {
        if (this.pila.length >= 2) {
            var b = parseFloat(this.pila.pop());
            var a = parseFloat(this.pila.pop());
            if (!isNaN(b) && !isNaN(a)) {
                switch (signo) {
                    case ("+"):
                        this.pila.push(Number(a + b));
                        break;
                    case ("-"):
                        this.pila.push(Number(a - b));
                        break;
                    case ("*"):
                        this.pila.push(Number(a * b));
                        break;
                    case ("/"):
                        this.pila.push(Number(a / b));
                        break;
                    case ("mod"):
                        this.pila.push(Number(a % b));
                        break;
                    case ("elevado"):
                        this.pila.push(Number(a ** b));
                        break;

                }
            }
        }
        this.mostrar();
    }

    calculo(opera) {
        if (this.pila.length >= 1) {

            var a = parseFloat(this.pila.pop());
            if (!isNaN(a)) {
                switch (opera) {
                    case ("sen"):
                        this.pila.push(Number(Math.sin(a)));
                        break;
                    case ("cos"):
                        this.pila.push(Number(Math.cos(a)));
                        break;
                    case ("tan"):
                        this.pila.push(Number(Math.tan(a)));
                        break;
                    case ("arcsen"):
                        this.pila.push(Number(Math.asin(a)));
                        break;
                    case ("arccos"):
                        this.pila.push(Number(Math.acos(a)));
                        break;
                    case ("arctan"):
                        this.pila.push(Number(Math.atan(a)));
                        break;
                    case ("cuadrado"):
                        this.pila.push(Number(a * a));
                        break;
                    case ("raiz"):
                        this.pila.push(Number(Math.sqrt(a)));
                        break;
                    case ("potenciaDiez"):
                        this.pila.push(Number(10 ** a));
                        break;
                    case ("log"):
                        this.pila.push(Number(Math.log(a)));
                        break;
                    case ("exp"):
                        this.pila.push(Number(Math.exp(a)));
                        break;
                    case ("fact"):
                        this.pila.push(Number(this.factorial(a)));
                        break;
                }
            }
        }
        this.mostrar();
    }

    factorial(num) {
        var c = 1;
        for (var i = 1; i <= num; i++) {
            c = c * i;
        }
        return c;
    }

    mostrar() {
        this.pantallaPila.value = "";//boramos la pantalla de la pila
        for (var i in this.pila) {
            this.pantallaPila.value += this.pila[i] + "\n";//añadimos los elementos en la pila
        }
    }

    c() {
        this.pila = new Array();
        this.mostrar();
        this.pantalla = "0";
        this.aux = false;
    }
    cambiarSigno() {
        var str = this.pantalla.value * -1;
        this.pantalla.value = str;
    }

}

class CalculadoraEspecializada extends CalculadoraRPN{

    masaCorporal(){
        if (this.pila.length >= 2) {
            var b = parseFloat(this.pila.pop());
            var a = parseFloat(this.pila.pop());
            if (!isNaN(b) && !isNaN(a)) {
                this.pila.push(a/(b**2))
            }
        }
        this.mostrar();
    }

    metabolismoBasal(){
        if (this.pila.length >= 3) {
            var c = parseFloat(this.pila.pop());
            var b = parseFloat(this.pila.pop());
            var a = parseFloat(this.pila.pop());
            if (!isNaN(b) && !isNaN(a) && !isNaN(a)) {
                var d = 66.473 + (13.751 * a) + (5.0033*b) -(6.7550 *c);
                this.pila.push(   Number(d)  )
            }
        }
        this.mostrar();
    }

    requerimientoCalorico(){
        if (this.pila.length >= 2) {
            var b = parseFloat(this.pila.pop());
            var a = parseFloat(this.pila.pop());
            if (!isNaN(b) && !isNaN(a)) {
                if(b<1){
                    this.pila.push(a*1.2);
                }
                else if(b>=1 && b<3){
                    this.pila.push(a*1.375);
                }
                else if(b>=3 && b<=5){
                    this.pila.push(a*1.55);
                }
                else if(b>=6 && b<=7){
                    this.pila.push(a*1.725);
                }
                else{
                    this.pila.push(a*1.9);
                }
            }
        }
        this.mostrar();
    }

    calcularGramos(){
        if (this.pila.length >= 1) {
            
            var a = parseFloat(this.pila.pop());
            if (!isNaN(a)) {
                var proteinas = (a*0.4)/4;
                var hidratos = (a*0.3)/4;
                var grasas = (a*0.3)/9;
                this.pila.push(proteinas);
                this.pila.push(hidratos);
                this.pila.push(grasas);
            }
        }
        this.mostrar();
    }

    pulsaTeclado(evento){
        super.pulsaTeclado(evento);
        if (evento.key === "C" ) {
            this.masaCorporal();
        }
        if (evento.key === "B" && evento.altKey) {
            this.metabolismoBasal();
        }
        if (evento.key === "L" ) {
            this.requerimientoCalorico();
        }
        if (evento.key === "G" ) {
            this.calcularGramos();
        }
    }
}

var calculadora = new CalculadoraEspecializada();