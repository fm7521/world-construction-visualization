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
