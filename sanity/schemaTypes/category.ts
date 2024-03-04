// category.js
export default {
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      // Add other fields if necessary
    ],
  };
  