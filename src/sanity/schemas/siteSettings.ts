import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Limo Sweden",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      initialValue: "+4610 17 17 117",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number (international format)",
      type: "string",
      initialValue: "+46101717117",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "info@limoswe.se",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Your Private Chauffeur Service In Stockholm",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      initialValue: "Luxury · Safety · Service",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "metaTitle",
      title: "Default Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
