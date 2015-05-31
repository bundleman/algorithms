function MapGen(b, c, e, a, m) {

    // Выбираем область рисования
    var d = b.getContext("2d");
    clearInterval(d.timer);

    // Зададим ширину и высоту области лабиринта
    b.width = 13 * c + 3;
    b.height = 13 * e + 3;

    // И закрасим в черный цвет
    d.fillStyle = "black";
    d.fillRect(0, 0, 13 * c + 3, 13 * e + 3);

    // Объявим массивы для хранения значения множества текущей ячейки, для значения стенки справа и для значения стенки снизу
    a = Array(c);
    b = Array(c);
    var k = Array(c),

    // Текущее множество
        q = 1;

    // Цикл по строкам
    for (cr_l = 0; cr_l < e; cr_l++) {
        // Проверка принадлежности ячейки в строке к какому-либо множеству
        for (i = 0; i < c; i++)
            0 == cr_l && (a[i] = 0),
                d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10), k[i] = 0, 1 == b[i] && (b[i] = a[i] = 0), 0 == a[i] && (a[i] = q++);

        // Создание случайным образом стенок справа и снизу
        for (i = 0; i < c; i++) {
            k[i] = Math.floor(2 * Math.random()), b[i] = Math.floor(2 * Math.random());

            if ((0 == k[i] || cr_l == e - 1) && i != c - 1 && a[i + 1] != a[i]) {
                var l = a[i + 1];
                for (j = 0; j < c; j++) a[j] == l && (a[j] = a[i]);
                d.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10)
            }
            cr_l != e - 1 && 0 == b[i] &&
            d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15)
        }

        // Проверка на замкнутые области.
        for (i = 0; i < c; i++) {
            var p = l = 0;
            for (j = 0; j < c; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
            0 == p && (b[i] = 0, d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15))
        }
    }

    // Рисуем выход из лабиринта
    d.clearRect(13 * c, 3, 15, 10);
    // Обнуляем текущие координаты персонажа
    var f = 0,
        g = 0;
    // Задаем крассный цвет

    d.fillStyle = "red";


    //проверка на стены
    this.getPixel = function(a, b, y, x)
    {
        var h = d.getImageData(13 * x + 7 + 6 * a, 13 * y + 7 + 6 * b, 1, 1),
            can =true;
        if(0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3])
        {
            can=false;
        }
        return can;
    };

    //найденый путь
    this.path = [];

    //рисование пути
    this.drawLine = function(){
        for (var j = 0; j < this.path.length; j++) {
            d.fillRect(3 + 13 * this.path[j][1], 13 * this.path[j][0]+3, 10, 10);
        }

    };

    //анимация пути в лабиринте
    this.animateWay = function() {
        var i= 0,
            self = this;
        d.fillStyle = "green";

        return function() {
            d.clearRect(13 * self.path[i][1] + 3, 13 * self.path[i][0] + 3, 10, 10);
            d.fillRect(3 + 13 * self.path[i][1], 13 * self.path[i][0] + 3, 10, 10);
            if (i == self.path.length - 1) {
                return true;
            }
            i += 1;
        }
    };

    //поиск пути в лабиринте
    this.findPath = function(startY, startX, finishY, finishX, animate)
    {
        if(this.path.length !=0){
            return;
        }
        //направления перемещений в массиве
        //0 -1 движение в верх
        //0 1 движение в низ
        //1 0 движение в право
        //-1 0 движение в лево
        var k = [0, 0, -1, 1],
            l = [-1, 1, 0, 0],

        //приращение итераций в лабиринте
            step = 0,

        //массив текщих точек
            currentPoint = [],

        //массив смежнхы точек
            relPoint = [],

        // Создать многомерный массив, будет являться рабочим - т.е., который будет в дальнейшем заполнен расстояниями от
        //стартовой точки до конечной.
            g = new Array(e);
        for (var p = 0; p < g.length; p++) {
            g[p] = new Array(c);
        }

        // Инициализировать массив
        for (var row = 0; row < g.length; row++) {
            for (var col = 0; col < g[row].length; col++) {
                g[row][col] = -1;
            }
        }

        //начальная точка в лабиринте для рабочего массива 0
        g[startY][startX] = 0;
        //помещаем в массив текущую точку
        currentPoint.push([startY, startX]);

        //пока не просмотрели все точки
        outer:  while (currentPoint.length > 0) {

            //будем увеличивать кол-во иттераций по лабиринту
            ++step;
            relPoint = [];

            //проходимся по найденым точкам в поисках возможных соседей
             for (var ci = 0; ci < currentPoint.length; ci++) {

                var i = 0;
                while (i < 4) {

                    //просматриваем соседние точки на возможность прохода по ним
                    if (this.getPixel(k[i], l[i], currentPoint[ci][0], currentPoint[ci][1]) == true &&
                        g[currentPoint[ci][0] + l[i]][currentPoint[ci][1] + k[i]] == -1) {

                        //заполняем рабочий массив расстоянием от начально до смежной точки
                        g[currentPoint[ci][0] + l[i]][currentPoint[ci][1] + k[i]] = step;

                        //помещаем в массив relPoint найденные соседние точки
                        relPoint.push([currentPoint[ci][0] + l[i], currentPoint[ci][1] + k[i]]);

                        //если нашли финиш - останавливаемся.
                        if(currentPoint[ci][0] + l[i] ==finishX&&currentPoint[ci][1] + k[i] ==finishY){
                            break outer;
                        }

                    }

                    i += 1;
                }
            }

            //теперь текущий набор это соседние точки
            currentPoint = relPoint.slice();
        }
        console.log(g);

        //восстанавливаем путь
        createPath(this);

        //восстановление пути
        function createPath() {
            var y = finishY,
                x = finishX,
                self = arguments[0],
                path=[];

            path.push([x, y]);

            //пока не неашлти старт т.е. точка 0, ищем...
            while (g[x][y] != 0) {
                var i = 0;
                while (i < 4) {

                    if (self.getPixel(k[i], l[i], x, y) == true) {

                        //...самый короткий путь до старта
                        if (g[x][y] - 1 == g[x + l[i]][y + k[i]]) {
                            x = x + l[i];
                            y = y + k[i];
                            //помещаем найденную точку в массив
                            path.push([x, y, l[i], k[i]]);

                            //выходим из первого цикла
                            break;

                        }
                    }

                    i += 1;
                }
            }

            self.path = path.reverse();

            if(animate) {
                //вывод пути
                self.drawLine();

                //и анимация
                var animWay = self.animateWay();

                d.timer = setInterval(function(){
                    if(animWay()){
                        clearInterval(d.timer);
                    }
                },50);
            }
        }

    };
}
