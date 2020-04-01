export default {
  identity: `
    {
      firstName
      usageName
      lastName
      email
      gender
      mobilePhone
      homePhone
      birthday
      isHandicapped
      fullAddress{
        street
        city
        postalCode
        country
        lat
        lng
      }
      birthPlace{
        city
        country
      }
      nationality{
        country
        countryCode
      }
      currentSituation{
        status
        employmentType
        registerToPoleEmploi
        registerToPoleEmploiSince
        compensationType
      }
    }
  `,
  certification: `
    {
      acronym
      label
      level
      slug
    }
  `,
  delegate: `
    {
      name
      address
      personName
      email
      telephone
      certifier {
        name
      }
    }
  `,
  get application() {
    return `
      {
        id
        # booklet_1
        bookletHash
        insertedAt
        certification ${this.certification}
        delegate ${this.delegate}
      }
    `
  },
}
