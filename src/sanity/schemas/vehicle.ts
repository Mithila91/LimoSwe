import { defineField, defineType } from "sanity";

export default defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Vehicle Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vehicleClass",
      title: "Vehicle Class",
      type: "string",
      options: {
        list: [
          { title: "Luxury Class", value: "luxury" },
          { title: "Executive Class", value: "executive" },
          { title: "Luxury Van / SUV", value: "van-suv" },
          { title: "Business Class", value: "business" },
          { title: "Stretch Limousine", value: "stretch" },
          { title: "VIP Bus", value: "vip-bus" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (card)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "capacity",
      title: "Passenger Capacity",
      type: "number",
    }),
    defineField({
      name: "luggage",
      title: "Luggage Capacity",
      type: "string",
    }),
    defineField({
      name: "eco",
      title: "Eco / Electric / Hybrid",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Vehicle Class",
      name: "classAsc",
      by: [{ field: "vehicleClass", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "vehicleClass",
      media: "heroImage",
    },
  },
});
