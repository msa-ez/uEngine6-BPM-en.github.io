// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '',
  // 주석 부분 : uengine6 뒤에 각 리스트의 타이틀을 출력하고 싶을때 사용
  // titleTemplate: 'uengine6 - %s',
  titleTemplate: 'uengine6',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://intro.bpm-getting-started5.io'),
  settings: {
    web: process.env.URL_WEB || false,
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || false,
    nav: {
      links: [
        { path: '/getting-started/', title: 'Docs' }
      ]
    },
    sidebar: [
      {
        name: 'getting-started',
        sections: [
          {
            title: 'uEngine6 BPM',
            items: [
              '/bpm6-intro/',
              '/bpm6-intro/business-process/',
              '/bpm6-intro/example-video/',
              // '/getting-started/bpm6-introduce/',
              // '/getting-started/bpm6-modeling/',
              // '/getting-started/modeling-tools/',
              // '/getting-started/database-table/',
              // '/getting-started/form-definition/',
              // '/getting-started/form-mapping/',
              // '/getting-started/conditional-branch/',
              // '/getting-started/multiple-instance/',
              // '/getting-started/process-monitoring/',
              // '/getting-started/soa-architecture-event/',
              // '/getting-started/soa-architecture-message/',
              // '/getting-started/bpm6-admin/',
              // '/getting-started/bpm6-data-management/',
            ]
          },
          {
            title: '모델링 및 실행',
            items: [
              '/bpm6-started/',
              '/bpm6-started/bpm6-modeling/',
              '/bpm6-started/form-definition/',
              '/bpm6-started/form-mapping/',
              '/bpm6-started/conditional-branch/',
              '/bpm6-started/multiple-instance/',
              // '/bpm6-started/script-task/',
              '/bpm6-started/bpm6-external/',
              '/bpm6-started/bpm6-execution/',
              
              // '/api-customizing/api-reference/',
              // '/api-customizing/message-listener/',
              // '/api-customizing/create-project/',
              // '/api-customizing/new-activity/',
              // '/api-customizing/migration/',
              // '/api-customizing/transaction-listener/',
              // '/api-customizing/script-task/',
              // '/api-customizing/bpm6-system-integration/',
            ]
          },
          {
            title: '운영 및 데이터관리',
            items: [
              '/bpm6-admin/',
              // '/bpm6-admin/bpm6-admin-instance/',
              '/bpm6-admin/bpm6-file/',
              '/bpm6-admin/bpm6-database/',
            ]
          },
          {
            title: '프로세스 API',
            items: [
              '/bpm6-api/',
              '/bpm6-api/bpm6-message-listener/',
              '/bpm6-api/bpm6-transaction-listener/',
            ]
          },
          // {
          //   title: 'AI를 활용한 프로세스 모델링 가이드',
          //   items: [
          //     '/ai-generating/',
          //     '/ai-generating/process-definition/',
          //     '/ai-generating/form-definition/',
          //   ]
          // },
          {
            title: 'BPMN 프로젝트 예제',
            items: [
              '/process-example/',
              // '/process-example/sub-process/',
              // '/process-example/call-activity/',
            ]
          },
          {
            title: '배포 및 설정 가이드',
            items: [
              '/bpm6-deploy-config/',
              '/bpm6-deploy-config/bpm6-deploy/',
              '/bpm6-deploy-config/uengine3-migration/',
            ]
          },
          {
            title: '프로세스 자산 라이브러리(PAL)',
            items: [
              '/pal-edition/',
              '/pal-edition/process-definition-map/',
              '/pal-edition/process-definition-edit/',
            ]
          },
          {
            title: '문의하기',
            items: [
              '/bpm6-contact/',
            ]
          },
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {  
      }
    }

  ]
}
