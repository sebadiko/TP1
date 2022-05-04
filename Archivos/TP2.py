
import numpy as np
import os 
from numpy.lib.shape_base import split#Libreria de Calculo numerico para un gran volumen de datos

def menu():
    os.system("CLS")
    print("Metodos de Calculo")
    print("\n 1- Metodo de SOR")
    print("\t0 - Salir\n")
    try:
        numeroDeMetodo= int(input("Eliga una opcion (1-6): "))
    except ValueError:#En caso de error vuelve al menu
        menu()
    while True:#intentar cambiar
        try:
            ordenMatrizCoeficinte= int(input("Orden de la matriz de coeficiente: "))
        except:
                continue
        else:
                break
    print("Ingrese datos de la matriz de coeficientes")
    matrizCoeficiente=[]
    for i in range(ordenMatrizCoeficinte):
        while True:
            try:
                matriz = [float(x) for x in input("Fila {0}: ".format(i+1)).split()]
            except:
                continue
            else:
                if(len(matriz)== ordenMatrizCoeficinte):
                    matrizCoeficiente.append(matriz)
                    break
                else:
                    continue
    print("Ingresar datos de la matriz de terminos independientes")
    while True:
        try:
            matrizIndependiente = [float(x) for x in input("Terminos independientes: ").split()]
        except:
            continue
        else:
            if(len(matrizIndependiente)==ordenMatrizCoeficinte):
                break
            else:
                continue
    while True:
        try:
            w = float(input("Coeficiente de Relajacion: "))
        except:
            continue
        else:
            break
    while True:
        try:
            toleranciaAceptada= float(input("Ingresar numero de Tolerancia: "))
        except:
            continue
        else:
            break
    while True:
        try:
            iteracionesMaximas = int(input("Ingrese numero maximo de iteraciones: "))
        except:
            continue
        else:
            break
    metodoSOR(ordenMatrizCoeficinte, matrizCoeficiente, matrizIndependiente, np.zeros(ordenMatrizCoeficinte), w, toleranciaAceptada, iteracionesMaximas)
    atras()



def atras():
    input("\n>> Presione una tecla para volver al menu <<")
    menu()

# Metodo SOR

def metodoSOR(n, A, b, x, w, tol, kmax):
    #Valores iniciales
    #n                    #Orden de la matriz de coeficientes (N)
    #A                    #Datos de la matriz de coeficientes
    #b                    #Datos de la matriz de terminos independientes
    #x                    #Vector inicial de incognitas
    #w                    #Coeficiente de relajacion (w)
    #tol                  #Valor de la tolerancia aceptada
    #kmax                 #Número máximo de iteraciones
    error = 100000        #Valor inicial de la norma
    x1 = np.copy(x)       #Vector auxiliar de x
    k = 0                 #Contador inicial de iteraciones
    error1 = [0]

    #Algoritmo para el calculo SOR

    while error > tol:
        if(k > kmax):
            print('Error >>> Numero de Iteraciones Permitidas SUPERADAS!!!')
            break
        print("\n\nIteración: ", k)
        for i in range(n):
            sumatoria = 0
            for j in range(n):
                if i != j:
                    sumatoria += (A[i][j] * x[j])
            x[i] = (w * ((b[i] - sumatoria) / A[i][i])) + (1 - w) * x[i]
            print("x(", i,"): ", x[i])
        error = np.linalg.norm(x - x1)      #Cálculo de la norma vectorial
        error1.append(error)                #Se genera el vector error para ser graficado
        x1 = np.copy(x)                     #Actualiza vector solución iteración anterior
        print("  Error: ", error1[k])
        k += 1
menu()