import get from 'lodash.get';

export const hasDelegate = application => !!application.delegate;

export const hasBooklet = application => !!application.bookletData;

export const hasBookletFinished = application => !!get(application, 'bookletData.completed_at');