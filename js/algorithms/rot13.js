import { runCaesar } from './caesar.js';

export function runROT13(text) {
    if (!text) throw new Error("Metin boş olamaz.");
    
    // ROT13, Sezar algoritmasının Latin (EN) alfabesinde 13 kaydırmalı özel türüdür.
    // Şifreleme ve çözme işlemleri aynıdır.
    return runCaesar(text, 13, "EN", "encrypt");
}
