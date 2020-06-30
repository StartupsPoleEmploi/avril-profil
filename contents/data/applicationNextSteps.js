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
    illustration: 'woman',
    isSuggested: false,
    time: '2 - 3 minutes',
    title: 'Trouver mon certificateur',
    description: 'C\'est celui qui est responsable du diplôme sélectionné',
    button: 'Rechercher mon certificateur',
    to: application => `${path(application)}/mon-certificateur`,
  },
  booklet: {
    illustration: 'man',
    isSuggested: false,
    time: '1 - 2 heures',
    title: 'Remplir ma recevabilité',
    description: 'Etape éssentielle de la VAE',
    button: 'Remplir ma recevabilité',
    href: application => bookletPath(application),
  },
  submit: {
    illustration: 'woman',
    isSuggested: false,
    time: 'en 1 clic',
    title: 'Transmettre ma candidature',
    description: 'Vous êtes prêts à transmettre toutes ces informations à votre certificateur',
    button: 'Envoyer',
    analytics: '?bouton=transmettre',
    api: application => ({
      store: 'applications',
      disableWith: 'Envoi ...',
      query: {
        message: 'Candidature transmise avec succès.',
        store: 'applications',
        name: 'submitApplication',
        type: 'application',
        params: {
          id: application.id,
        }
      },
    }),
  },
  uploads: {
    illustration: 'man',
    isSuggested: false,
    time: '1 - 2 heures',
    title: 'Ajouter mes justificatifs',
    description: 'Pour que votre candidature soit validée, il faut justifier des informations que vous avez saisies',
    button: 'Ajouter mes justificatifs',
    to: application => `${path(application)}/mes-justificatifs`,
  },
  finished: {
    isLast: true,
    illustration: 'exam',
    isSuggested: false,
    title: 'Votre candidature a bien été transmise',
    color: 'purple',
    description: 'Votre certificateur connait maintenant votre projet et a reçu votre dossier ainsi que vos justificatifs. Contactez-le pour connaitre les suites à donner et obtenir très vite votre diplôme !',
  }
}