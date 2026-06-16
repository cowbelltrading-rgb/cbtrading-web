import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'company',  title: '🏢 Company Info' },
    { name: 'contact',  title: '📞 Contact Details' },
    { name: 'social',   title: '🔗 Social Links' },
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'company',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'company',
      description: 'Short company tagline shown in footer and meta tags',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'company',
      options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' },
    }),
    defineField({
      name: 'founded',
      title: 'Founded Year',
      type: 'number',
      group: 'company',
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Company Registration Number',
      type: 'string',
      group: 'company',
      description: 'Irish Companies Registration Office number',
    }),
    defineField({
      name: 'vatNumber',
      title: 'VAT Number',
      type: 'string',
      group: 'company',
    }),
    defineField({
      name: 'address1',
      title: 'Address Line 1',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address2',
      title: 'Address Line 2',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'General Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    select: { title: 'companyName' },
    prepare: ({ title }) => ({ title: title || 'Site Settings', subtitle: 'Company-wide settings' }),
  },
})
