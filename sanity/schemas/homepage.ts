import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero',          title: '🖼  Hero Section' },
    { name: 'about',         title: '📋 About Section' },
    { name: 'figures',       title: '📊 Key Figures' },
    { name: 'sustainability', title: '🌿 Sustainability' },
    { name: 'seo',           title: '🔍 SEO' },
  ],
  fields: [
    // ── Hero
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required().max(80),
      description: 'Main headline — max 80 characters recommended',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' },
      description: 'High-res industrial photo (min 1920×1080px)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Primary CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Explore Our Services',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Secondary CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Contact Us',
    }),

    // ── About
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Section Body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'about',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      group: 'about',
      options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' },
    }),

    // ── Figures
    defineField({
      name: 'keyFigures',
      title: 'Key Figures',
      type: 'array',
      group: 'figures',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number / Value', type: 'string', description: 'e.g. "20+" or "150+"' },
          { name: 'label',  title: 'Label',          type: 'string', description: 'e.g. "Years Experience"' },
        ],
        preview: { select: { title: 'number', subtitle: 'label' } },
      }],
      validation: Rule => Rule.max(4),
      description: 'Maximum 4 figures shown in the stats bar',
    }),

    // ── Sustainability
    defineField({
      name: 'sustainHeading',
      title: 'Sustainability Heading',
      type: 'string',
      group: 'sustainability',
    }),
    defineField({
      name: 'sustainBody',
      title: 'Sustainability Body Text',
      type: 'text',
      rows: 4,
      group: 'sustainability',
    }),
    defineField({
      name: 'sustainImage',
      title: 'Sustainability Background Image',
      type: 'image',
      group: 'sustainability',
      options: { hotspot: true, accept: 'image/jpeg, image/jpg, image/png, image/webp' },
    }),

    // ── SEO
    defineField({
      name: 'metaTitle',
      title: 'SEO Page Title',
      type: 'string',
      group: 'seo',
      description: 'Recommended: 50–60 characters',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Recommended: 120–160 characters',
    }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare: ({ title }) => ({ title: 'Homepage', subtitle: title }),
  },
})
