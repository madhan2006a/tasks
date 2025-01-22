n=10;
if(n%2==0){
    console.log("even");
}
else{
    console.log("odd");
}

let i;
 for(i=0;i<=5;i++){
    console.log("*".repeat(i));
 }
 let a1=5;
for(i=0;i<=15;i++){
    console.log(i ,"* 5 =",i*5  );
}

let sum =0;
for(i=0;i<=50;i++){
    sum=sum+i;
}
console.log("Sum of numbers from 1 - 50 is ",sum);

//Arrow Function
const pattern = (n) =>{
    for(i=1;i<=n;i++)
        console.log("*".repeat(i));

 }
 pattern(7); 
 function abc(x,y){
    console.log(x+y);
}
abc(2,2);

function abc(name,company){
    console.log("hi "+ name +"  welcome to "+company);
}
abc("akv","tcs");
