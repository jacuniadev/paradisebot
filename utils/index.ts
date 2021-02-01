
export const commandPrefix: string = "#";

export const isEmpty = (obj: Record<string, unknown>) => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
