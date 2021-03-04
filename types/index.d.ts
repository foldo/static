import { FoldoBuilder } from 'foldo/types';
declare type StaticOptions = {
    ignore?: RegExp;
    only?: RegExp;
    smart?: boolean;
};
export declare function copyTo(destination: string | undefined, options: StaticOptions): FoldoBuilder;
export {};
