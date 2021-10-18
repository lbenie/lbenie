const URI = `https://graphql.contentful.com/content/v1/spaces/${
  import.meta.env.VITE_CONTENTFUL_SPACE_ID
}`

const options: RequestInit = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
}

export const contentfulFetch = async <T>(query: string) => {
  try {
    const { data } = await fetch(URI, {
      ...options,
      body: JSON.stringify({ query }),
    }).then(
      (response) =>
        response.json() as Promise<{ readonly data: Record<string, T> }>,
    )

    return data[Object.keys(data)[0]]
  } catch (error) {
    throw new Error(`Could not receive the data from contentful \n${error}`)
  }
}
