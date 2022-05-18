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

import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useAsync, useAsyncFn } from 'react-use';
import { prometheusApiRef } from '../api';
import {
  PrometheusDisplayableAlert,
  PrometheusMatrixVectorResult,
  PrometheusRuleResponse,
  PrometheusScalarStringResult,
  ResultType,
} from '../types';
import _ from 'lodash';
import { DateTime } from 'luxon';

function isMetricResult(
  resultType: ResultType,
  _result: PrometheusMatrixVectorResult[] | PrometheusScalarStringResult[],
): _result is PrometheusMatrixVectorResult[] {
  return resultType === 'matrix' || resultType === 'vector';
}

export function resultToGraphData(
  result: PrometheusMatrixVectorResult[],
  dimension?: string,
) {
  const keys: string[] = [];
  const metrics: { [k: string]: any } = {};
  if (result.length === 0) {
    return { keys, metrics, data: [] };
  }

  const grouper =
    dimension && result.every(it => Object.keys(it.metric).includes(dimension))
      ? dimension
      : Object.keys(result[0].metric)[0];

  const data = _(result)
    .flatMap(it => {
      if (!keys.includes(it.metric[grouper])) {
        keys.push(it.metric[grouper]);
      }
      if (!Object.keys(metrics).includes(it.metric[grouper])) {
        metrics[it.metric[grouper]] = it.metric;
      }
      return it.values.map(val => ({
        time: DateTime.fromSeconds(val[0]).toISOTime(),
        [it.metric[grouper]]: val[1],
      }));
    })
    .groupBy('time')
    .map(_.spread(_.assign))
    .map(it => ({ ...it, time: DateTime.fromISO(it.time).toSeconds() }))
    .value();
  return { data, keys, metrics };
}

export function useMetrics({
  query,
  range,
  step,
  dimension,
}: {
  query: string;
  range: {
    hours?: number;
    minutes?: number;
  };
  step: number;
  dimension?: string;
}) {
  const prometheusApi = useApi(prometheusApiRef);
  const errorApi = useApi(errorApiRef);
  const [state, fetchGraph] = useAsyncFn(async () => {
    try {
      const value = await prometheusApi.query({ query, range, step });
      if (isMetricResult(value.data.resultType, value.data.result)) {
        return resultToGraphData(value.data.result, dimension);
      }
      errorApi.post({
        name: 'Prometheus Graph construction error',
        message: 'Only metric or vector result types are supported',
      });
      return Promise.reject();
    } catch (e) {
      errorApi.post({
        name: 'Prometheus API Error',
        message: 'Failed to retrieve graph data from prometheus API',
      });
      return Promise.reject(e);
    }
  }, []);

  return {
    loading: state.loading,
    error: state.error,
    value: state.value,
    fetchGraph,
  };
}

export function useAlerts(alerts: string[] | 'all') {
  const prometheusApi = useApi(prometheusApiRef);
  const { value, loading, error } = useAsync(async (): Promise<
    PrometheusRuleResponse
  > => {
    return await prometheusApi.getAlerts();
  }, []);
  if (value && value.status !== 'error') {
    const rules = value.data.groups.flatMap(it => it.rules);
    const displayableAlerts: PrometheusDisplayableAlert[] = rules
      .filter(rule => alerts === 'all' || alerts.includes(rule.name))
      .flatMap(rule =>
        rule.alerts.map(alert => ({ ...rule, ...alert, id: rule.name })),
      );
    return { loading, error, displayableAlerts };
  } else if (value && value.status === 'error') {
    return {
      loading,
      error: { message: 'Error when retrieving alerting data from Prometheus' },
      displayableAlerts: [],
    };
  }
  return { loading, error, displayableAlerts: [] };
}
