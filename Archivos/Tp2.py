import numpy as np
import os
from numpy.lib.shape_base import split

#Menu inicial para la seleccion de los Ejercicios dados

def menu():
    os.system("CLS")
    print("Trabajo Practico N° 2\n")
    print("\t1 - Ejercicio 1: Metodo SOR")
    print("\t2 - Ejercicio 2: Ejemplo 1 SOR")
    print("\t3 - Ejercicio 2: Ejemplo 2 SOR")
    print("\t4 - Ejercicio 3: Metodo Potencia Inversa + Aitken")
    print("\t5 - Ejercicio 4: Ejemplo 1 Potencia Inversa + Aitken")
    print("\t6 - Ejercicio 4: Ejemplo 2 Potencia Inversa + Aitken")
    print("\t0 - Salir\n")
    try:
        opcionMenu = int(input("<< Inserta un numero valor >> "))
    except ValueError:
            menu()
    while True:
        if opcionMenu == 1:
            os.system("CLS")
            print("Ejercicio 1: Metodo SOR")
            while True:
                try:
                    orden = int(input("Ingrese orden de la matriz de coeficientes: "))
                except:
                    continue
                else:
                    break
            print("Ingrese datos de la matriz de coeficientes separados por espacios (Ej: 2 -1 3 -4)")
            matrizC = []
            for i in range(orden):
                while True:
                    try:
                        matriz = [float(x) for x in input("Fila {0}: ".format(i+1)).split()]
                    except:
                        continue
                    else:
                        if (len(matriz) == orden):
                            matrizC.append(matriz)
                            break
                        else:
                            continue    
            print("Ingrese datos de la matriz de terminos independientes separados por espacios (Ej: 2 -1 3 -4)")
            while True:
                try:
                    matrizI = [float(x) for x in input("Terminos independientes: ").split()]
                except:
                    continue
                else:
                    if (len(matrizI) == orden):
                            break
                    else:
                        continue  
            while True:
                try:
                    w = float(input("Ingrese coeficiente de relajacion: "))
                except:
                    continue
                else:
                    break
            while True:
                try:
                    tol = float(input("Ingrese tolerancia: "))
                except:
                    continue
                else:
                    break
            while True:
                try:
                    kmax = int(input("Ingrese numero maximo de iteraciones: "))
                except:
                    continue
                else:
                    break
            metodoSOR(orden, matrizC, matrizI, np.zeros(orden), w, tol, kmax)
            atras()
        elif opcionMenu == 2:
            os.system("CLS")
            print("Ejercicio 2: Ejemplo 1 SOR")
            metodoSOR(4, [[4, 1, -1, 1], [1, 4, -1, -1], [-1, -1, 5, 1], [1, -1, 1, 3]], [-2, -1, 0, 1], np.zeros(4), 1.2, 1e-3, 100)
            atras()
        elif opcionMenu == 3:
            os.system("CLS")
            print("Ejercicio 2: Ejemplo 2 SOR")
            metodoSOR(6, [[4, -1, 0, -1, 0, 0], [-1, 4, -1, 0, -1, 0], [0, -1, 4, 0, 0, -1], [-1, 0, 0, 4, -1, 0], [0, -1, 0, -1, 4, -1], [0, 0, -1, 0, -1, 4]], [0, 5, 0, 6, -2, 6], np.zeros(6), 1.2, 1e-3, 100)
            atras()
        elif opcionMenu == 4:
            os.system("CLS")
            print("Ejercicio 3: Metodo Potencia Inversa + Aitken")
            while True:
                try:
                    orden = int(input("Ingrese orden de la matriz de coeficientes: "))
                except:
                    continue
                else:
                    break
            print("Ingrese datos de la matriz de coeficientes separados por espacios")
            matrizC = []
            for i in range(orden):
                while True:
                    try:
                        matriz = [float(x) for x in input("Fila {0}: ".format(i+1)).split()]
                    except:
                        continue
                    else:
                        if (len(matriz) == orden):
                            matrizC.append(matriz)
                            break
                        else:
                            continue   
            print("Ingrese datos del autovector inicial separados por espacios")
            while True:
                try:
                    vector = [float(x) for x in input("AutoVector: ").split()]
                except:
                    continue
                else:
                    if (len(vector) == orden):
                            matrizC.append(matriz)
                            break
                    else:
                        continue   
            while True:
                try:
                    tol = float(input("Ingrese tolerancia: "))
                except:
                    continue
                else:
                    break
            while True:
                try:
                    kmax = int(input("Ingrese numero maximo de iteraciones: "))
                except:
                    continue
                else:
                    break
            metodoPIn(orden, np.array(matrizC), np.array(vector), tol, kmax)
            atras()
        elif opcionMenu == 5:
            os.system("CLS")
            print("Ejercicio 4: Ejemplo 1 Potencia Inversa + Aitken")
            metodoPIn(3, np.array([[1., -1., 0.], [-2., 4., -2.], [0., -1., 2.]]), np.array([-1., 2., 1.]), 1e-3, 100)
            atras()
        elif opcionMenu == 6:
            os.system("CLS")
            print("Ejercicio 4: Ejemplo 2 Potencia Inversa + Aitken")
            metodoPIn(4, np.array([[-4., 0., 0.5, 0.5], [0.5, -2., 0., 0.5], [0.5, 0.5, 0., 0.], [0., 1., 1., 4.]]), np.array([0., 0., 0., 1.]), 1e-3, 100)
            atras()
        elif opcionMenu == 0:
            exit(1)
        else:
            menu()

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


#Metodo Potencia Inversa

def metodoPIn(n, A, x, tol, kmax):
    #Valores iniciales
    #n                    #Orden de la matriz de coeficientes (N)
    #A                    #Datos de la matriz de coeficientes
    #x                    #AutoVector inicial considerado
    #tol                  #Valor de la tolerancia aceptada
    #kmax                 #Número máximo de iteraciones
    arrayAitken = []      #Array para almacenar los autovalores a usar en Aitken
    I = np.eye(n)         #Matriz Identidad

    #Header
    print("╔" + "═"*73 + "╗")
    print("║{0:^3} - {1:^37} - {2:^12} - {3:^12}║".format('i', 'AutoVector', 'AutoValor', 'Aitken'))
    print("╠" + "═"*73 + "╣")

    #Algoritmo Potencia Inversa
    k = 0
    q = np.dot(x, np.dot(A, x)) / np.dot(x, x)
    p = find_p(x)
    error = 1
    x = x / x[p]
    while error > tol:
        if(k > kmax):
            print('║ Error >>> Numero de Iteraciones Permitidas SUPERADAS!!!                          ║')
            break
        y = np.linalg.solve(A - q * I, x)       
        μ = y[p]      
        p = find_p(y)     
        error = np.linalg.norm(x - y / y[p],  np.inf)
        x = y / y[p]
        μ = (1 / μ) + q 
        #Al tener mas de 2 valores guardados en el Array de Aitken y uno mas en μ recientemente calculado se procede a usar el acelerdor de Aitken.
        if(len(arrayAitken)>1):
            #se calcula el aitken con los valores guardados + el recientemente calculado
            #se guarda el autovalor en el array de aitken para ser usado a futuro.
            #se imprime numero de iteracion, vector, aproximacion y el aitken
            aitkenResult = Aitken(arrayAitken[-2], arrayAitken[-1], μ)
            print(f"║{k:03d} - [{x[0]: 9.8f} {x[1]: 9.8f} {x[2]: 9.8f}] - {μ: >12.8f} - {aitkenResult: >12.8f}║")
            arrayAitken.clear()
        else:
            #se guarda el autovalor en el array de aitken para ser usado a futuro.
            #se imprime numero de iteracion, vector y aproximacion
            arrayAitken.append(μ)
            print(f"║{k:03d} - [{x[0]: 9.8f} {x[1]: 9.8f} {x[2]: 9.8f}] - {μ: >12.8f} - " + ' '*12 +  "║")
        k += 1
    print("╚" + "═"*73 + "╝")

def find_p(x):
    #Se calcula P
    return np.argwhere(np.isclose(np.abs(x), np.linalg.norm(x, np.inf))).min()

#Algoritmo de Aitken

def Aitken(p0, p1, p2):
    return p0-((p1-p0)**2)/(p2-2*p1+p0)


menu()