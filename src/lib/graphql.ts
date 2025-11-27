import { GraphQLClient } from 'graphql-request'

const URL = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.CONTENTFUL_SPACE_ID}`

const token = import.meta.env.DEV
  ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
  : import.meta.env.CONTENTFUL_DELIVERY_TOKEN

export const client = new GraphQLClient(URL, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})
