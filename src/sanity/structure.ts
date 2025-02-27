import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Experience')
        .child(
          S.documentList()
            .title('Experience')
            .filter('_type == "experience"')
            .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
        ),
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentList()
            .title('Blog Posts')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Projects')
        .child(
          S.documentList()
            .title('Projects')
            .filter('_type == "project"')
            .defaultOrdering([{ field: 'featured', direction: 'desc' }])
        ),
    ]);
