function DNA(string)
{
  this.fitness;
  this.content = string;
  this.chance = 0;




  this.calcFitness = function()
  {
    this.fitness = 0;
    for(var i = 0; i < this.content.length; i++)
    {
      if(this.content[i] == target[i])
      {
        this.fitness++;
      }
    }
  }

  this.crossOver = function(parentB)
  {
    var midPoint = floor(random(0,this.content.length));
    var string = [];
    for(var i = 0; i < midPoint; i++ )
    {
      string[i] = this.content[i];
    }
    for(var j = midPoint; j < parentB.content.length; j++)
    {
      string[j] = parentB.content[j];
    }
    var child = new DNA(string);

    return child;
  }

  this.mutate = function()
  {
    for(var i =0 ; i<this.content.length ; i++ )
    {
      var r = random(1);
      if(r < mutationRate)
      {
        this.content[i] = randomChar();
      }
    }
  }
}
