//TEXTPARSER  
export function textParser(text) {
  const letters = text.split("").filter(char => /[a-zA-ZığüşöçİĞÜŞÖÇ 1234567890!,+#*-=]/,/%/);; 
  
  var convertedLetters = [] ; 
  for (let i = 0 ; i < letters.length ; i++) {
    
    convertedLetters[i] = getAlphabethQueue(letters , i );
  }
  return convertedLetters;
} ; 


// ALPHABET QUERIES OF LETTERS
  function getAlphabethQueue(array , i ) {

  const turkceAlfabe = [
  "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", 
  "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", 
  "u", "ü", "v", "y", "z", "w", "q", "x", " ", "0", "1", "2", 
  "3", "4", "5", "6", "7", "8", "9", ".", ",", "*", "!", "=", 
  "#", "+", "-", "%", "(", ")", "/", "%", "[", "]"
  ];

    let index = turkceAlfabe.indexOf(array[i].toLowerCase());

    if (index != -1 ) return index + 1 ; 
    else return NULL ;


  
} ; 
  export function getIndexofAlphabeth (array) {
    var result = [] ; 
    const turkceAlfabe = [
      "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", // row length12
      "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", // row length12
      "u", "ü", "v", "y", "z", "w", "q", "x", " ", "0", "1", "2", // row length12
      "3", "4", "5", "6", "7", "8", "9", ".", ",", "*", "!", "=", // row length12
      "#", "+", "-", "%", "(", ")", "/", "%", "[", "]"            // row length10
      //total lenght = 58
      ];
      for (let i = 0 ; i < array.length ; i++){
          let val = array[i] - 1 ; 
          val = val % 58 ; 
        if (turkceAlfabe[val]== " ") result[i] = " ";

        else {result[i] = turkceAlfabe[val] ; }
      }
      return result ; 
  }
  export function decrypt_step_output_Adder(text) {
    document.getElementById("output_text").innerHTML = "" ; 
    var key_text = document.getElementById("key_text");
    key_text.innerHTML = "" ; 
    key_text.innerHTML = "Orjinal Mesaj : " ;
    for(let i = 0 ; i < text.length ; i++) {
      key_text.innerHTML += text[i];
    }
  }