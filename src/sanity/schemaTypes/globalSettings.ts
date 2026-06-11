import { defineField, defineType } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Enter the phone number including country code, e.g., +919876543210',
    }),
    defineField({
      name: 'bookAppointmentLink',
      title: 'Book Appointment Link',
      type: 'url',
      description: 'External link for the Book Appointment button',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
    }),
  ],
})
