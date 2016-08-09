import axios from 'axios';
import store from '../store';
import {
  gettingMetrics, getMetricsSuccess, getMetricsFailure,
  gettingMetric, getMetricSuccess, getMetricFailure
} from '../actions/metric-actions';

const prodEndpoints = {
  GET_METRICS: `${location.origin}/metrics/`,
  GET_METRIC: `${location.origin}/distributions/`
}

const mockEndpoints = {
  GET_METRICS: 'http://localhost:3009/metrics',
  GET_METRIC: 'http://localhost:3009/'
};

export const endpoints = process.env.NODE_ENV === 'production' ? prodEndpoints : mockEndpoints;

// Fetch list of metrics.
export function getMetrics() {
  store.dispatch(gettingMetrics());

  return axios.get(endpoints.GET_METRICS).then(response => {
    store.dispatch(getMetricsSuccess(response.data.metrics));
    return response;
  }).catch(response => {
    console.error(response);
    store.dispatch(getMetricsFailure(response.status))
    return response;
  });
}

export function getMetric(name) {
  store.dispatch(gettingMetric());

  return axios.get(`${endpoints.GET_METRIC}${name}/`).then(response => {
    store.dispatch(getMetricSuccess(response.data));
    return response;
  }).catch(response => {
    console.error(response);
    store.dispatch(getMetricFailure(response.status));
    return response;
  });
}
