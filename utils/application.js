import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';
import {startsWithNoCase} from 'avril/js/utils/string';
import {first} from 'avril/js/utils/array';

export const applicationSlug = application => `${application.id}-${get(application, 'certification.slug', '')}`
export const applicationSlugToId = slug => parseInt(first(slug.split('-')))

export const currentApplication = (applications, param) => {
  return applications.find(a => parseInt(a.id) === applicationSlugToId(param))
}

export const path = application => {
  if (!application) return '/mes-candidatures';
  return `${path()}/${applicationSlug(application)}`;
}
export const bookletPath = (application, path) => `/ma-candidature-vae/${applicationSlug(application)}${path || '/'}`;
export const avrilPath = (application, path) => `/candidatures/${applicationSlug(application)}${path || '/'}`;

export const certificationName = application => `${get(application, 'certification.acronym')} ${get(application, 'certification.label')}`.trim();
export const certificationLevel = application => {
  switch(parseInt(get(application, 'certification.level'))) {
    case 5:
      return 'CAP / BEP';
    case 4:
      return 'Bac / BP / BT';
    case 3:
      return 'Bac +2 / DUT / BTS';
    case 2:
      return 'Bac +3 ou +4';
    case 1:
      return 'Bac +5 et plus';
    default:
      return 'Sans Diplôme';
  }
}

export const hasDelegate = application => isPresent(application.delegate);
export const delegateName = application => get(application, 'delegate.name');
export const certifierName = application => get(application, 'delegate.certifier.name');
export const EDUC_NAT='Ministère de l\'Education Nationale';
export const isAsp = application => startsWithNoCase(get(application, 'delegate.name', ''), 'ASP');
export const delegateAddress = application => get(application, 'delegate.address', {});
export const delegatePhone = application => get(application, 'delegate.telephone');
export const delegateEmail = application => get(application, 'delegate.email');


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