export interface RSSAddressesResponse {
  documents: RSSAddressDocument[]
}

export interface RSSAddressDocument {
  name: string
  fields: RSSDocumentFields
  createTime: string
  updateTime: string
}

interface RSSDocumentFields {
  name: StringField
  url: StringField
}

interface StringField {
  stringValue: string
}
