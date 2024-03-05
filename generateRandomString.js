const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


function generateString(length) { 
    let result = '';
    for (i = 0; i < length; i++) { 
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports ={generateString}