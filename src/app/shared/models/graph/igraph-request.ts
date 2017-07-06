import { GraphWasteType } from './graph-waste-type.enum';

export interface IRecycle {
  fromYear: number;
  type: GraphWasteType;
  amountPerMonth: number;
}

export interface IGraphRequest {
  birthdays: number[];
  privateRecycling?: IRecycle[];
}
