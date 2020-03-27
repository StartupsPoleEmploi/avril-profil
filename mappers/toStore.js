import get from 'lodash.get';
import { uuid } from 'avril/js/utils/string';
import { parseISODate } from 'avril/js/utils/time';

const mapClassification = data => data.label;

const mapApplications = application => ({
  id: application.id,
  slug: get(application, 'certification.slug'),
  certificationLabel: get(application, 'certification.name'),
  certificationLevel: get(application, 'certification.level'),
  certifierLabel: get(application, 'delegate.certifier_name'),
  createdAt: parseISODate(application.created_at),
  delegate: application.delegate || {},
  bookletData: application.booklet_1,
  bookletPath: `${process.env.NUXT_PATH}?hash=${application.booklet_hash}`,
});

export const backendToStore = {
  index: backendData => ({
    hash: backendData.hash,
    certificationLabel: backendData.certification_name,
    certifierLabel: backendData.certifier_name,
    completedAt: parseISODate(backendData.completed_at),
  }),
  profile: backendData => ({
    firstNames: backendData.first_name,
    lastName: backendData.last_name,
    usageName: backendData.usage_name,
    email: backendData.email,
    sex: backendData.gender,
    cellPhoneNumber: backendData.mobile_phone,
    homePhoneNumber: backendData.home_phone,
    birthday: parseISODate(backendData.birthday),
    isHandicapped: backendData.is_handicapped,
    currentSituation: {
      status: get(backendData, 'current_situation.status', null),
      employmentType: get(backendData, 'current_situation.employment_type', null),
      registerToPoleEmploi: get(backendData, 'current_situation.register_to_pole_emploi', null),
      registerToPoleEmploiSince: parseISODate(
        get(backendData, 'current_situation.register_to_pole_emploi_since', null)
      ),
      compensationType: get(backendData, 'current_situation.compensation_type')
    },
    birthPlace: {
      city: get(backendData, 'birth_place.city', null),
      county: get(backendData, 'birth_place.county', null),
      country: get(backendData, 'birth_place.country', null),
      lat: get(backendData, 'birth_place.lat', null),
      lng: get(backendData, 'birth_place.lng', null),
    },
    nationality: Object.assign({}, backendData.nationality),
    address: {
      street: get(backendData, 'full_address.street', null),
      city: get(backendData, 'full_address.city', null),
      postalCode: get(backendData, 'full_address.postal_code', null),
      country: get(backendData, 'full_address.country', null),
      lat: get(backendData, 'full_address.lat', null),
      lng: get(backendData, 'full_address.lng', null)
    }
  }),
  applications: backendData => backendData.map(mapApplications),
};
