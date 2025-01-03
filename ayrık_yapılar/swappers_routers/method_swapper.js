//METHODSWAPPER CHANGES METHOD AND VISUALIZES
export function method_swapper () {
  let method_btn = document.getElementById("selected_method") ; 
      if (method_btn.innerHTML == "Seçili Method Şifreleme"){
        method_btn.innerHTML = "Seçili Method Deşifreleme";   
        document.getElementById("main_column_1"); 
        return "decrypt";    
      }
              else {
          method_btn.innerHTML = "Seçili Method Şifreleme" ; 
          return "encrypt";
        }
  ;
}