import get from 'lodash.get';
import { formatISODate } from '../utils/time';

const mapClassification = classification => ({
  label: classification
});

export const storeToBackend = {
  index: state => ({
    completed_at: formatISODate(state.completedAt, 'complete'),
    certification_name: state.certificationLabel,
    certifier_name: state.certifierLabel
  }),
  profile: state => ({
    first_name: state.firstNames,
    last_name: state.lastName,
    usage_name: state.usageName,
    email: state.email,
    gender: state.sex,
    mobile_phone: state.cellPhoneNumber,
    home_phone: state.homePhoneNumber,
    birthday: formatISODate(state.birthday),
    birth_place: state.birthPlace,
    is_handicapped: state.isHandicapped,
    current_situation: {
      status: get(state, 'currentSituation.status'),
      employment_type: get(state, 'currentSituation.employmentType'),
      register_to_pole_emploi: get(
        state,
        'currentSituation.registerToPoleEmploi'
      ),
      register_to_pole_emploi_since: formatISODate(
        get(state, 'currentSituation.registerToPoleEmploiSince')
      ),
      compensation_type: get(state, 'currentSituation.compensationType')
    },
    nationality: Object.assign({}, state.nationality),
    full_address: Object.assign({}, state.address, {
      postal_code: get(state, 'address.postalCode')
    })
  }),
};
