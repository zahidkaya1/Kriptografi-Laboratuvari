// DISCRETE MATH PROJECT BY GORKEM MERT && MEHMED ZAHID KAYA 
// CRYPTOGRAPY TOOL FOR VISUALIZING ENCRYPT ALGORITHMS (RSA,DIFFIE-HELMAN,VIEGENERE)
// 
import * as algorithm_swapper from "./swappers_routers/algorithm_swapper.js"
import * as algorithm_router from "./swappers_routers/algorithm_router.js"
import * as method_swapper from "./swappers_routers/method_swapper.js"

 var RsaBackUp = document.getElementById("main_column_1").innerHTML;
 var method = "encrypt";
 var algorithm_type = document.getElementById("algorithms").value;

// METHOD SWAPPER
      document.getElementById("selected_method").addEventListener("click", () =>  {
          method = method_swapper.method_swapper();
          algorithm_swapper.algorithm_swapper(algorithm_type,RsaBackUp,method);
      });
// ALGORITHM SWAPPER 
      document.getElementById('algorithms').addEventListener('change', () => {
        algorithm_type = document.getElementById("algorithms").value;
        console.log(algorithm_type);
        algorithm_swapper.algorithm_swapper(algorithm_type,RsaBackUp,method);
      });

      //Algorithm Calculator
document.getElementById("calculate").addEventListener("click", () => {
  //ALGORITHM ROUTER && UI_STEP_ADDER
  algorithm_router.algorithmRouter(algorithm_type,method);        
  


  });

                  
  