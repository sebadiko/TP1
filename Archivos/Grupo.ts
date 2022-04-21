import { Equipo } from "./Equipo";
import { Partido } from "./Partido";

export class Grupo {

    public nombre: string;
    public Equipos: Equipo[] = [];
    public partidos: Partido[] = [];
    public partido: Partido;
    public puntos: number = 0;
    public Rank: Equipo[] = [];
    public puestos: number[] = [0, 0, 0, 0];

    constructor(pNombre: string) {
        if (pNombre.length == 1) {
            this.nombre = pNombre;
        }
    }

    public AgregarEquipo(pNombre: string, pCodigo: string): boolean {
        if (pNombre != null && pCodigo != null) {
            let aux = new Equipo(pNombre, pCodigo);
            this.Equipos.push(aux);
            return true;
        }
    }

    public agregarPartido(pPartido: Partido) {
        if (pPartido != null) {
            this.partidos.push(pPartido);
        }
    }

    public devolverPartido(numPartido: number): Partido {
        if (this.partidos[numPartido - 1] != null) {
            return this.partidos[numPartido - 1];
        }
    }
    public listaPartidos(): Partido[] {
        for (let i = 0; i < this.partidos.length; i++) {
            console.log("Partido: " + this.partidos[i].numPartido + "Local: " + this.partidos[i].equipoLocal + "Visitante: " + this.partidos[i].equipoVisitante);
            return this.partidos;
        }
    }

    public puntosPorEquipo(pEquipo: Equipo) {
        return pEquipo.puntosTotal;
    }

    public puntosPorCodigoEquipo(pCodigo : string){
        for(let i=0; i<4; i++){
            if(this.Equipos[i].getCodigo() == pCodigo){
                return this.Equipos[i].puntosTotal;
            }
        }
    }

    public ranking(): Equipo[] {
        for (const i of this.Equipos) {
        //for(let i = 0; i<4; i++){
            /*if (this.Rank.find(equip => equip.getCodigo() === i.getCodigo())) {
                break;
            } else*/
                if (i.puntosTotal > this.puestos[0]) {
                    this.puestos[0] = i.puntosTotal;
                    this.Rank[3] = this.Rank[2];
                    this.Rank[2] = this.Rank[1];
                    this.Rank[1] = this.Rank[0];
                    this.Rank[0] = i;
                } else if (i.puntosTotal > this.puestos[1]) {
                    this.puestos[1] = i.puntosTotal;
                    this.Rank[3] = this.Rank[2];
                    this.Rank[2] = this.Rank[1];
                    this.Rank[1] = i;
                } else if (i.puntosTotal > this.puestos[2]) {
                    this.puestos[2] = i.puntosTotal;
                    this.Rank[3] = this.Rank[2];
                    this.Rank[2] = i;
                } else {
                    this.puestos[3] = i.puntosTotal;
                    this.Rank[3] = i;
                }
            }
        return this.Rank;
    }

    public creacionAutomaticaPartidos(){
        let a = 0;
        let b = 2

        for (let e = 0; e <= b ; e++) {
            if(e == 0){
                for(let i = 0; i <= b; i++){
                    a += 1;
                    let aux = new Partido();
                    aux.creacionPartidos(a, this, this.Equipos[0], this.Equipos[i+1]);
                    aux.sumarGolLocal();
                    aux.finalizarPartido(true);
                    this.agregarPartido(aux);
                }
            }
            else if(e == 1){
                for(let i = 1; i <= b; i++){
                    a += 1;
                    let aux = new Partido();
                    aux.creacionPartidos(a, this, this.Equipos[1], this.Equipos[i+1]);
                    aux.sumarGolLocal();
                    aux.sumarGolVisitante();
                    aux.finalizarPartido(true);
                    this.agregarPartido(aux);
                }
            }
            else{
                a += 1;
                let aux = new Partido();
                aux.creacionPartidos(a, this, this.Equipos[2], this.Equipos[3]);
                aux.sumarGolVisitante();
                aux.finalizarPartido(true);
                this.agregarPartido(aux);
            }
        }
    }
}

