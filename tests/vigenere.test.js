import test from 'node:test';
import assert from 'node:assert';
import { runVigenere } from '../js/algorithms/vigenere.js';

test('Vigenère Algoritması Testleri', async (t) => {
    
    await t.test('İngilizce Alfabe ile Şifreleme ve Çözme', () => {
        const text = "HELLO WORLD";
        const key = "KEY";
        
        // H(7) + K(10) = R(17)
        // E(4) + E(4) = I(8)
        // L(11) + Y(24) = J(9)
        // ...
        
        const encResult = runVigenere(text, key, "EN", "encrypt");
        assert.strictEqual(encResult.result, "RIJVS UYVJN");

        const decResult = runVigenere(encResult.result, key, "EN", "decrypt");
        assert.strictEqual(decResult.result, "HELLO WORLD");
    });

    await t.test('Türkçe Alfabe ile Şifreleme ve Çözme', () => {
        const text = "AÇIK HAVA ÖZLEMİ";
        const key = "ŞİFRE";
        
        const encResult = runVigenere(text, key, "TR", "encrypt");
        
        const decResult = runVigenere(encResult.result, key, "TR", "decrypt");
        assert.strictEqual(decResult.result, "AÇIK HAVA ÖZLEMİ");
    });

    await t.test('Türkçe Özel Harflerin Doğrulanması', () => {
        const text = "ÇĞIİÖŞÜ";
        const key = "ÇĞIİÖŞÜ";
        
        const encResult = runVigenere(text, key, "TR", "encrypt");
        const decResult = runVigenere(encResult.result, key, "TR", "decrypt");
        
        assert.strictEqual(decResult.result, "ÇĞIİÖŞÜ");
    });

    await t.test('Küçük Harflerin Korunması', () => {
        const text = "hello world";
        const key = "KEY";
        
        const encResult = runVigenere(text, key, "EN", "encrypt");
        assert.strictEqual(encResult.result, "rijvs uyvjn");
    });

    await t.test('Boşluk ve Özel Karakterlerin Korunması', () => {
        const text = "HELLO, WORLD! 123";
        const key = "KEY";
        
        const encResult = runVigenere(text, key, "EN", "encrypt");
        assert.strictEqual(encResult.result, "RIJVS, UYVJN! 123");
    });

    await t.test('Boş Anahtar Hata Vermeli', () => {
        assert.throws(() => runVigenere("HELLO", "", "EN", "encrypt"), /boş olamaz/);
    });

    await t.test('Geçersiz Karakter İçeren Anahtar', () => {
        assert.throws(() => runVigenere("HELLO", "KEY123", "EN", "encrypt"), /geçersiz bir karakter/);
    });

});
