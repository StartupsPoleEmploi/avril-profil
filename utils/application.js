import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';

export const path = application => `/mes-candidatures/${get(application, 'certification.slug', '')}`

export const hasDelegate = application => isPresent(application.delegate);

export const bookletPath = application => `${process.env.NUXT_PATH}?hash=${application.bookletHash}`;

export const hasBooklet = application => isPresent(application.bookletData);

export const hasBookletFinished = application => !!get(application, 'bookletData.completed_at');

export const nextStep = application => {
  if (!hasDelegate(application)) return 'delegate';
  if (!hasBooklet(application)) return 'booklet';
  return 'uploads';
}

export const isFilled = application => !nextStep(application);