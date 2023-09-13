import { LightningElement, track } from 'lwc';

export default class Lwc_Example extends LightningElement 
{
  @track n1;
  @track n2;
  @track n3;
  res;
  first(event)
  {
    this.n1 = event.target.value;
  }
  second(event)
  {
    this.n2 = event.target.value;
  }
  third(event)
  {
    this.n3 = event.target.value;
  }
  capture(event)
  {
    const wh = event.target.name;
    if(wh == 'aval')
    {
      this.n1 = event.target.value;

    }
    else if(wh == 'bval')
    {
      this.n2 = event.target.value;
    }
    else
    {
      this.n3 = event.target.value;
    }
  }
  calculate(event)
  {
    const a = parseInt(n1);
    const b = parseInt(n2);
    const c = parseInt(n3);
    if(a>b && a>c)
    {
        alert("The Greater Number Is :" +a);
    }
    else if(b>a && b>c)
    {
        alert("The greater number Is : " +b);
    }
    else
    {
        alert("The Greater Num Is : " +c);
    }
  }
  cancel(event)
  {
    this.n1 = '';
    this.n2 = '';
    this.n3 = '';
  }
}