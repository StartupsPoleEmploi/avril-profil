  import {path} from '~/utils/application';

export default {
  identity: {
    illustration: 'man',
    isOptional: true,
    time: '20 - 30 minutes',
    title: 'Remplir mon identité',
    description: 'Elle est obligatoire pour toute demande de recevabilité',
    button: 'Renseigner mon identité',
    to: application => '/mon-compte',
  },
  delegate: {
    illustration: 'man',
    isOptional: false,
    title: 'Trouver mon certificateur',
    description: 'C\'est celui qui validera votre dossier',
    button: 'Rechercher mon certificateur',
    to: application => `${path(application)}/mon-certificateur`
  },
  booklet: {
    illustration: 'woman',
    isOptional: false,
    time: '1 - 2 heures',
    title: 'Remplir ma recevabilité',
    description: 'Etape essentielle de la VAE',
    button: 'Remplir ma recevabilité',
    href: application => application.bookletPath,
  }
}