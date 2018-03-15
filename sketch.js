var fontRegular;
var fontBold;


//Genetic segment
var popSize;
var target;
var length;
var mutationRate;
var pop;
var flag;

//Maze generator Segment
var cols,rows;
var w = 30;
var grid = [];
var current;
var stack = [];

function preload()
{
  /*fontRegular = loadFont("./assets/Goldana Base.otf");
  fontBold = loadFont("./assets/Goldana Base.ttf");*/
}

function setup() {
  var canvas = createCanvas(windowWidth,300);
  flag = 1;
  canvas.parent('canvas');
  cols = floor(width/w);
  rows = floor(height/w);
  //frameRate(60);
  for(var j =0;j<rows;j++)
  {
    for(var i =0 ; i<cols; i++)
    {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  current = grid[0];

  //Genetic Algo initialization
  popSize = 200;
  target = "Krishna Vamsi Chandu";
  length = target.length;
  mutationRate = 0.01;
  pop = new population();
  pop.createPopulation();
}

function draw() {
  background(51);

  //Genetic Algorithm loop


  for(var i =0 ; i<grid.length;i++)
  {
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();
  if(next)
  {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);

    current = next;
  }
  else if(stack.length>0)
  {
    current = stack.pop();
  }
  if(flag == 1)
  {
    pop.calcFitness();

    pop.natSelection();
  }

  pop.printMax();

  if(pop.evaluate())
  {
    flag = 0;
  }
}

function index(i,j)
{
  if(i < 0 || j<0 || i>cols-1 || j>rows-1)
  {
    return -1;
  }
  return i + j * cols;
}



function removeWalls(a,b)
{
  var x = a.i - b.i;
  if(x == 1 )
  {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if( x == -1)
  {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if(y == 1 )
  {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if( y == -1)
  {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
