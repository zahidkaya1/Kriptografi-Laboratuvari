//ALGORITHMROUTER PREPEARES PARAMS AND SELECTS ALGORRITHMS AND CALLS 
//MAIN ALGORITHMS

import * as step_engine from "../util/step_output_adder.js";
import * as RSA from "../algorithms/rsa_algorithm.js";
import * as output_parser from "../util/output_parser.js";
import * as viegene from "../algorithms/viegenere_algorithm.js"
// ALGORITHM ROUTER
export function algorithmRouter(algorithm,method){

  if (algorithm == "RSA") {
      if (method == "encrypt") {
     // GETTING PARAMS AND CLEANING UI    
        const prime1 = document.getElementById("asal1").value;
        const prime2 = document.getElementById("asal2").value;
        const text = document.getElementById("input_box").value;
        const output_area = document.getElementById("output_text");
        output_area.innerHTML = "Şifreli Mesaj : " ; 
        const steps_area = document.getElementById("steps_area");
        steps_area.innerHTML = "" ; 


     // ui_step_adder which is visualizing returned object
        step_engine.step_output_Adder(RSA.encryptRSA(prime1,prime2,text,method)) ;

        }
   
      if (method == "decrypt"){
        var key1 = document.getElementById("key1").value;
        var key2 = document.getElementById("key2").value; 
        var text = document.getElementById("input_box").value;
        text = output_parser.outputparserRSA(text); 
        RSA.decryptRSA(key1,key2,text);

      } 


  }
  if (algorithm == "Diffie-Helman") {
    if (method == "encrypt") {
      console.log("geldi");
}


if (method == "decrypt"){
      console.log("geldidecrypt");
      
} 

  }
  if (algorithm == "Viegenere") {
    if (method == "encrypt") {
        var anahtar = document.getElementById("asal1").value ;
        var text = document.getElementById("input_box").value;
        const steps_area = document.getElementById("steps_area");
        steps_area.innerHTML = "" ; 
        viegene.encryptViegenere(anahtar,text,method);

    }
if (method == "decrypt"){
      console.log("geldidecrypt");
      var anahtar = document.getElementById("asal1").value ;
        var text = document.getElementById("input_box").value;
        const steps_area = document.getElementById("steps_area");
        steps_area.innerHTML = "" ; 
        viegene.decryptViegenere(anahtar,text,method);
} 

  }
}