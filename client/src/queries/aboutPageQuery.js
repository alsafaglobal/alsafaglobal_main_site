export const aboutPageQuery = `

  *[_type == "aboutPage"][0]{

    pageTitle,
    introText,

    vision{
      title,
      text
    },

    mission{
      title,
      text
    },

    coreValues{
      title,
      subtitle,
      values[]{
        title,
        description,
        enabled
      }
    },

    whyChoose{
      title,
      subtitle,
      features[]{
        title,
        description,
        enabled
      },

      services{

        coreServices{
          title,
          subtitle,
          items[]{
            title,
            enabled
          }
        },

        sectorServices{
          title,
          subtitle,
          items[]{
            title,
            enabled
          }
        },

        valueAdded{
          title,
          subtitle,
          items[]{
            title,
            enabled
          }
        }
      }
    },

    brandPartners{
      title,
      subtitle,
      logos[]{
        image{
          asset->{url},
          alt
        },
        enabled
      }
    },

    contactSection{
      title,
      subtitle,
      email,
      address,
      phone,
      stats[]{
        number,
        label,
        enabled
      }
    }

  }

`

