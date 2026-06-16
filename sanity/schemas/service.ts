import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'content',  title: '📝 Content' },
    { name: 'details',  title: '📋 Details' },
    { name: 'seo',      title: '🔍 SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Service Title', type: 'string', group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required(), description: 'Auto-generated. Do not change after launch.' }),
    defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string', group: 'content', description: 'Single emoji for service cards e.g. ♻️' }),
    defineField({ name: 'summary', title: 'Short Summary', type: 'text', rows: 2, group: 'content', validation: Rule => Rule.required().max(160) }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'content', options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' }, description: 'Min 1920×800px industrial photo' }),
    defineField({ name: 'overview', title: 'Service Overview', type: 'array', of: [{ type: 'block' }], group: 'content' }),
    defineField({
      name: 'features', title: 'Key Features', type: 'array', group: 'details',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'text', rows: 2 }], preview: { select: { title: 'title', subtitle: 'description' } } }],
    }),
    defineField({
      name: 'industriesServed', title: 'Industries Served', type: 'array', group: 'details',
      of: [{ type: 'string' }],
      options: { list: ['Beverage & Drinks', 'Food & FMCG', 'Pharmaceutical', 'Automotive', 'Construction & Building', 'Agriculture', 'Retail & Consumer Goods', 'Chemical & Industrial', 'Logistics & Warehousing', 'Electronics'], layout: 'tags' },
    }),
    defineField({ name: 'whyCowbell', title: 'Why Choose Cowbell (for this service)', type: 'text', rows: 4, group: 'details' }),
    defineField({ name: 'orderRank', title: 'Display Order (1=first)', type: 'number', group: 'details' }),
    defineField({ name: 'metaTitle', title: 'SEO Page Title', type: 'string', group: 'seo' }),
    defineField({ name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 2, group: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary', media: 'heroImage' } },
  orderings: [{ title: 'Display Order', name: 'orderRankAsc', by: [{ field: 'orderRank', direction: 'asc' }] }],
})
