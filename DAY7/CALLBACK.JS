function fetchData(callback) {
    setTimeout(() => {
        callback("done");
    }, 100000);
}

fetchData((result) => {
    console.log(result); 
});
