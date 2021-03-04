import { FoldoBuilder } from 'foldo/types';
declare type StaticOptions = {
    ignore?: RegExp;
    only?: RegExp;
    smart?: boolean;
};
export declare function identity(options: StaticOptions): FoldoBuilder;
export {};
