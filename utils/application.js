import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';

export const path = application => `/mes-candidatures/${get(application, 'certification.slug', '')}`

export const hasDelegate = application => isPresent(application.delegate);

export const delegateName = application => get(application, 'delegate.name');

export const bookletPath = (application, path) => `/ma-candidature-vae${path || '/'}?hash=${application.bookletHash}`;

export const hasBooklet = application => get(application, 'booklet_1.insertedAt');

export const hasBookletFinished = application => !!get(application, 'booklet_1.completedAt');

export const hasResumes = application => !!get(application, 'resumes', []).length;

export const nextStep = application => {
  if (!hasDelegate(application)) return 'delegate';
  if (!hasBookletFinished(application)) return 'booklet';
  if (!get(application, 'resumes', []).length) return 'uploads';
  if (!application.submittedAt) return 'submit';
  return 'finished';
}

export const isFilled = application => application.submittedAt;