const fetch=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("fetched");
    },2000);
});
fetch.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.error(error);
});