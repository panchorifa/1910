export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: '1910-app'
  },
  apiGateway: {
    URL: 'https://vmc7ok7cl3.execute-api.us-west-2.amazonaws.com/prod',
  },
  cognito: {
    USER_POOL_ID : 'us-west-2_BSqaA3qPX',
    APP_CLIENT_ID : '1hm0s868s3v1jfpbc4e0ddipln',
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:96f44cfa-4fb9-4a98-bef5-b53274be9574',
  }
};
