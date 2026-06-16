import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resources & Downloads',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Document Title',     type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string', validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Technical Datasheets',   value: 'datasheets' },
          { title: 'Product Catalogues',     value: 'catalogues' },
          { title: 'Material Certifications', value: 'certifications' },
          { title: 'Sustainability Reports',  value: 'sustainability' },
          { title: 'Machinery Brochures',    value: 'machinery' },
          { title: 'Consulting Guides',      value: 'consulting' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Short Description',  type: 'text', rows: 2 }),
    defineField({ name: 'file',        title: 'File (PDF)',          type: 'file', options: { accept: 'application/pdf' }, validation: Rule => Rule.required(), description: 'Upload PDF from your computer' }),
    defineField({ name: 'thumbnail',   title: 'Thumbnail Image',    type: 'image', options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' }, description: 'Optional preview image' }),
    defineField({ name: 'gated',       title: 'Require name & email to download?', type: 'boolean', initialValue: false, description: 'If enabled, visitor must provide their details before downloading' }),
    defineField({ name: 'publishedAt', title: 'Published Date',     type: 'datetime' }),
    defineField({ name: 'published',   title: 'Published (visible on site)', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' }, prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle?.replace(/_/g, ' ') }) },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
