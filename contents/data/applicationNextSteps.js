export default {
  profile: {
    illustration: 'man',
    isOptional: true,
    time: '20 - 30 minutes',
    title: 'Remplir mon identité',
    description: 'Elle est obligatoire pour toute demande de recevabilité',
    button: 'Renseigner mon identité',
    to: application => '/mon-identite',
  },
  delegate: {
    illustration: 'man',
    title: 'Trouver mon certificateur',
    description: 'C\'est celui qui validera votre dossier',
    button: 'Rechercher mon certificateur',
    to: application => `/mes-candidatures/${application.id}/mon-certificateur`
  },
  booklet: {
    illustration: 'woman',
    time: '1 - 2 heures',
    title: 'Remplir ma recevabilité',
    description: 'Etape essentielle de la VAE',
    button: 'Remplir ma recevabilité',
    href: application => application.bookletPath,
  }
}