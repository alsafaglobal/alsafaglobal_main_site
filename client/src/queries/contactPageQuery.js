export const contactPageQuery = `

  *[_type == "contactPage"][0]{

    title,
    intro,

    getInTouch{
      title,
      description
    },

    contactDetails{
      email,
      emailNote,
      phone,
      phoneNote,
      addressTitle,
      address,
      serviceAreas,
      businessHours
    },

    partnership{
      title,
      description
    },

    formContent{
      title,
      description
    },

    whyChoose{
      title,
      items[]{
        title,
        description,
        enabled
      }
    }

  }

`

