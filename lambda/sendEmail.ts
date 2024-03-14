import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({});

export const handler = async (event: any) => {
  const topicArn = process.env.TOPIC_ARN;

  const params = {
    Message: 'Hello, this is a notification from Lambda!',
    TopicArn: topicArn,
  };

  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log('Message sent successfully:', data);
  } catch (err) {
    console.error('Error sending message:', err);
  }
};