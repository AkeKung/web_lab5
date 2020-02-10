let n1=Math.floor(Math.random()*100)+1;
let count=0;
document.querySelectorAll('input')[1].style.visibility="hidden";
document.querySelector('#pre').style.visibility="hidden";

 function check() {  
    let n2 =document.querySelector('reset').value;
    document.querySelector('#pre').style.visibility="visible";
    if(count<10){
    if(n2<0){
        alert("Please enter a positive integer!!!");
        document.querySelector('#hint').textContent="";
    } 
    else if(n1>n2){
        document.querySelector('#prev').textContent+=n2+" ";
        document.querySelector('#hint').textContent="Last guess was too low!";
    }else if(n1<n2){
        document.querySelector('#prev').textContent+=n2+" ";
        document.querySelector('#hint').textContent="Last guess was too high!";
    }else if(n1==n2){
        document.querySelector('#status').setAttribute("class","callout callout-success");
        document.querySelector('#Warning').textContent="You Win!!!";
        document.querySelectorAll('input')[1].style.visibility="visible";
        document.querySelector('#hint').textContent="";
    }else{
        alert("Please enter a integer!!!");
        document.querySelector('#hint').textContent="";
        }
    }else{
        alert("Game over!!!");
        document.querySelectorAll('input')[1].style.visibility="visible";
        document.querySelector('#Warning').textContent="Game over!!!";
        document.querySelector('#hint').textContent="";
    }
    count++;
    document.querySelector('input').value="";
}