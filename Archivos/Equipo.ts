export class Equipo{
    private nombreEquipo: string;
    private codigoPais: string;
    public goles: number=0;
    public golTotal: number = 0;
    public puntosTotal : number = 0;
    public golSuplementario: number = 0;

    constructor(pNombre: string, pCodigo: string){
        this.nombreEquipo = pNombre;
        this.codigoPais = pCodigo;
    }

    public getNombre(){
        return this.nombreEquipo;
    }

    public getCodigo(){
        return this.codigoPais;
    }

    public sumarGol(){
        this.goles = this.goles + 1;
    }

    public sumarGolSuplementario(){
        this.golSuplementario = this.golSuplementario +1;
    }

    public sumarGolTotal(){
        this.golTotal = this.golTotal + this.goles + this.golSuplementario;
        this.goles = 0;
        this.golSuplementario = 0;
    }

    public puntosTotales(puntos : number){
        this.puntosTotal = this.puntosTotal + puntos;
    }
      
}