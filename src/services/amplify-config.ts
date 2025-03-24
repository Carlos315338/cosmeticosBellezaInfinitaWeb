// app/lib/amplify-config.ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_XXXXXXX',
      userPoolClientId: 'xxxxxxxxxxxxxxxxxxxx',
    },
  },
});
