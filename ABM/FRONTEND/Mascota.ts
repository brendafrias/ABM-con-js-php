namespace Entidades
{

export class Mascota
{

        public _tamaño : string;
        public _edad : number;
        public _precio : number;
        

        public constructor(tamañoParametro:string, edadParametro:number, precioParametro:number)
        {
            this._tamaño = tamañoParametro;
            this._edad = edadParametro;
            this._precio = precioParametro;
        }


        public ToString():string
        {
            return `"tamanio":"${this._tamaño}","edad":${this._edad},"precio":${this._precio}`;
        }

}

}