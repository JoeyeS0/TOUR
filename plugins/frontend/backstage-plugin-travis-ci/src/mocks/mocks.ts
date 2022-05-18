export const entityMock = {
  metadata: {
    namespace: 'default',
    annotations: {
      'backstage.io/managed-by-location':
        'url:https://github.com/mcalus3/sample-service/blob/master/backstage2.yaml',
      'cloud.google.com/function-ids':
        'projects/backstage-test-project/locations/us-central1/functions/helloMarek',
      'travis-ci.com/repo-slug': 'RoadieHQ/sample-service',
    },
    name: 'sample-service',
    description:
      'A service for testing Backstage functionality. For example, we can trigger errors\non the sample-service, these are sent to Sentry, then we can view them in the \nBackstage plugin for Sentry.\n',
    uid: '59f02dec-056a-4b8a-aed8-7f05f7e120f0',
    etag: 'ODkwZjcyZDktZDBhNi00MGIxLWI1MDYtMzZiYjA0ZjJhNmU3',
    generation: 1,
  },
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  spec: {
    type: 'service',
    owner: 'david@roadie.io',
    lifecycle: 'experimental',
  },
};

export const buildsResponseMock = {
  '@type': 'builds',
  '@href': '/repo/RoadieHQ%2Fsample-service/builds?offset=0&limit=5',
  '@representation': 'standard',
  '@pagination': {
    limit: 5,
    offset: 0,
    count: 196,
    is_first: true,
    is_last: false,
    next: {
      '@href': '/repo/RoadieHQ%2Fsample-service/builds?limit=5&offset=5',
      offset: 5,
      limit: 5,
    },
    prev: null,
    first: {
      '@href': '/repo/RoadieHQ%2Fsample-service/builds?offset=0&limit=5',
      offset: 0,
      limit: 5,
    },
    last: {
      '@href': '/repo/RoadieHQ%2Fsample-service/builds?limit=5&offset=195',
      offset: 195,
      limit: 5,
    },
  },
  builds: [
    {
      '@type': 'build',
      '@href': '/build/211828509',
      '@representation': 'standard',
      '@permissions': {
        read: true,
        cancel: false,
        restart: false,
        prioritize: false,
      },
      id: 211828509,
      number: '196',
      state: 'passed',
      duration: 30,
      event_type: 'push',
      previous_state: 'passed',
      pull_request_title: null,
      pull_request_number: null,
      started_at: '2021-01-04T18:28:53Z',
      finished_at: '2021-01-04T18:29:23Z',
      private: false,
      priority: false,
      repository: {
        '@type': 'repository',
        '@href': '/repo/15022857',
        '@representation': 'minimal',
        id: 15022857,
        name: 'sample-service',
        slug: 'RoadieHQ/sample-service',
      },
      branch: {
        '@type': 'branch',
        '@href': '/repo/15022857/branch/master',
        '@representation': 'minimal',
        name: 'master',
      },
      tag: null,
      commit: {
        '@type': 'commit',
        '@representation': 'minimal',
        id: 476342585,
        sha: '0f076e43771187aef8b46f52fc80b7f90f500be9',
        ref: 'refs/heads/master',
        message: 'Update catalog-info-5.yaml',
        compare_url:
          'https://github.com/RoadieHQ/sample-service/compare/824758217aa3...0f076e437711',
        committed_at: '2021-01-04T18:28:30Z',
      },
      jobs: [
        {
          '@type': 'job',
          '@href': '/job/468235031',
          '@representation': 'minimal',
          id: 468235031,
        },
      ],
      stages: [],
      created_by: {
        '@type': 'user',
        '@href': '/user/3854968',
        '@representation': 'minimal',
        id: 3854968,
        login: 'iain-b',
      },
      updated_at: '2021-01-04T18:29:23.191Z',
    },
    {
      '@type': 'build',
      '@href': '/build/211809894',
      '@representation': 'standard',
      '@permissions': {
        read: true,
        cancel: false,
        restart: false,
        prioritize: false,
      },
      id: 211809894,
      number: '195',
      state: 'passed',
      duration: 30,
      event_type: 'push',
      previous_state: 'passed',
      pull_request_title: null,
      pull_request_number: null,
      started_at: '2021-01-04T15:52:02Z',
      finished_at: '2021-01-04T15:52:32Z',
      private: false,
      priority: false,
      repository: {
        '@type': 'repository',
        '@href': '/repo/15022857',
        '@representation': 'minimal',
        id: 15022857,
        name: 'sample-service',
        slug: 'RoadieHQ/sample-service',
      },
      branch: {
        '@type': 'branch',
        '@href': '/repo/15022857/branch/master',
        '@representation': 'minimal',
        name: 'master',
      },
      tag: null,
      commit: {
        '@type': 'commit',
        '@representation': 'minimal',
        id: 476265936,
        sha: '824758217aa31af62c92916ea926b59884584277',
        ref: 'refs/heads/master',
        message: 'Update catalog-info-5.yaml',
        compare_url:
          'https://github.com/RoadieHQ/sample-service/compare/caca78a523de...824758217aa3',
        committed_at: '2021-01-04T15:51:42Z',
      },
      jobs: [
        {
          '@type': 'job',
          '@href': '/job/468139568',
          '@representation': 'minimal',
          id: 468139568,
        },
      ],
      stages: [],
      created_by: {
        '@type': 'user',
        '@href': '/user/3854968',
        '@representation': 'minimal',
        id: 3854968,
        login: 'iain-b',
      },
      updated_at: '2021-01-04T15:52:32.102Z',
    },
    {
      '@type': 'build',
      '@href': '/build/211809861',
      '@representation': 'standard',
      '@permissions': {
        read: true,
        cancel: false,
        restart: false,
        prioritize: false,
      },
      id: 211809861,
      number: '194',
      state: 'passed',
      duration: 30,
      event_type: 'push',
      previous_state: 'passed',
      pull_request_title: null,
      pull_request_number: null,
      started_at: '2021-01-04T15:51:42Z',
      finished_at: '2021-01-04T15:52:12Z',
      private: false,
      priority: false,
      repository: {
        '@type': 'repository',
        '@href': '/repo/15022857',
        '@representation': 'minimal',
        id: 15022857,
        name: 'sample-service',
        slug: 'RoadieHQ/sample-service',
      },
      branch: {
        '@type': 'branch',
        '@href': '/repo/15022857/branch/master',
        '@representation': 'minimal',
        name: 'master',
      },
      tag: null,
      commit: {
        '@type': 'commit',
        '@representation': 'minimal',
        id: 476265768,
        sha: 'caca78a523de50e40a682922e58dc000440322ad',
        ref: 'refs/heads/master',
        message: 'Create catalog-info-5.yaml',
        compare_url:
          'https://github.com/RoadieHQ/sample-service/compare/f898b0c0e1c8...caca78a523de',
        committed_at: '2021-01-04T15:51:23Z',
      },
      jobs: [
        {
          '@type': 'job',
          '@href': '/job/468139458',
          '@representation': 'minimal',
          id: 468139458,
        },
      ],
      stages: [],
      created_by: {
        '@type': 'user',
        '@href': '/user/3854968',
        '@representation': 'minimal',
        id: 3854968,
        login: 'iain-b',
      },
      updated_at: '2021-01-04T15:52:12.120Z',
    },
    {
      '@type': 'build',
      '@href': '/build/209972929',
      '@representation': 'standard',
      '@permissions': {
        read: true,
        cancel: false,
        restart: false,
        prioritize: false,
      },
      id: 209972929,
      number: '193',
      state: 'passed',
      duration: 52,
      event_type: 'push',
      previous_state: 'passed',
      pull_request_title: null,
      pull_request_number: null,
      started_at: '2020-12-20T17:27:39Z',
      finished_at: '2020-12-20T17:28:31Z',
      private: false,
      priority: false,
      repository: {
        '@type': 'repository',
        '@href': '/repo/15022857',
        '@representation': 'minimal',
        id: 15022857,
        name: 'sample-service',
        slug: 'RoadieHQ/sample-service',
      },
      branch: {
        '@type': 'branch',
        '@href': '/repo/15022857/branch/master',
        '@representation': 'minimal',
        name: 'master',
      },
      tag: null,
      commit: {
        '@type': 'commit',
        '@representation': 'minimal',
        id: 470205877,
        sha: 'f898b0c0e1c80418dfc5f3c469a2d0b65f66a8c7',
        ref: 'refs/heads/master',
        message:
          'fix: upgrade @sentry/node from 5.19.2 to 5.26.0\n\nSnyk has created this PR to upgrade @sentry/node from 5.19.2 to 5.26.0.\n\nSee this package in npm:\n\n\nSee this project in Snyk:\nhttps://app.snyk.io/org/dtuite/project/31885313-aac2-4647-ae06-0b16d7045058?utm_source=github&utm_medium=upgrade-pr',
        compare_url:
          'https://github.com/RoadieHQ/sample-service/compare/d0a10eda9e93...f898b0c0e1c8',
        committed_at: '2020-12-20T17:27:18Z',
      },
      jobs: [
        {
          '@type': 'job',
          '@href': '/job/463357616',
          '@representation': 'minimal',
          id: 463357616,
        },
      ],
      stages: [],
      created_by: {
        '@type': 'user',
        '@href': '/user/3677959',
        '@representation': 'minimal',
        id: 3677959,
        login: 'dtuite',
      },
      updated_at: '2020-12-20T17:28:31.045Z',
    },
    {
      '@type': 'build',
      '@href': '/build/209156481',
      '@representation': 'standard',
      '@permissions': {
        read: true,
        cancel: false,
        restart: false,
        prioritize: false,
      },
      id: 209156481,
      number: '192',
      state: 'passed',
      duration: 30,
      event_type: 'push',
      previous_state: 'passed',
      pull_request_title: null,
      pull_request_number: null,
      started_at: '2020-12-16T16:25:54Z',
      finished_at: '2020-12-16T16:26:24Z',
      private: false,
      priority: false,
      repository: {
        '@type': 'repository',
        '@href': '/repo/15022857',
        '@representation': 'minimal',
        id: 15022857,
        name: 'sample-service',
        slug: 'RoadieHQ/sample-service',
      },
      branch: {
        '@type': 'branch',
        '@href': '/repo/15022857/branch/master',
        '@representation': 'minimal',
        name: 'master',
      },
      tag: null,
      commit: {
        '@type': 'commit',
        '@representation': 'minimal',
        id: 467903799,
        sha: 'd0a10eda9e93be251e06c1eb372101c89d278b40',
        ref: 'refs/heads/master',
        message: 'Update catalog-info.yaml',
        compare_url:
          'https://github.com/RoadieHQ/sample-service/compare/74238050a3f7...d0a10eda9e93',
        committed_at: '2020-12-16T16:24:58Z',
      },
      jobs: [
        {
          '@type': 'job',
          '@href': '/job/461279526',
          '@representation': 'minimal',
          id: 461279526,
        },
      ],
      stages: [],
      created_by: {
        '@type': 'user',
        '@href': '/user/3854968',
        '@representation': 'minimal',
        id: 3854968,
        login: 'iain-b',
      },
      updated_at: '2020-12-16T16:26:24.636Z',
    },
  ],
};
