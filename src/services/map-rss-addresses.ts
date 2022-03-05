import { RSSAddressDocument } from '../models/rss-addresses-response'
import { RSSFeedAddress } from '../models/rss-feed-data'
import { v4 as uuidv4 } from 'uuid'

export const mapFirebaseRSSAddress = (
  RSSAddress: RSSAddressDocument
): RSSFeedAddress => {
  return {
    id: uuidv4(),
    name: RSSAddress.fields.name.stringValue,
    url: RSSAddress.fields.url.stringValue,
  }
}
