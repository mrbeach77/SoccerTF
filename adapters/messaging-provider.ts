export interface MessagingProvider {
  sendMessage(params: {
    fromUserId: string;
    toOwnerId: string;
    message: string;
  }): Promise<void>;
}

export const messagingProvider: MessagingProvider = {
  async sendMessage() {
    throw new Error("Messaging is not enabled in MVP v1.");
  }
};
