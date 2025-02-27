import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import project from './project'
import about from './about'
import experience from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, about, experience],
}
