export function delay(milliseconds: number = 1000): Promise<void> {
    // @ts-ignore
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
