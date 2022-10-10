import { TTimer } from "../types";

export const formateTime = (clock: TTimer): string => {
    const minutes = clock.minutes < 10 ? '0' + clock.minutes : clock.minutes; 
    const seconds = clock.seconds < 10 ? '0' + clock.seconds : clock.seconds;
    return `${minutes}:${seconds}`;
}