const map = {
    â: 'a',
    Â: 'A',
    à: 'a',
    À: 'A',
    á: 'a',
    Á: 'A',
    ã: 'a',
    Ã: 'A',
    ê: 'e',
    Ê: 'E',
    è: 'e',
    È: 'E',
    é: 'e',
    É: 'E',
    î: 'i',
    Î: 'I',
    ì: 'i',
    Ì: 'I',
    í: 'i',
    Í: 'I',
    õ: 'o',
    Õ: 'O',
    ô: 'o',
    Ô: 'O',
    ò: 'o',
    Ò: 'O',
    ó: 'o',
    Ó: 'O',
    ü: 'u',
    Ü: 'U',
    û: 'u',
    Û: 'U',
    ú: 'u',
    Ú: 'U',
    ù: 'u',
    Ù: 'U',
    ç: 'c',
    Ç: 'C',
};

export class Utils {
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }

    static removerAcentos(s: string) {
        return s.replace(/[\W\[\] ]/g, function(a: string) {
            return map[a] || a;
        });
    }
}
