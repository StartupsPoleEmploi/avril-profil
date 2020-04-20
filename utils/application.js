import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';

export const path = application => `/mes-candidatures/${get(application, 'certification.slug', '')}`

export const hasDelegate = application => isPresent(application.delegate);

export const delegateName = application => get(application, 'delegate.name');

export const bookletPath = application => `/ma-candidature-vae?hash=${application.bookletHash}`;
// export const bookletPath = application => `${process.env.NUXT_PATH}?hash=${application.bookletHash}`;

export const hasBooklet = application => get(application, 'booklet_1.insertedAt');

export const hasBookletFinished = application => !!get(application, 'booklet_1.completedAt');

export const nextStep = application => {
  if (!hasDelegate(application)) return 'delegate';
  if (!hasBookletFinished(application)) return 'booklet';
  return 'uploads';
}

export const isFilled = application => !nextStep(application);