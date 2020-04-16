import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';

console.log(process.env.NUXT_PATH)

export const path = application => `/mes-candidatures/${get(application, 'certification.slug', '')}`

export const hasDelegate = application => isPresent(application.delegate);

export const bookletPath = application => `/ma-candidature-vae?hash=${application.bookletHash}`;
// export const bookletPath = application => `${process.env.NUXT_PATH}?hash=${application.bookletHash}`;

export const hasBooklet = application => isPresent(application.bookletData);

export const hasBookletFinished = application => !!get(application, 'booklet_1.completedAt');

export const nextStep = application => {
  if (!hasDelegate(application)) return 'delegate';
  if (!hasBooklet(application)) return 'booklet';
  return 'uploads';
}

export const isFilled = application => !nextStep(application);