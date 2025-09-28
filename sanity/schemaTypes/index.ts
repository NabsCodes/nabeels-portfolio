import { type SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost],
};
