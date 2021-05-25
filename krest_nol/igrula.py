n = 3
gamepole = [["*" for i in range(n)] for j in range(n)]
for i in range(len(gamepole)):
    print(*gamepole[i])
num = n**2
x = 0
while True:
    x1 = int(input("Введите координату х: "))
    y1 = int(input("Введите координату y: "))
    znak = input("Введите знак 0 или X(eng): ")
    if gamepole[x1][y1] == "*":
        x += 1
        gamepole[x1][y1] = znak
        for i in range(len(gamepole)):
            print(*gamepole[i])
    else:
        print("Клетка занята")
    if x == num:
        break

f = open("result.txt", "w")
for i in range(n):
    b = str(gamepole[i])
    b = b + "\n"
    f.write(b)

f.close()