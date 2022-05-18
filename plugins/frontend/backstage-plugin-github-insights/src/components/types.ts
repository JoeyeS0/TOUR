/*
 * Copyright 2021 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type ContributorData = {
  name: string;
  login: string;
  bio: string;
  location: string;
  avatar_url: string;
};


export type Key = "repoLicense" | "contributor" | "repoBranches" | "request"

export type RequestStateStore = {
  [key: string]: GithubRequestState
}

export type GithubRequestState = {
  etag: string;
  data: string | object;
}

export type State = {
  state: GithubRequestState;
  setState: (next: GithubRequestState) => void;
}
export type StateStore = {
  state: RequestStateStore;
  setState: (key: string, value: GithubRequestState) => void;
}

export type GithubInsightsState = {
  license: State;
  contributor: StateStore;
  branches: State;
  request: StateStore;
}