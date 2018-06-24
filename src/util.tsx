/**
 * Utilities used throughout the project
 */

export type primitive = string | number | symbol | boolean;

/**
 * Check if two primitive arrays are equal
 */
export function tupleEq(a: primitive[], b: primitive[]): boolean {
    if (a.length !== b.length) return false;
    return !a.some((a, i) => a !== b[i]);
}

/**
 * Limit text to a given number of characters
 * Respects word boundaries, Adds ... to end
 */
export function clipText(maxLength: number, text: string): string {
    if (text.length <= maxLength) return text;
    const words = text.split(/\s/);
    const result: string[] = [];
    let resultLength = 0;
    for (const word of words) {
        if ((resultLength + word.length) > maxLength) break;
        result.push(word);
        resultLength += word.length;
    }
    return `${result.join(" ")}...`;
}
