import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutCompany',
  title: 'About Company',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content' },
    { name: 'mission', title: '🎯 Mission & Values' },
    { name: 'markets', title: '🌍 Markets' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'leadText',
      title: 'Lead Text',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'introBody',
      title: 'Intro Body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'introImage',
      title: 'Intro Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' },
    }),
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
      group: 'mission',
    }),
    defineField({
      name: 'missionBody',
      title: 'Mission Body',
      type: 'text',
      rows: 4,
      group: 'mission',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      group: 'mission',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'markets',
      title: 'Markets Served',
      type: 'array',
      group: 'markets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'flag', title: 'Flag (Emoji)', type: 'string' },
            { name: 'name', title: 'Market Name', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'name', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Page Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'About Company', subtitle: 'About Page Content' }),
  },
})
