export function isLowerCase(char, alphabet = "TR") {
    if (alphabet === "TR") {
        return char === char.toLocaleLowerCase('tr-TR') && char !== char.toLocaleUpperCase('tr-TR');
    }
    return char === char.toLowerCase() && char !== char.toUpperCase();
}

export function toUpperCase(char, alphabet = "TR") {
    if (alphabet === "TR") {
        return char.toLocaleUpperCase('tr-TR');
    }
    return char.toUpperCase();
}

export function toLowerCase(char, alphabet = "TR") {
    if (alphabet === "TR") {
        return char.toLocaleLowerCase('tr-TR');
    }
    return char.toLowerCase();
}
