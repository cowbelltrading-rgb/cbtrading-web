import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Products & Materials',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Product / Material Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [{ title: 'Virgin Plastics', value: 'virgin' }, { title: 'Recycled Plastics', value: 'recycled' }, { title: 'Packaging Materials', value: 'packaging' }, { title: 'Industrial Materials', value: 'industrial' }] },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'grade',       title: 'Grade / Type',       type: 'string', description: 'e.g. HDPE, LDPE, PP Homo, etc.' }),
    defineField({ name: 'description', title: 'Description',         type: 'text', rows: 3 }),
    defineField({ name: 'applications', title: 'Applications', type: 'array', of: [{ type: 'string' }], description: 'Add each application individually' }),
    defineField({ name: 'datasheet',   title: 'Datasheet (PDF)',     type: 'file', options: { accept: 'application/pdf' } }),
    defineField({ name: 'published',   title: 'Published',           type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'grade' } },
  orderings: [{ title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }, { field: 'name', direction: 'asc' }] }],
})
