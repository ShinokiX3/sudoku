export const getRandomNumber = (min: number, max: number, withOut?: number): number => {
    let num: number = Math.floor(min + Math.random() * (max + 1 - min));
    if (withOut) {
        do {
            num = Math.floor(min + Math.random() * (max + 1 - min));
        } while (num === withOut)
    }
    return num;
  }