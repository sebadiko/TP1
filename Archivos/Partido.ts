import { Equipo } from "./Equipo";
import { Grupo } from "./Grupo";

export class Partido {
    public numPartido: Number;
    public grupo: Grupo;
    public equipoLocal: Equipo;
    public equipoVisitante: Equipo;
    public finalizar: boolean;
    public partidos: Partido[] = [];

    constructor() {
    }

    public creacionPartidos(pNum: Number, pGrupo: Grupo, pLocal: Equipo, pVisitante: Equipo) {
        if (pLocal != pVisitante) {
            for (let i = 0; i < 4; i++) {
                if (pGrupo.Equipos[i].getNombre() == pLocal.getNombre()) {
                    for (let j = 0; j < 4; j++) {
                        if (pGrupo.Equipos[j].getNombre() == pVisitante.getNombre()) {
                            this.numPartido = pNum;
                            this.grupo = pGrupo;
                            this.equipoLocal = pLocal;
                            this.equipoVisitante = pVisitante;
                            this.finalizar = false;
                        }
                    }
                }
            }
        }
    }

    public creacionPartidos2(pNum: Number, pLocal: Equipo, pVisitante: Equipo) {
        if (pLocal != pVisitante) {
            this.numPartido = pNum;
            this.equipoLocal = pLocal;
            this.equipoVisitante = pVisitante;
            this.finalizar = false;
        }
    }


    public devolverPartido(partido: Partido): string {
        return "Local: " + partido.equipoLocal.getNombre() + " Visitante: " + partido.equipoVisitante.getNombre();

    }

    public sumarGolLocal() {
        if (this.finalizar == false) {
            this.equipoLocal.sumarGol();
        } else {
            return "error";
        }
    }

    public sumarGolVisitante() {
        if (this.finalizar == false) {
            this.equipoVisitante.sumarGol();
        } else {
            return "error";
        }
    }

    public sumarGolesLocalSuplementario() {
        if (this.equipoLocal.goles == this.equipoVisitante.goles) {
            this.equipoLocal.sumarGolSuplementario();
        }
    }

    public sumarGolesVisitanteSuplementario() {
        if (this.equipoLocal.goles == this.equipoVisitante.goles) {
            this.equipoVisitante.sumarGolSuplementario();
        }
    }

    public obtenerGolesLocalNormal(): number {
        return this.equipoLocal.goles;
    }

    public obtenerGolesVisitanteNormal(): number {
        return this.equipoVisitante.goles;
    }

    public obtenerGolesLocalSuplementario(): number {
        return this.equipoLocal.golSuplementario;
    }

    public obtenerGolesVisitanteSuplementario(): number {
        return this.equipoVisitante.golSuplementario;
    }

    public obtenerGolesLocalTotal(): number {
        this.equipoLocal.sumarGolTotal();
        return this.equipoLocal.golTotal;
    }

    public obtenerGolesVisitanteTotal(): number {
        this.equipoVisitante.sumarGolTotal();
        return this.equipoVisitante.golTotal;
    }

    public finalizarPartido(aux: boolean) {
        this.finalizar = aux;
        if (this.finalizar == true) {
            this.puntosLocal();
            this.puntosVisitante();
            this.equipoLocal.sumarGolTotal();
            this.equipoVisitante.sumarGolTotal();
            for (let i = 0; i < 4; i++) {
                if (this.grupo.Equipos[i].getNombre() == this.equipoLocal.getNombre()) {
                    this.grupo.Equipos[i] = this.equipoLocal;
                }
            }
            for (let j = 0; j < 4; j++) {
                if (this.grupo.Equipos[j].getNombre() == this.equipoVisitante.getNombre()) {
                    this.grupo.Equipos[j] = this.equipoVisitante;
                }
            }
        }
    }

    public estaFinalizado(): boolean {
        if (this.finalizar == true) {
            return true
        }
        else {
            return false;
        }
    }

    public puntosLocal(): number {
        if (this.equipoLocal.goles > this.equipoVisitante.goles) {
            this.equipoLocal.puntosTotales(3);
            return 3;
        } else if (this.equipoLocal.goles === this.equipoVisitante.goles) {
            this.equipoLocal.puntosTotales(1);
            return 1;
        }
        else {
            return 0;
        }
    }

    public puntosVisitante(): number {
        if (this.equipoVisitante.goles > this.equipoLocal.goles) {
            this.equipoVisitante.puntosTotales(3);
            return 3;
        } else if (this.equipoVisitante.goles === this.equipoLocal.goles) {
            this.equipoVisitante.puntosTotales(1);
            return 1;
        }
        else {
            return 0;
        }
    }
}