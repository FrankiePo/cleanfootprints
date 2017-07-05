export enum GraphWasteType {
  PAPER = 1,
  PLASTIC,
  GLASS,
  METAL,
  TEXTILE,
  FOOD,
  OTHER,
  TOTAL
}

export const GraphWasteTypeDefs = {
  [GraphWasteType.PLASTIC]: 'Пластик',
  [GraphWasteType.PAPER]  : 'Макулатура',
  [GraphWasteType.GLASS]  : 'Стекло',
  [GraphWasteType.METAL]  : 'Металл',
  [GraphWasteType.TEXTILE]: 'Текстиль',
  [GraphWasteType.FOOD]   : 'Пищевые отходы',
  [GraphWasteType.OTHER]  : 'Другие',
  [GraphWasteType.TOTAL]  : 'Итого',
};
