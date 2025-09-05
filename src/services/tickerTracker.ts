export class TickerTracker {
  private static LastMessage = new Map();

  static lastTicker(userId: string, callerMessageId: string, imageMessageId: string): void {
    TickerTracker.LastMessage.set(userId, { callerMessageId, imageMessageId });
  }

  static getCallerMessage(userId: string): string {
    const message = TickerTracker.LastMessage.get(userId);
    if (message !== undefined) {
      return message.callerMessageId;
    }
    return undefined;
  }

  static getImageMessage(userId: string): string {
    const message = TickerTracker.LastMessage.get(userId);
    if (message !== undefined) {
      return message.imageMessageId;
    }
    return undefined;
  }
}
