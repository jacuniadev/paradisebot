/**
 * Command prefix.
 */
export const commandPrefix: string = "#";

/**
 * Chacks if object is empty.
 * @param obj Any object.
 * @returns False if object isn't empty.
 */
export const isEmpty = (obj: Record<string, unknown>): boolean => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
