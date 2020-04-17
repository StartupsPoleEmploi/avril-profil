  import {path, bookletPath} from '~/utils/application';

export default {
  identity: {
    illustration: 'man',
    isSuggested: true,
    time: '20 - 30 minutes',
    title: 'Remplir mon identité',
    description: 'Elle est obligatoire pour toute demande de recevabilité',
    button: 'Renseigner mon identité',
    to: application => '/mon-compte',
  },
  delegate: {
    illustration: 'man',
    isSuggested: false,
    time: '2 - 3 minutes',
    title: 'Trouver mon certificateur',
    description: 'C\'est celui qui validera votre dossier',
    button: 'Rechercher mon certificateur',
    to: application => `${path(application)}/mon-certificateur`,
  },
  booklet: {
    illustration: 'woman',
    isSuggested: false,
    time: '1 - 2 heures',
    title: 'Remplir ma recevabilité',
    description: 'Etape éssentielle de la VAE',
    button: 'Remplir ma recevabilité',
    href: application => bookletPath(application),
  },
  uploads: {
    illustration: 'man',
    isSuggested: false,
    time: '1 - 2 heures',
    title: 'Envoyer mes justificatifs',
    description: 'Pour que votre candidature soit validée, il faut justifier des informations que vous avez saisies',
    button: 'Envoyer mes justificatifs',
    to: application => `${path(application)}/mes-justificatifs`,
  }
}