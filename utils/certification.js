export const levelToLevelLabel = level => {
  switch(parseInt(level)) {
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

export const name = ({acronym, label}) => `${acronym || ''} ${label}`