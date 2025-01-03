import * as util from '../util/output_parser.js';
import * as text_parser from "../util/text_parser.js"
import * as step_output_adder from "../util/step_output_adder.js"

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

export function encryptViegenere(anahtar,text,method,){
  object.steps = [] ;
  object.keys =[] ;
  const letters2= text_parser.textParser(text);
  console.log("text:", letters2);
  object.steps.push("1- Metnimizi karşılık gelen indexlere çevirdik: " + letters2);
  var letters3 = text_parser.textParser(anahtar);
  console.log("anahtar:", letters3); 
  object.steps.push("2- Anahtarımızı karşılık gelen indexlere çevirdik: " + letters3);
const toplamlar = [];

for (let i = 0; i < letters2.length; i++) {
  const indexShortArray = i % letters3.length;
  const toplam = letters2[i] + letters3[indexShortArray];
 toplamlar.push(toplam);
}
object.steps.push("3- Metnimiz ve anahtar değerlerimizi topladık: " + toplamlar);

console.log("Toplamlar:", toplamlar);

var harfler = text_parser.getIndexofAlphabeth(toplamlar);
object.steps.push("4- Topladığımız değeri harf karşılıklarına çevirdik: " + harfler);
object.crypted_text = harfler ; 
object.keys.push(anahtar);
console.log("Harfler:", harfler);
    step_output_adder.step_output_Adder_viegenere(object);
};


export function decryptViegenere(anahtar,text,method, ){
  object.steps = [] ;
  object.keys = [] ;
  console.log("decryptVeigenere");
  const letters4= text_parser.textParser(text);
  console.log("text:", letters4);
  object.steps.push("1.1- Şifrelenmiş metni karşılık gelen indexlere çevirdik: " + letters4);
  var letters5 = text_parser.textParser(anahtar);
  object.steps.push("2.1- Anahtarımızı karşılık gelen indexlere çevirdik: " + letters5);
  console.log("anahtar:", letters5); 
  const farklar=[];

  for (let i = 0; i < letters4.length; i++) {
    const indexShortArray = i % letters5.length;
    let fark = letters4[i] - letters5[indexShortArray];
  
    // Eğer fark 0'dan küçükse 50 ekle
    if (fark < 0) {
      fark += 50;
    }
    farklar.push(fark); // Farkı farklar dizisine ekle
  }
  object.steps.push("3.1- Metnimizin index değerlerinden ve anahtar değerlerimizi topladık: " + farklar);
console.log("farklar:", farklar);
var harfler2 = text_parser.getIndexofAlphabeth(farklar);
object.steps.push("4.1- Topladığımız değeri harf karşılıklarına çevirdik: " + harfler2);
object.crypted_text = harfler2 ; 
object.keys.push(anahtar);
console.log("Harfler:", harfler2);
step_output_adder.step_output_Adder_viegenere(object);


}