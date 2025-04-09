
export interface SchemaElement {
  id: string;
  element_nr: string;
  html_tag?: string;
  html_name?: string;
  html_id?: string;
  type?: string;
  value?: string;
  schema_id: string;
  class?: string;
  onchange?: boolean;
  onblur?: boolean;
  size?: number;
  maxlength?: number;
  pattern?: string;
  padding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export interface Schema {
  id: string;
  name: string;
  elements: SchemaElement[];
}

export interface SchemaResponse {
  schema_name: string;
  element1_resp: string;
  element2_resp: string;
  element3_type: string;
  element10_resp: string;
  element10_type: string;
}
