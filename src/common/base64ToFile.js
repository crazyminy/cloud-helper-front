export function base64ToFile(dataurl,filename="file") { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/**
 * 
 * @param {File} file 
 * @param {number} resolution 目标分辨率
 * 
 */
export async function generateThumbnail(file,resolution=150){
    //第一步 file 转base64
    let base64 = await getBase64(file);
    //console.log(base64);
    //第二步 通过img 加载图片获得长和宽
    let [width,height,img] = await getWidthAndHeight(base64);
    //console.log(2);
    //第三部 通过canvas修改分辨率 base64Compressed
    let base64Compressed = compressImg(base64,resolution,width,height,img);
    //console.log(3);
    return base64Compressed;
}

/**
 * 
 * @param {File} file 
 * @returns {string} base64
 */
function getBase64(file){
    return new Promise(function(resolve,reject){
        let reader = new FileReader();
        reader.onload=function(){
            let base64 = reader.result;
            resolve(base64)
        }
        reader.readAsDataURL(file);
    });
}

/**
 * 
 * @param {string} base64 
 * @returns {[number,number,Image]} whi
 */
function getWidthAndHeight(base64){
    return new Promise(function(resolve,reject){
        let img = new Image();
        img.onload = function(e){
            resolve([e.target.width,e.target.height,img]);
        }
        img.src = base64;
    });
}

/**
 * 
 * @param {string} base64 
 * @param {number} resolution 
 */
function compressImg(base64,resolution,width,height,img){
    if(Math.max(width,height)<=resolution){
        //分辨率已经足够小，不必压缩
        return base64;
    }
    let canvas =  document.createElement('canvas');
    let tw,th;
    let radio = Math.max(width,height)/resolution;
    tw = width/radio;
    th = height/radio;
    canvas.width = tw;
    canvas.height = th;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0,tw,th);
    let base64Compressed = canvas.toDataURL("image/png",0.8);
    //console.log(base64Compressed);
    return base64Compressed;
}