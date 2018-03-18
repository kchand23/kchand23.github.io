function randomChar()
{
  var i = floor(random(63,122));
  if(i == 63)
  {
    i = 32;
  }
  if( i == 64)
  {
    i = 46;
  }
  return String.fromCharCode(i);
}


function population()
{
  this.pool = [];
  this.matingPool = [];
  this.totalFitness = 0;
  this.maxFitness = 0;
  var max;
  this.calcFitness = function()
  {
    for(var i = 0; i < popSize; i++)
    {
      this.pool[i].calcFitness();
    }
  }

  this.natSelection = function()
  {
    this.matingPool = [];
    this.maxFitness = 0;
    for(var i = 0; i < popSize; i++ )
    {
      if(this.pool[i].fitness > this.maxFitness)
      {
        this.maxFitness = this.pool[i].fitness;
        max = this.pool[i];
      }
    }
    for(var i = 0 ; i < popSize; i++)
    {
      var fitness = map(this.pool[i].fitness,0,this.maxFitness,0,1);
      var n = floor(fitness * 100);
      for(var j =0; j<n ;j++)
      {
        this.matingPool.push(this.pool[i]);
      }
    }
    //console.log(this.matingPool.length);
    for(var i = 0; i < popSize ; i++)
    {
      //console.log(this.matingPool)
      var r = floor(random(this.matingPool.length));
      var parentA = this.matingPool[r];

      r = floor(random(this.matingPool.length));
      var parentB = this.matingPool[r];
      var child = parentA.crossOver(parentB);
      child.mutate();
      this.pool[i] = child;

    }
  }

  this.createPopulation = function()
  {
    for(var i = 0; i < popSize; i++)
    {
      var string = [];
      for(var j = 0; j < length; j++)
      {
        string[j] = randomChar();
      }
      this.pool[i] = new DNA(string);
    }
  }

  this.printMax = function()
  {
    console.log(max.content.join(''));
    textSize(72);
    fill(113,193,242);
    stroke(45,68,173);
    strokeWeight(6);
    textAlign(CENTER);
  //  textFont(fontBold);
    textStyle(BOLD);
    text(max.content.join(''),width/2,height/2);
    textLeading(30);
    strokeWeight(0.125);
  }

  this.evaluate = function()
  {
    if(max.fitness == target.length)
    {
      return 1;
    }
    else return 0;
  }
}
