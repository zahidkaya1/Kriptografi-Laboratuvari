//RSA ALGORITHM HAS 2 FUNC encrypt && decrypt 
//OBJECT == RESULT_OBJECT THIS FUNCS
//RETURNS RESULTS AS OBJECT AND STEP_ADDER VISUALIZES

import * as util from '../util/output_parser.js';
import * as text_parser from "../util/text_parser.js"
var decrypted_text = [] ; 
var steps_text = [] ; 
var crypted_text = [] ; 
var keys = [] ; 

let object = {
  steps : steps_text,
  crypted_text: crypted_text,
  keys : keys,
  decrypted_text : decrypted_text 
};

export function encryptRSA(prime1 ,prime2 ,text,method,key){
 
     prime1 = prime1 || 3137 ; 
     prime2 = prime2 || 2963 ;   
     key = key || 0 ;
  object.steps = [] ;
  object.crypted_text = [] ;  
  object.keys = [] ; 
  object.decrypted_text = [] ; 
      var n = prime1 * prime2 ; 
  object.steps.push(`1- Asal sayılar p ve q ${prime1} ve ${prime2} olarak kabul edildi.`);
      var r =(prime1 - 1)* (prime2 - 1);
  object.steps.push(`2- n = Modulus = p*q.`);
  object.steps.push(`3- n = ${prime1 * prime2} olarak hesaplandı. `);
  object.steps.push(`4- r = FI = (p-1) * (q-1).`);
  object.steps.push(`5- r = ${(prime1-1)*(prime2-1)} olarak hesaplandı.`);
  object.steps.push(`6- Açık Anahtar e ve FI arasında asal olarak seçilmeli.`) ; 
  

    var e = lessestPrime(r); 
    var temp_e = 0 ;
    var d = 0  ; 
    var i = 0 ; 
    // CALCULATING PRIVATE KEY  WHICH IS d * e = 1 mod (r)
    for (let i = 1 ; i < 2000 ; i++) {
        d = ((r*i)+1)/e ; 
        console.log("d",d,"e",e);
        if (Number.isInteger(d)) break ;   
    };

  object.steps.push(`7- Açık Anahtar e ${e} olarak kabul edildi.`) ;
  object.steps.push(`8- Özel Anahtar d x e = 1 mod (FI) olarak hesaplanır.`) ;
  object.steps.push(`9- Özel Anahtar d = ${d} olarak hesaplandı.`) ;
  object.steps.push(`10- Açık Anahtar = (e,n) . Gizli Anahtar = (d,n)`) ;
  object.steps.push(`10- Açık Anahtar = (${e},${n}) . Gizli Anahtar = (${d},${n})`) ;
  object.steps.push(`11- Şifreli Metin => c = mesaj^e mod n.`) ;
  object.keys.push(e) ; 
  object.keys.push(n);
  object.keys.push(d);
  const letters = text_parser.textParser(text);
  console.log("text",letters);
   for (let i = 0 ; i < text.length ; i++) {
    
    object.crypted_text[i] = Math.pow(letters[i],e);
    object.crypted_text[i] = object.crypted_text[i] % n ; 
    // 11 => 11^e 
    console.log("crypted[",i,"]", object.crypted_text[i]);
   }
   return object; 
};

// DECRYPT OF RSA
export function decryptRSA(key1, key2, text){
  decrypted_text = [] ; 
  steps_text =  [] ; 
  keys = [] ; 
  console.log("text",text);
  console.log("d",key1,"r",key2);
  for (let i = 0 ; i < text.length ; i++) {
      var value = text[i] ; 
      decrypted_text[i] = modularExponantion(value,key1,key2);
  }
  console.log("decrypted",decrypted_text);
  var result = text_parser.getIndexofAlphabeth(decrypted_text);
  console.log("result",result);
  text_parser.decrypt_step_output_Adder(result);
}

// bu çok uğraştırdı mantığını kurmam 2 saatimi yedi e < f(n) hesaplıyoruz ama e asal olcak hemde e ve fn arasında asal olacak
// ben en küçük e yi seçtim çünkü e büyük olursa üsler uçuyor üsler uçunca hesaplanmıyor
function lessestPrime(num) {

  for (let i = 2 ; i < num ; i++) {

      if (isPrime(i) && (num%i != 0 )) return i ;     
  }
}
function isPrime(num) {
  if (num %2 == 0 ) return false ;
  var val = true ; 
  for (let i = 3 ; i < num ; i++) {
    if (num % i == 0 ) {
      val = false ; 
      return val ; 
    } ;
  }
  return val ; 
}

// hocam bayılcam artık bu fonksiyonlar yaz yaz bitmiyor 17/12/2024 5.56 a.m. - Görkem Mert
// yukarda üsler uçuyor engellemeye çalışıyorum yazmıştım boşunaymış yine uçtu bu yüzden mod alırken normal mod alma islemi degil
// üsleri böle böle tabanı çarpa çarpa küçültüp büyülterek adım sayısını insani bir boyutta tutacağız
function modularExponantion(value,pow,modulus){

  let result = 1;
  value = value % modulus; 

  while (pow > 0) {
    if (pow % 2 === 1) {
      result = (result * value) % modulus;
    }
    pow = Math.floor(pow / 2);
    value = (value * value) % modulus;
  }

  return result;
}







