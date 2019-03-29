import { Injectable } from "@angular/core";

@Injectable()
export class UtilityService{
    constructor(){}
    
    public ValidateRut(rut){
            let suma=0; 
            let Rut = rut.substring(0, rut.length - 1);
            let Dv = rut.substring(rut.length -1);
            if(Dv.toUpperCase() == 'K') {
                Dv = 10
            }
            let resultDv
            let arrRut = Rut.split('')
            if(arrRut.length < 7){
                return false
            } else{
                let b = 0
                let c = 0
                let arrResult = []
                var arrReverse = arrRut.reverse()
                arrReverse.map((value,index) => {
                    if(index > 5) {
                        arrResult[b] = value * (2 + c)
                        c ++
                    } else {
                        arrResult[b] = value * (2 + b)
                    }
                    b++
                })
                arrResult.map((value) => {
                    suma += value
                })
                resultDv = 11 - (suma - Math.trunc(suma / 11) * 11)
                if(resultDv == Dv){
                    return true
                } else{
                    return false
                }
            }
    }

    public ValidaEmail(email) {
        var b = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
            if (!b.test(email)) {
                return false;
            } else {
                return true;
            }
        }

    public SeparaRut(rutdv){
        let rut = rutdv.replace('.','')
        rut = rut.replace('-','')
        rut = rut.substring(0, rut.length - 1)
        return rut
    }

    public SeparaDv(rutdv){
        let dv = rutdv.substring(rutdv.length - 1)
        return dv
    }
  
    Miles(num) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        return num;
    }
    
    SinPuntos(num){
        num = num.replace('.','')
        return num
    }

    zfill(number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */ 
        var zero = "0"; /* String de cero */  
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
    }
}