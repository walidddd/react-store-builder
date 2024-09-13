// helper functions
export interface UpdateQueryParamsUrl {
  key: string;
  value: string;
}

// schema values default
export interface DefaultSchemaValue {
  sections: any;
  order?: Array<string>;
}

export interface IframeMessage {
  action: string;
  itemId: any;
  type: string;
  destinationIndex?: number;
}
