import { Equipo } from "./Equipo";
import { Grupo } from "./Grupo";
import { Partido } from "./Partido";

export class Manager{
    public nombre: string;
    public grupo: Grupo[] = [];
    public ganadoresOctavos: Equipo[] = [];
    public ganadoresCuartos: Equipo[] = [];
    public ganadoresSemi: Equipo[] = [];
    public perdedoresSemi: Equipo[] = [];
    public ganadorTercerPuesto: Equipo;
    public ganador: Equipo;

    constructor(pNombre: string){
        this.nombre = pNombre;
    }

    public generargrupo(){
        const g0 = new Grupo("A");
        g0.AgregarEquipo("Qatar", "QR");
        g0.AgregarEquipo("Ecuador", "EC");
        g0.AgregarEquipo("Senegal", "SE");
        g0.AgregarEquipo("Países Bajos", "PB");
        g0.creacionAutomaticaPartidos();
        this.agregarGrupo(g0);
        
    
        const g1 = new Grupo("B");
        g1.AgregarEquipo("Inglaterra", "IN");
        g1.AgregarEquipo("Iran", "IR");
        g1.AgregarEquipo("Estados Unidos", "ES");
        g1.AgregarEquipo("Ucrania", "UC");
        g1.creacionAutomaticaPartidos();
        this.agregarGrupo(g1);
    
        const g2 = new Grupo("C");
        g2.AgregarEquipo("Argentina", "AR");
        g2.AgregarEquipo("Mexico", "MX");
        g2.AgregarEquipo("Arabia Saudita", "AS");
        g2.AgregarEquipo("Polonia", "PO");
        g2.creacionAutomaticaPartidos();
        this.agregarGrupo(g2);
    
        const g3 = new Grupo("D");
        g3.AgregarEquipo("Francia", "FR");
        g3.AgregarEquipo("Peru", "PR");
        g3.AgregarEquipo("Dinamarca", "DN");
        g3.AgregarEquipo("Tunez", "TZ");
        g3.creacionAutomaticaPartidos();
        this.agregarGrupo(g3);
    
        const g4 = new Grupo("E");
        g4.AgregarEquipo("España", "ES");
        g4.AgregarEquipo("Costa Rica", "CR");
        g4.AgregarEquipo("Alemania", "AL");
        g4.AgregarEquipo("Japon", "JP");
        g4.creacionAutomaticaPartidos();
        this.agregarGrupo(g4);
    
        const g5 = new Grupo("F");
        g5.AgregarEquipo("Belgica", "BG");
        g5.AgregarEquipo("Canada", "CA");
        g5.AgregarEquipo("Marruecos", "MR");
        g5.AgregarEquipo("Croacia", "CO");
        g5.creacionAutomaticaPartidos();
        this.agregarGrupo(g5);
    
        const g6 = new Grupo("G");
        g6.AgregarEquipo("Brasil", "BR");
        g6.AgregarEquipo("Servia", "SE");
        g6.AgregarEquipo("Suiza", "SA");
        g6.AgregarEquipo("Camerun", "CN");
        g6.creacionAutomaticaPartidos();
        this.agregarGrupo(g6);
    
        const g7 = new Grupo("H");
        g7.AgregarEquipo("Portugal", "PL");
        g7.AgregarEquipo("Ghana", "GH");
        g7.AgregarEquipo("Uruguay", "UY");
        g7.AgregarEquipo("Corea del Sur", "CS");
        g7.creacionAutomaticaPartidos();
        this.agregarGrupo(g7);
    }

    public agregarGrupo(pGrupo: Grupo){
        this.grupo.push(pGrupo);
    }

    public crearOctavos(){
        let partidos: Partido[] = [];
        let aux = new Partido();
        let aux1 = new Partido();
        let aux2 = new Partido();
        let aux3 = new Partido();
        let aux4 = new Partido();
        let aux5 = new Partido();
        let aux6 = new Partido();
        let aux7 = new Partido();

        let rank0 = this.grupo[0].ranking();
        let rank1 = this.grupo[1].ranking();
        let rank2 = this.grupo[2].ranking();
        let rank3 = this.grupo[3].ranking();
        let rank4 = this.grupo[4].ranking();
        let rank5 = this.grupo[5].ranking();
        let rank6 = this.grupo[6].ranking();
        let rank7 = this.grupo[7].ranking();

        aux.creacionPartidos2(1, rank0[0], rank1[1]);
        this.ganadoresOctavos.push(rank0[0]);
        partidos[0] = aux;
        aux1.creacionPartidos2(2, rank0[1], rank1[0]);
        this.ganadoresOctavos.push(rank1[0]);
        partidos[1] = aux1;

        aux2.creacionPartidos2(3, rank2[0], rank3[1]);
        this.ganadoresOctavos.push(rank3[1]);
        partidos[2] = aux2;
        aux3.creacionPartidos2(4, rank2[1], rank3[0]);
        this.ganadoresOctavos.push(rank2[1]);
        partidos[3] = aux3;

        aux4.creacionPartidos2(5, rank4[0], rank5[1]);
        this.ganadoresOctavos.push(rank4[0]);
        partidos[4] = aux4;
        aux5.creacionPartidos2(6, rank4[1], rank5[0]);
        this.ganadoresOctavos.push(rank5[0]);
        partidos[5] = aux5;

        aux6.creacionPartidos2(7, rank6[0], rank7[1]);
        this.ganadoresOctavos.push(rank7[1]);
        partidos[6] = aux6;
        aux7.creacionPartidos2(8, rank6[1], rank7[0]);
        this.ganadoresOctavos.push(rank6[1]);
        partidos[7] = aux7;

        return partidos;
    }

    public crearCuartos(){
        let partidos: Partido[] = [];
        let aux = new Partido()
        let aux1 = new Partido();
        let aux2 = new Partido();
        let aux3 = new Partido();
        aux.creacionPartidos2(1, this.ganadoresOctavos[0], this.ganadoresOctavos[1]);
        this.ganadoresCuartos.push(this.ganadoresOctavos[0]);
        partidos.push(aux);

        aux1.creacionPartidos2(2, this.ganadoresOctavos[2], this.ganadoresOctavos[3]);
        this.ganadoresCuartos.push(this.ganadoresOctavos[3]);
        partidos.push(aux1);

        aux2.creacionPartidos2(3, this.ganadoresOctavos[4], this.ganadoresOctavos[5]);
        this.ganadoresCuartos.push(this.ganadoresOctavos[4]);
        partidos.push(aux2);

        aux3.creacionPartidos2(4, this.ganadoresOctavos[6], this.ganadoresOctavos[7]);
        this.ganadoresCuartos.push(this.ganadoresOctavos[7]);
        partidos.push(aux3);
        return partidos;
    }

    public crearSemi(){
        let partidos: Partido[] = [];
        let aux = new Partido()
        let aux1 = new Partido();

        aux.creacionPartidos2(1, this.ganadoresCuartos[0], this.ganadoresCuartos[1]);
        this.ganadoresSemi.push(this.ganadoresCuartos[1]);
        this.perdedoresSemi.push(this.ganadoresCuartos[0]);
        partidos.push(aux);

        aux.creacionPartidos2(2, this.ganadoresCuartos[2], this.ganadoresCuartos[3]);
        this.ganadoresSemi.push(this.ganadoresCuartos[2]);
        this.perdedoresSemi.push(this.ganadoresCuartos[3]);
        partidos.push(aux);
        return partidos;
    }

    public crearTercerPuesto(){
        let tercerPuesto: Partido[] = [];
        let aux = new Partido()

        aux.creacionPartidos2(1, this.perdedoresSemi[0], this.perdedoresSemi[1]);
        this.ganadorTercerPuesto = this.perdedoresSemi[0];
        tercerPuesto.push(aux);
        return tercerPuesto;
    }

    public crearFinal(){
        let partidoFinal: Partido[] = [];
        let aux = new Partido()
        
        aux.creacionPartidos2(1, this.ganadoresSemi[0], this.ganadoresSemi[1]);
        this.ganador = this.ganadoresSemi[0];
        return partidoFinal;
    }
}