import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';

export class SnsSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SNSトピックを作成
    const topic = new sns.Topic(this, 'Topic', {
      topicName: 'pushTopic',
    });

  }
}
