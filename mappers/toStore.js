import get from 'lodash.get';
import { uuid } from 'avril/js/utils/string';
import { parseISODate } from 'avril/js/utils/time';
import {levelToLevelLabel} from '~/utils/certification';
const mapClassification = data => data.label;

const log = param => {
  console.log(param)
  return param
};

const mapApplications = application => ({
  id: application.id,
  slug: get(application, 'certification.slug'),
  delegate: application.delegate || {},
  certification: {
    ...get(application, 'certification', {}),
    name: `${get(application, 'certification.acronym')} ${get(application, 'certification.label')}`,
    levelLabel: levelToLevelLabel(get(application, 'certification.level')),
  },
  bookletData: application.booklet_1,
  bookletPath: `${process.env.NUXT_PATH}?hash=${application.bookletHash}`,
});

export const backendToStore = {
  identity: backendData => ({
    ...backendData,
    // firstName: backendData.firstName,
    // lastName: backendData.lastName,
    // usageName: backendData.usageName,
    // email: backendData.email,
    sex: backendData.gender,
    // cellPhoneNumber: backendData.phoneNumber,
    // homePhoneNumber: backendData.home_phone,
    birthday: parseISODate(backendData.birthday),
    // isHandicapped: backendData.isHandicapped,
    currentSituation: {
      ...backendData.currentSituation,
      // status: get(backendData, 'current_situation.status', null),
      // employmentType: get(backendData, 'current_situation.employment_type', null),
      // registerToPoleEmploi: get(backendData, 'current_situation.register_to_pole_emploi', null),
      registerToPoleEmploiSince: parseISODate(
        get(backendData, 'currentSituation.registerToPoleEmploiSince', null)
      ),
      // compensationType: get(backendData, 'current_situation.compensation_type')
    },
    // birthPlace: {
    //   city: get(backendData, 'birth_place.city', null),
    //   county: get(backendData, 'birth_place.county', null),
    //   country: get(backendData, 'birth_place.country', null),
    //   lat: get(backendData, 'birth_place.lat', null),
    //   lng: get(backendData, 'birth_place.lng', null),
    // },
    // nationality: Object.assign({}, backendData.nationality),
    address: backendData.fullAddress,
  }),
  applications: backendData => backendData.map(mapApplications),
};
