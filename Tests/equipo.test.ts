import { Equipo } from "../Archivos/Equipo";
import { Grupo } from "../Archivos/Grupo";
import { Estadio } from "../Archivos/Estadio";
import { Partido } from "../Archivos/Partido";
import { Manager } from "../Archivos/Manager";

test('1_Cuando_SeCreaUnEquipo_Deberia_CrearseConNombreYCodigo', () => {
    const equipo = new Equipo("Argentina", "AR");
    expect(equipo.getNombre()).toBe("Argentina");
    expect(equipo.getCodigo()).toBe("AR");
});

test('2_Cuando_SeComparaDosEquiposMismoNombre_Deberia_DarVerdadero', () => {
    const equipo1 = new Equipo("Argentina", "Ar");
    const equipo2 = new Equipo("Argentina", "Ar");
    expect(equipo1).toStrictEqual(equipo2);
});

test('101_Cuando_SeCreaUnEstadio_Deberia_CrearseConNombre', () => {
    const estadio = new Estadio("Bombonera");
    expect(estadio.Nombre).toBe("Bombonera");
});

test('201_Cuando_SeCreaUnGrupo_Deberia_CrearseConLetraY4Equipos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");
    expect(g.Equipos.length).toBe(4);
    expect(g.Equipos[0].getNombre()).toBe("Argentina");
    expect(g.Equipos[1].getNombre()).toBe("Mexico");
    expect(g.Equipos[2].getNombre()).toBe("Arabia Saudita");
    expect(g.Equipos[3].getNombre()).toBe("Polonia");
});

test('202_Cuando_SeCreaUnGrupoConMasDeUnaLetra_Deberia_ArrojarUnError', () => {
    try {
        const grupo = new Grupo("AR");
    } catch (error) {

    }
});

test('203_Cuando_CreacionPartidos_Deberia_CrearseLosPartidosDelGrupo', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local = new Equipo("Argentina", "AR");
    const visitante = new Equipo("Mexico", "MX");

    const partido = new Partido();
    partido.creacionPartidos(1, g, local, visitante);

    expect(partido.equipoLocal.getNombre()).toBe("Argentina");
    expect(partido.equipoVisitante.getNombre()).toBe("Mexico");
});

test('204_Cuando_SePidePartido1_Deberia_DevolverElPartido1DelGrupoLocalEquipo1VisitanteEquipo2', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local = new Equipo("Argentina", "AR");
    const visitante = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local, visitante);

    expect(partido1.devolverPartido(partido1)).toBe("Local: Argentina Visitante: Mexico");
});

test('205_Cuando_SePidePartidoX_Deberia_DevolverElPartidoXDelGrupo', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);

    const local2 = new Equipo("Argentina", "AR");
    const visitante2 = new Equipo("Arabia Saudita", "AS");

    const partido2 = new Partido();
    partido2.creacionPartidos(2, g, local2, visitante2);

    g.agregarPartido(partido1);
    g.agregarPartido(partido2);

    expect(g.devolverPartido(1).numPartido).toBe(1);
});

test('206_Cuando_SePidePartidos_Deberia_DevolverListadoDeTodosLosPartidos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);

    const local2 = new Equipo("Argentina", "AR");
    const visitante2 = new Equipo("Arabia Saudita", "AS");

    const partido2 = new Partido();
    partido2.creacionPartidos(2, g, local2, visitante2);

    const local3 = new Equipo("Argentina", "AR");
    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(2, g, local3, visitante3);

    g.agregarPartido(partido1);
    g.agregarPartido(partido2);
    g.agregarPartido(partido3);

    let aux: Partido[] = [partido1, partido2, partido3];

    expect(aux).toStrictEqual(g.listaPartidos());
});

test('207_Cuando_Ranking_Deberia_DevolverListadoDeEquiposEnOrdenDePuntos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.finalizarPartido(true);

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(2, g, local1, visitante2);
    partido2.sumarGolLocal();
    partido2.sumarGolVisitante();
    partido2.finalizarPartido(true);

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(2, g, local1, visitante3);
    partido3.sumarGolVisitante();
    partido3.finalizarPartido(true);

    g.agregarPartido(partido1);
    g.agregarPartido(partido2);
    g.agregarPartido(partido3);

    expect(g.ranking()[2].getNombre()).toBe("Arabia Saudita");

});


test('208_Cuando_PuntosPorEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.finalizarPartido(true);

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(2, g, local1, visitante2);
    partido2.sumarGolLocal();
    partido2.sumarGolVisitante();
    partido2.finalizarPartido(true);

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(2, g, local1, visitante3);
    partido3.sumarGolVisitante();
    partido3.finalizarPartido(true);

    g.agregarPartido(partido1);
    g.agregarPartido(partido2);
    g.agregarPartido(partido3);

    expect(g.puntosPorEquipo(local1)).toBe(4);
});

test('209_Cuando_PuntosPorCodigoEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.finalizarPartido(true);

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(2, g, local1, visitante2);
    partido2.sumarGolLocal();
    partido2.sumarGolVisitante();
    partido2.finalizarPartido(true);

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(2, g, local1, visitante3);
    partido3.sumarGolVisitante();
    partido3.finalizarPartido(true);

    g.agregarPartido(partido1);
    g.agregarPartido(partido2);
    g.agregarPartido(partido3);

    expect(g.puntosPorCodigoEquipo("AR")).toBe(4);
});

test('301_Cuando_SeCreaUnGrupoPartido_Deberia_CrearseConEquipoLocalYVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);

    expect(partido1.equipoLocal.getNombre()).toStrictEqual("Argentina");
    expect(partido1.equipoVisitante.getNombre()).toStrictEqual("Mexico");
});

test('302_Cuando_SeCreaUnGrupoPartidoConElMismo_Deberia_ArrojarUnError', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");

    const partido1 = new Partido();

    try {
        partido1.creacionPartidos(1, g, local1, local1);
    } catch (e) {

    }
});

test('303_Cuando_SumarGolLocal_Deberia_SumaUnGolAlLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();

    expect(partido1.equipoLocal.goles).toBe(1);
});

test('304_Cuando_SumarGolVisitante_Deberia_SumaUnGolAlVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();

    expect(partido1.equipoVisitante.goles).toBe(1);
});

test('305_Cuando_Finalizar_Deberia_ElPartidoNoDebeRecibirMasGoles', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.finalizarPartido(true);
    partido1.sumarGolLocal();

    expect(partido1.equipoLocal.goles).toBe(0);
});

test('306_Cuando_SumarGolVisitanteYEstaFinalizado_Deberia_ArrojarUnError', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.finalizarPartido(true);

    expect(partido1.sumarGolLocal()).toBe("error");
});

test('307_Cuando_PuntosLocal_Deberia_DeberiaDevolverLosPuntosDelLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();

    expect(partido1.puntosLocal()).toBe(3);
});

test('308_Cuando_PuntosVisitante_Deberia_DeberiaDevolverLosPuntosDelVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();

    expect(partido1.puntosVisitante()).toBe(3);
});

test('309_Cuando_PuntosLocal_Deberia_Devolver3SiGanoLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();

    expect(partido1.puntosLocal()).toBe(3);
});

test('310_Cuando_PuntosLocal_Deberia_Devolver0SiGanoVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();

    expect(partido1.puntosLocal()).toBe(0);
});

test('311_Cuando_PuntosLocal_Deberia_Devolver1SiEmpataron', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();
    partido1.sumarGolLocal();

    expect(partido1.puntosLocal()).toBe(1);
});

test('312_Cuando_PuntosVisitante_Deberia_Devolver3SiGanoVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();

    expect(partido1.puntosVisitante()).toBe(3);
});

test('314_Cuando_PuntosVisitante_Deberia_Devolver0SiGanoLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();

    expect(partido1.puntosVisitante()).toBe(0);
});

test('315_Cuando_PuntosVisitante_Deberia_Devolver1SiEmpataron', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.sumarGolVisitante();
    partido1.sumarGolesLocalSuplementario();

    expect(partido1.equipoLocal.golSuplementario).toBe(1);
});

test('316_Cuando_SumarGolVisitanteSuplementario_Deberia_SumaUnGolAlVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.sumarGolVisitante();
    partido1.sumarGolesVisitanteSuplementario();

    expect(partido1.equipoVisitante.golSuplementario).toBe(1);
});

test('317_Cuando_ObtenerGolesLocalNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.sumarGolLocal();

    expect(partido1.obtenerGolesLocalNormal()).toBe(2);
});

test('318_Cuando_ObtenerGolesLocalSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.sumarGolVisitante();
    partido1.sumarGolesLocalSuplementario();
    partido1.sumarGolesLocalSuplementario();

    expect(partido1.obtenerGolesLocalSuplementario()).toBe(2);
});

test('319_Cuando_ObtenerGolesLocalTotal_Deberia_DevolverLaCantidadDeGolesTotalDelLocal', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolLocal();
    partido1.sumarGolVisitante();
    partido1.sumarGolesLocalSuplementario();
    partido1.sumarGolesLocalSuplementario();

    expect(partido1.obtenerGolesLocalTotal()).toBe(3);
});

test('320_Cuando_ObtenerGolesVisitanteNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();
    partido1.sumarGolVisitante();

    expect(partido1.obtenerGolesVisitanteNormal()).toBe(2);
});

test('321_Cuando_ObtenerGolesVisitanteSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();
    partido1.sumarGolLocal();
    partido1.sumarGolesVisitanteSuplementario();

    expect(partido1.obtenerGolesVisitanteSuplementario()).toBe(1);
});

test('322_Cuando_ObtenerGolesVisitanteTotal_Deberia_DevolverLaCantidadDeGolesTotalDelVisitante', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();
    partido1.sumarGolLocal();
    partido1.sumarGolesVisitanteSuplementario();

    expect(partido1.obtenerGolesVisitanteTotal()).toBe(2);
});

test('323_Cuando_EstaFinalizado_Deberia_DevolverTrueSiElPartidoFinalizo', () => {
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumarGolVisitante();
    partido1.sumarGolLocal();
    partido1.sumarGolesVisitanteSuplementario();
    partido1.finalizarPartido(true);

    expect(partido1.estaFinalizado()).toBe(true);
});

test('401_Cuando_SeCreaManager_Deberia_TenerUnNombre', () => {
    const man = new Manager("Manager1");

    expect(man.nombre).toBe("Manager1");
});

test('402_Cuando_AgregarGrupos_Deberia_TenerUnGrupo', () => {
    const manag = new Manager("Manager1");
    const g = new Grupo("C");
    g.AgregarEquipo("Argentina", "AR");
    g.AgregarEquipo("Mexico", "MX");
    g.AgregarEquipo("Arabia Saudita", "AS");
    g.AgregarEquipo("Polonia", "PO");
    manag.agregarGrupo(g)

    expect(manag.grupo[0].Equipos[0].getNombre()).toBe("Argentina");
});

test('403_Cuando_SeCreaManager_Deberia_CrearOctavos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    expect.arrayContaining(man.crearOctavos());
});

test('404_Cuando_SeCreaManager_Deberia_CrearCuartos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

test('405_Cuando_SeCreaManager_Deberia_CrearSemi', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    expect.arrayContaining(man.crearSemi());
});

test('406_Cuando_SeCreaManager_Deberia_CrearTercerPuesto', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearTercerPuesto());
});

test('407_Cuando_SeCreaManager_Deberia_CrearFinal', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearFinal());
});

test('501_Cuando_Partidos_Deberia_DevolverLosPartidosDeOctavos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearOctavos());
});

test('601_Cuando_Partidos_Deberia_DevolverLosPartidosDeCuartos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

test('701_Cuando_Partidos_Deberia_DevolverLosPartidosDeSemi', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

test('801_Cuando_Partidos_Deberia_DevolverLosPartidosDeTercerPuesto', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearTercerPuesto());
});

test('901_Cuando_Partidos_Deberia_DevolverLosPartidosDeFinal', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearFinal());
});
