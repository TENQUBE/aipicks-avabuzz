/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'buzzvil-thinkpool-webview',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          // version: '6.52.0',
          region: 'ap-northeast-2'
        }
      }
    }
  },
  async run() {
    new sst.aws.Nextjs('BuzzvilThinkpoolWebview', {
      domain: {
        name: 'aipicks-avabuzz.tenqube.com',
        cert: 'arn:aws:acm:us-east-1:253030741903:certificate/80564239-ddf5-4e0c-9a11-e5fbb169aaab'
      },
      imageOptimization: {
        memory: '512 MB'
      },
      cachePolicy: 'e8dedd57-e582-49b0-9f72-c956bd2d12ec',
      environment: {
        NEXT_PUBLIC_COUPANG_PARTNERS_API_ACCESS_KEY:
          process.env.NEXT_PUBLIC_COUPANG_PARTNERS_API_ACCESS_KEY!,
        NEXT_PUBLIC_COUPANG_PARTNERS_API_SECRET_KEY:
          process.env.NEXT_PUBLIC_COUPANG_PARTNERS_API_SECRET_KEY!,
        NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV!
      }
    })
  }
})
