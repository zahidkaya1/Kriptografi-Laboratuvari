import test from 'node:test';
import assert from 'node:assert';
import { runRSA } from '../js/algorithms/rsa.js';

test('RSA Algoritması Testleri', async (t) => {
    
    await t.test('Başarılı Şifreleme ve Şifre Çözme (Sayısal)', () => {
        // Örnek: p=61, q=53, n=3233, phi=3120, e=17
        const message = "65";
        
        // Şifreleme
        const encResult = runRSA(61, 53, 17, message, 'encrypt');
        assert.strictEqual(encResult.n, "3233");
        assert.strictEqual(encResult.result, "2790");

        // Çözme
        const decResult = runRSA(61, 53, 17, encResult.result, 'decrypt');
        assert.ok(decResult.result.includes("65"));
    });

    await t.test('Başarılı Şifreleme ve Şifre Çözme (Metin)', () => {
        const message = "AB"; // A=65, B=66
        
        const encResult = runRSA(61, 53, 17, message, 'encrypt');
        // A (65) -> 2790, B (66) -> 524
        assert.strictEqual(encResult.result, "2790 524");

        const decResult = runRSA(61, 53, 17, encResult.result, 'decrypt');
        assert.ok(decResult.result.includes("AB"));
    });

    await t.test('Geçersiz p ve q (Asal değil)', () => {
        assert.throws(() => runRSA(4, 53, 17, "65"), /asal/);
        assert.throws(() => runRSA(61, 4, 17, "65"), /asal/);
    });

    await t.test('Geçersiz e değeri', () => {
        assert.throws(() => runRSA(61, 53, 1, "65"), /geçerli değil|arasında/i);
        // e = 2 aralarında asal değil (çünkü phi=3120, 2'ye tam bölünür)
        assert.throws(() => runRSA(61, 53, 2, "65"), /gcd/);
    });

});
