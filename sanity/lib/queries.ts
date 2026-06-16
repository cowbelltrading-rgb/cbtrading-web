import { groq } from 'next-sanity'

// ── Site Settings ──────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    companyName,
    tagline,
    address1,
    address2,
    city,
    country,
    phone,
    email,
    registrationNumber,
    vatNumber,
    linkedin,
    twitter,
    founded,
    "logo": logo.asset->url,
  }
`

// ── Homepage ───────────────────────────────────────────
export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubtext,
    heroImage,
    heroCta1Label,
    heroCta2Label,
    aboutHeading,
    aboutBody,
    aboutImage,
    keyFigures[]{number, label},
    sustainHeading,
    sustainBody,
    sustainImage,
    metaTitle,
    metaDescription,
  }
`

// ── About Company ────────────────────────────────────────
export const aboutCompanyQuery = groq`
  *[_type == "aboutCompany"][0]{
    heading,
    leadText,
    introHeading,
    introBody,
    "introImage": introImage.asset->url,
    missionHeading,
    missionBody,
    values[]{title, description},
    markets[]{flag, name, label, description},
    metaTitle,
    metaDescription,
  }
`

// ── All Services (for nav + strips) ───────────────────
export const allServicesQuery = groq`
  *[_type == "service"] | order(orderRank){
    _id,
    title,
    slug,
    summary,
    heroImage,
    icon,
    orderRank,
  }
`

// ── Single Service ─────────────────────────────────────
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    heroImage,
    overview,
    features[]{title, description},
    industriesServed,
    whyCowbell,
    metaTitle,
    metaDescription,
  }
`

// ── Products (for a service page) ─────────────────────
export const productsByServiceQuery = groq`
  *[_type == "product" && service->slug.current == $slug && published == true]{
    _id,
    name,
    grade,
    description,
    applications,
    category,
    "datasheetUrl": datasheet.asset->url,
  }
`

// ── All Products ───────────────────────────────────────
export const allProductsQuery = groq`
  *[_type == "product" && published == true] | order(category, name){
    _id,
    name,
    grade,
    category,
    description,
    applications,
    "datasheetUrl": datasheet.asset->url,
  }
`

// ── Resources ──────────────────────────────────────────
export const allResourcesQuery = groq`
  *[_type == "resource" && published == true] | order(publishedAt desc){
    _id,
    title,
    category,
    description,
    gated,
    publishedAt,
    "fileUrl": file.asset->url,
    "fileSize": file.asset->size,
    "thumbnailUrl": thumbnail.asset->url,
  }
`
