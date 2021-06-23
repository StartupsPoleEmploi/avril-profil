import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';
import {startsWithNoCase} from 'avril/js/utils/string';
import {first, include} from 'avril/js/utils/array';
import { isFuture, parseISO } from 'date-fns';

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

export const certificationId = application => get(application, 'certification.id');
export const certificationName = application => `${get(application, 'certification.acronym')} ${get(application, 'certification.label')}`.trim();
export const isUniversity = application => include(['master', 'doctorat', 'licence', 'licence professionnelle'], get(application, 'certification.acronym', '').toLowerCase())
// TODO: move to the backend
export const certificationLevel = application => {
  switch(parseInt(get(application, 'certification.level'))) {
    case 3:
      return 'CAP / BEP';
    case 4:
      return 'Bac / BP / BT';
    case 5:
      return 'Bac +2 / DUT / BTS';
    case 6:
      return 'Bac +3 / Bac +4';
    case 7:
      return 'Bac +5 et plus';
    case 8:
      return 'Bac +8';
    default:
      return 'Sans Diplôme';
  }
}
export const isCertificationActive = application => get(application, 'certification.isActive');
export const isDelegateInactive = application => {
  return hasDelegate(application) && (!get(application, 'isCertificationDelegateAvailable') || !get(application, 'delegate.isActive'));
}

export const hasDelegate = application => isPresent(application.delegate);
export const delegateName = application => get(application, 'delegate.name');
export const delegateInfos = application => get(application, 'delegate.externalNotes');
export const delegateWebsite = application => get(application, 'delegate.website');
export const delegateId = application => parseInt(get(application, 'delegate.id'));
export const certifierName = application => get(application, 'certifier.name');
export const certifierInfos = application => get(application, 'certifier.externalNotes');
export const EDUC_NAT='Ministère de l\'Education Nationale';
export const isAsp = application => startsWithNoCase(get(application, 'delegate.name', ''), 'ASP');
export const isAfpa = application => startsWithNoCase(get(application, 'delegate.name', ''), 'AFPA');
export const delegateAddress = application => {
  return {
    name: get(application, 'delegate.addressName'),
    street: get(application, 'delegate.address'),
  }
};
export const delegatePhone = application => get(application, 'delegate.telephone');
export const delegateEmail = application => get(application, 'delegate.email');

export const hasBooklet = application => get(application, 'booklet_1.insertedAt');
export const hasBookletFinished = application => !!get(application, 'booklet_1.completedAt');

export const hasResumes = application => !!get(application, 'resumes', []).length;

export const resumeCategories = {
  self_employed: 'Activité non salariée',
  employment_certification: 'Attestation employeur',
  volunteering: 'Bénévolat',
  job_certification: 'Contrat de travail',
  resume: 'CV',
  certification: 'Diplôme',
  payslip: 'Fiche de paie',
  id: 'Pièce d\'identité',
  other: 'Autre',
};
export const resumeCategory = category => {
  return resumeCategories[category] || 'Inconnu';
}

export const nextStep = application => {
  if (!hasDelegate(application)) return 'delegate';
  if (!hasBookletFinished(application)) return 'booklet';
  if (!get(application, 'resumes', []).length) return 'uploads';
  if (!application.submittedAt) return 'submit';
  return 'finished';
}

export const isFilled = application => !!application.submittedAt;

export const meetingPlace = meeting => `${meeting.place || ''} ${meeting.address || ''} ${meeting.postalCode || ''} ${meeting.city || ''}`;

export const meeting = application => get(application, 'meeting');

export const hasCertificationCertifier = (application, certifierName) =>
  include(get(application, 'certification.certifiers', []).map(c => c.name.trim()), certifierName);

export const isCnam = application => hasCertificationCertifier(application, 'CNAM');

export const delegateCriteria = (application, isExpandedSearch) => {
  const isAsp = hasCertificationCertifier(application, 'Ministère des affaires sociales et de la santé');
  const isDOHS = hasCertificationCertifier(application, 'Direction de l\'hospitalisation et de l\'organisation des soins (DHOS)');
  const isDAVA = hasCertificationCertifier(application, 'Ministère de l\'Education Nationale');
  const isAFPA = hasCertificationCertifier(application, 'Ministère du travail');

  if (isAsp || isDOHS) {
    return {
      radius: null,
      expandable: false,
    }
  }
  return {
    radius: isExpandedSearch ? null : 100000,
    administrativeFilter: isDAVA || isAFPA,
    expandable: !isExpandedSearch,
  }
}