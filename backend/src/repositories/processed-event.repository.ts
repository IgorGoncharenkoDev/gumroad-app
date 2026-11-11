export type ProcessedEventRepository = {
  // true - the request successfully claimed the event, continue processing
  // false - the event was already claimed, do nothing
  claim(stripeEventId: string): Promise<boolean>
}
