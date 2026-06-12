import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('siteSettings').id('siteSettings') for this singleton
  fields: [
    defineField({
      name: 'clinicName',
      title: 'Clinic Name',
      type: 'string',
      description: 'e.g. "Dr. Sandeep Shetty\'s Dental Clinic and Orthodontic Centre"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Dental & Orthodontic · Mangaluru"',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Clinic logo',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'e.g. "0824 411 3388"',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'e.g. "+917411133575"',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Link for "Book Appointment" CTA',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Link to the clinic Instagram profile',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Link to the clinic Facebook page',
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Review URL',
      type: 'url',
      description: 'Direct link for patients to leave a Google review',
    }),
    defineField({
      name: 'privacyNotice',
      title: 'Privacy Notice',
      type: 'text',
      description: 'Footer privacy disclaimer',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Footer copyright line',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g. "Mon–Sat · 10:00 AM – 8:00 PM"',
    }),
    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'number',
      description: 'e.g. 4.9',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      description: 'e.g. 115',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Total years the clinic has been serving patients',
    }),
    defineField({
      name: 'patientCount',
      title: 'Patient Count',
      type: 'number',
      description: 'Total number of patients treated (for trust stats)',
    }),
    defineField({
      name: 'omanBranch',
      title: 'Oman Branch',
      type: 'omanBranch',
      description: 'Details for the Muscat/Oman location',
    }),
  ],
})
