module.exports = function(source){
    if(source){
        console.log("----reverse loader input:"+source);
        source = source.split("").reverse().join("");
        console.log("----reverse loader input:"+source);
    }
    return source;
}