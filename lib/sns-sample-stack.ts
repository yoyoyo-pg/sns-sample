import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SnsSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // SNSトピックを作成
    const topic = new sns.Topic(this, 'Topic', {
      topicName: 'sampleTopic',
    });
    // メール送信先の設定
    topic.addSubscription(new subscriptions.EmailSubscription('yoyoyopg332@gmail.com'));
    // ARNをアウトプット
    new cdk.CfnOutput(this, 'TopicArn', {
      value: topic.topicArn,
      description: 'Topic ARN',
      exportName: 'TopicArn',
    });
    // Lambdaを作成してSNSトピックにメッセージを送信
    const sendEmailFunction = new NodejsFunction(this, 'SendEmailFunction', {
      entry: 'lambda/sendEmail.ts',
      handler: 'handler',
      environment: {
        TOPIC_ARN: topic.topicArn,
      },
    });
    // Lambdaにトピックへの公開権限を付与
    topic.grantPublish(sendEmailFunction);
  }
}
