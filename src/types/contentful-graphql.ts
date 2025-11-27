export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  readonly contentType: Maybe<Scalars['String']['output']>;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly fileName: Maybe<Scalars['String']['output']>;
  readonly height: Maybe<Scalars['Int']['output']>;
  readonly linkedFrom: Maybe<AssetLinkingCollections>;
  readonly size: Maybe<Scalars['Int']['output']>;
  readonly sys: Sys;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly url: Maybe<Scalars['String']['output']>;
  readonly width: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  transform: InputMaybe<ImageTransformOptions>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  readonly items: ReadonlyArray<Maybe<Asset>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type AssetFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<AssetFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<AssetFilter>>>;
  readonly contentType: InputMaybe<Scalars['String']['input']>;
  readonly contentType_contains: InputMaybe<Scalars['String']['input']>;
  readonly contentType_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly contentType_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly contentType_not: InputMaybe<Scalars['String']['input']>;
  readonly contentType_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly contentType_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly description_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly description_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly description_not: InputMaybe<Scalars['String']['input']>;
  readonly description_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly fileName: InputMaybe<Scalars['String']['input']>;
  readonly fileName_contains: InputMaybe<Scalars['String']['input']>;
  readonly fileName_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly fileName_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly fileName_not: InputMaybe<Scalars['String']['input']>;
  readonly fileName_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly fileName_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly height: InputMaybe<Scalars['Int']['input']>;
  readonly height_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly height_gt: InputMaybe<Scalars['Int']['input']>;
  readonly height_gte: InputMaybe<Scalars['Int']['input']>;
  readonly height_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly height_lt: InputMaybe<Scalars['Int']['input']>;
  readonly height_lte: InputMaybe<Scalars['Int']['input']>;
  readonly height_not: InputMaybe<Scalars['Int']['input']>;
  readonly height_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly size: InputMaybe<Scalars['Int']['input']>;
  readonly size_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly size_gt: InputMaybe<Scalars['Int']['input']>;
  readonly size_gte: InputMaybe<Scalars['Int']['input']>;
  readonly size_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly size_lt: InputMaybe<Scalars['Int']['input']>;
  readonly size_lte: InputMaybe<Scalars['Int']['input']>;
  readonly size_not: InputMaybe<Scalars['Int']['input']>;
  readonly size_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly title_contains: InputMaybe<Scalars['String']['input']>;
  readonly title_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly title_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly title_not: InputMaybe<Scalars['String']['input']>;
  readonly title_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly title_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly url: InputMaybe<Scalars['String']['input']>;
  readonly url_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly url_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly url_not: InputMaybe<Scalars['String']['input']>;
  readonly url_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly width: InputMaybe<Scalars['Int']['input']>;
  readonly width_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly width_gt: InputMaybe<Scalars['Int']['input']>;
  readonly width_gte: InputMaybe<Scalars['Int']['input']>;
  readonly width_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly width_lt: InputMaybe<Scalars['Int']['input']>;
  readonly width_lte: InputMaybe<Scalars['Int']['input']>;
  readonly width_not: InputMaybe<Scalars['Int']['input']>;
  readonly width_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetOrder =
  | 'contentType_ASC'
  | 'contentType_DESC'
  | 'fileName_ASC'
  | 'fileName_DESC'
  | 'height_ASC'
  | 'height_DESC'
  | 'size_ASC'
  | 'size_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'url_ASC'
  | 'url_DESC'
  | 'width_ASC'
  | 'width_DESC';

export type ContentfulMetadata = {
  readonly concepts: ReadonlyArray<Maybe<TaxonomyConcept>>;
  readonly tags: ReadonlyArray<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  readonly id_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  readonly descendants: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  readonly id_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  readonly concepts: InputMaybe<ContentfulMetadataConceptsFilter>;
  readonly concepts_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly tags: InputMaybe<ContentfulMetadataTagsFilter>;
  readonly tags_exists: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  readonly id_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  readonly id: Maybe<Scalars['String']['output']>;
  readonly name: Maybe<Scalars['String']['output']>;
};

/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type Contribution = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly contentfulMetadata: ContentfulMetadata;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly funFact: Maybe<Scalars['String']['output']>;
  readonly linkedFrom: Maybe<ContributionLinkingCollections>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly summary: Maybe<Scalars['String']['output']>;
  readonly sys: Sys;
  readonly tags: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly url: Maybe<Scalars['String']['output']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionFunFactArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionSlugArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionSummaryArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionTagsArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Projects I have contributed to [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/contribution) */
export type ContributionUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContributionCollection = {
  readonly items: ReadonlyArray<Maybe<Contribution>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type ContributionFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<ContributionFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<ContributionFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly description_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly description_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly description_not: InputMaybe<Scalars['String']['input']>;
  readonly description_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly funFact: InputMaybe<Scalars['String']['input']>;
  readonly funFact_contains: InputMaybe<Scalars['String']['input']>;
  readonly funFact_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly funFact_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly funFact_not: InputMaybe<Scalars['String']['input']>;
  readonly funFact_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly funFact_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly name_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly name_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name_not: InputMaybe<Scalars['String']['input']>;
  readonly name_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly slug_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly slug_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug_not: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly summary: InputMaybe<Scalars['String']['input']>;
  readonly summary_contains: InputMaybe<Scalars['String']['input']>;
  readonly summary_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly summary_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly summary_not: InputMaybe<Scalars['String']['input']>;
  readonly summary_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly summary_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
  readonly tags_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly url: InputMaybe<Scalars['String']['input']>;
  readonly url_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly url_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly url_not: InputMaybe<Scalars['String']['input']>;
  readonly url_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ContributionLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type ContributionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContributionOrder =
  | 'funFact_ASC'
  | 'funFact_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'summary_ASC'
  | 'summary_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'url_ASC'
  | 'url_DESC';

export type Entry = {
  readonly contentfulMetadata: ContentfulMetadata;
  readonly sys: Sys;
};

export type EntryCollection = {
  readonly items: ReadonlyArray<Maybe<Entry>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type EntryFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<EntryFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<EntryFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly sys: InputMaybe<SysFilter>;
};

export type EntryOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type Experience = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly address: Maybe<Scalars['String']['output']>;
  readonly company: Maybe<Scalars['String']['output']>;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly exerpt: Maybe<Scalars['String']['output']>;
  readonly from: Maybe<Scalars['DateTime']['output']>;
  readonly isRemote: Maybe<Scalars['Boolean']['output']>;
  readonly linkedFrom: Maybe<ExperienceLinkingCollections>;
  readonly role: Maybe<Scalars['String']['output']>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly stack: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly sys: Sys;
  readonly to: Maybe<Scalars['DateTime']['output']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceAddressArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceCompanyArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceExerptArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceFromArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceIsRemoteArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceRoleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceSlugArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceStackArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experiences [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/experience) */
export type ExperienceToArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExperienceCollection = {
  readonly items: ReadonlyArray<Maybe<Experience>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type ExperienceFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<ExperienceFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<ExperienceFilter>>>;
  readonly address: InputMaybe<Scalars['String']['input']>;
  readonly address_contains: InputMaybe<Scalars['String']['input']>;
  readonly address_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly address_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly address_not: InputMaybe<Scalars['String']['input']>;
  readonly address_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly address_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly company: InputMaybe<Scalars['String']['input']>;
  readonly company_contains: InputMaybe<Scalars['String']['input']>;
  readonly company_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly company_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly company_not: InputMaybe<Scalars['String']['input']>;
  readonly company_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly company_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly description_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly description_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly description_not: InputMaybe<Scalars['String']['input']>;
  readonly description_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly exerpt: InputMaybe<Scalars['String']['input']>;
  readonly exerpt_contains: InputMaybe<Scalars['String']['input']>;
  readonly exerpt_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly exerpt_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly exerpt_not: InputMaybe<Scalars['String']['input']>;
  readonly exerpt_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly exerpt_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly from: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly from_gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly from_lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_not: InputMaybe<Scalars['DateTime']['input']>;
  readonly from_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly isRemote: InputMaybe<Scalars['Boolean']['input']>;
  readonly isRemote_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly isRemote_not: InputMaybe<Scalars['Boolean']['input']>;
  readonly role: InputMaybe<Scalars['String']['input']>;
  readonly role_contains: InputMaybe<Scalars['String']['input']>;
  readonly role_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly role_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly role_not: InputMaybe<Scalars['String']['input']>;
  readonly role_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly role_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly slug_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly slug_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug_not: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly stack_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly stack_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly stack_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly stack_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly sys: InputMaybe<SysFilter>;
  readonly to: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly to_gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly to_lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_not: InputMaybe<Scalars['DateTime']['input']>;
  readonly to_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
};

export type ExperienceLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type ExperienceLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExperienceOrder =
  | 'address_ASC'
  | 'address_DESC'
  | 'company_ASC'
  | 'company_DESC'
  | 'exerpt_ASC'
  | 'exerpt_DESC'
  | 'from_ASC'
  | 'from_DESC'
  | 'isRemote_ASC'
  | 'isRemote_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'to_ASC'
  | 'to_DESC';

export type ImageFormat =
  /** AVIF image format. */
  | 'AVIF'
  /** JPG image format. */
  | 'JPG'
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  | 'JPG_PROGRESSIVE'
  /** PNG image format */
  | 'PNG'
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  | 'PNG8'
  /** WebP image format. */
  | 'WEBP';

export type ImageResizeFocus =
  /** Focus the resizing on the bottom. */
  | 'BOTTOM'
  /** Focus the resizing on the bottom left. */
  | 'BOTTOM_LEFT'
  /** Focus the resizing on the bottom right. */
  | 'BOTTOM_RIGHT'
  /** Focus the resizing on the center. */
  | 'CENTER'
  /** Focus the resizing on the largest face. */
  | 'FACE'
  /** Focus the resizing on the area containing all the faces. */
  | 'FACES'
  /** Focus the resizing on the left. */
  | 'LEFT'
  /** Focus the resizing on the right. */
  | 'RIGHT'
  /** Focus the resizing on the top. */
  | 'TOP'
  /** Focus the resizing on the top left. */
  | 'TOP_LEFT'
  /** Focus the resizing on the top right. */
  | 'TOP_RIGHT';

export type ImageResizeStrategy =
  /** Crops a part of the original image to fit into the specified dimensions. */
  | 'CROP'
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  | 'FILL'
  /** Resizes the image to fit into the specified dimensions. */
  | 'FIT'
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  | 'PAD'
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  | 'SCALE'
  /** Creates a thumbnail from the image. */
  | 'THUMB';

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  readonly backgroundColor: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  readonly cornerRadius: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  readonly format: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  readonly height: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  readonly quality: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  readonly resizeFocus: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  readonly resizeStrategy: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  readonly width: InputMaybe<Scalars['Dimension']['input']>;
};

/** Navigations items [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/navigation) */
export type Navigation = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom: Maybe<NavigationLinkingCollections>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly sys: Sys;
};


/** Navigations items [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/navigation) */
export type NavigationLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Navigations items [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/navigation) */
export type NavigationNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Navigations items [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/navigation) */
export type NavigationSlugArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type NavigationCollection = {
  readonly items: ReadonlyArray<Maybe<Navigation>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type NavigationFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<NavigationFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<NavigationFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly name_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly name_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name_not: InputMaybe<Scalars['String']['input']>;
  readonly name_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly slug_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly slug_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug_not: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
};

export type NavigationLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type NavigationLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type NavigationOrder =
  | 'name_ASC'
  | 'name_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type Project = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly contentfulMetadata: ContentfulMetadata;
  readonly description: Maybe<ProjectDescription>;
  readonly funFact: Maybe<Scalars['String']['output']>;
  readonly linkedFrom: Maybe<ProjectLinkingCollections>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly summary: Maybe<Scalars['String']['output']>;
  readonly sys: Sys;
  readonly tags: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly url: Maybe<Scalars['String']['output']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectFunFactArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectSlugArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectSummaryArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectTagsArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Project I have created [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/project) */
export type ProjectUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectCollection = {
  readonly items: ReadonlyArray<Maybe<Project>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type ProjectDescription = {
  readonly json: Scalars['JSON']['output'];
  readonly links: ProjectDescriptionLinks;
};

export type ProjectDescriptionAssets = {
  readonly block: ReadonlyArray<Maybe<Asset>>;
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
};

export type ProjectDescriptionEntries = {
  readonly block: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly inline: ReadonlyArray<Maybe<Entry>>;
};

export type ProjectDescriptionLinks = {
  readonly assets: ProjectDescriptionAssets;
  readonly entries: ProjectDescriptionEntries;
  readonly resources: ProjectDescriptionResources;
};

export type ProjectDescriptionResources = {
  readonly block: ReadonlyArray<ProjectDescriptionResourcesBlock>;
  readonly hyperlink: ReadonlyArray<ProjectDescriptionResourcesHyperlink>;
  readonly inline: ReadonlyArray<ProjectDescriptionResourcesInline>;
};

export type ProjectDescriptionResourcesBlock = ResourceLink & {
  readonly sys: ResourceSys;
};

export type ProjectDescriptionResourcesHyperlink = ResourceLink & {
  readonly sys: ResourceSys;
};

export type ProjectDescriptionResourcesInline = ResourceLink & {
  readonly sys: ResourceSys;
};

export type ProjectFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<ProjectFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<ProjectFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly description_contains: InputMaybe<Scalars['String']['input']>;
  readonly description_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly description_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly funFact: InputMaybe<Scalars['String']['input']>;
  readonly funFact_contains: InputMaybe<Scalars['String']['input']>;
  readonly funFact_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly funFact_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly funFact_not: InputMaybe<Scalars['String']['input']>;
  readonly funFact_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly funFact_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly name_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly name_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name_not: InputMaybe<Scalars['String']['input']>;
  readonly name_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly slug_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly slug_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly slug_not: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly slug_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly summary: InputMaybe<Scalars['String']['input']>;
  readonly summary_contains: InputMaybe<Scalars['String']['input']>;
  readonly summary_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly summary_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly summary_not: InputMaybe<Scalars['String']['input']>;
  readonly summary_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly summary_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
  readonly tags_contains_all: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_contains_none: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_contains_some: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly tags_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly url: InputMaybe<Scalars['String']['input']>;
  readonly url_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly url_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly url_not: InputMaybe<Scalars['String']['input']>;
  readonly url_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly url_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type ProjectLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectOrder =
  | 'funFact_ASC'
  | 'funFact_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'summary_ASC'
  | 'summary_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'url_ASC'
  | 'url_DESC';

export type Query = {
  readonly _node: Maybe<_Node>;
  readonly _nodes: ReadonlyArray<Maybe<_Node>>;
  readonly asset: Maybe<Asset>;
  readonly assetCollection: Maybe<AssetCollection>;
  readonly contribution: Maybe<Contribution>;
  readonly contributionCollection: Maybe<ContributionCollection>;
  readonly entryCollection: Maybe<EntryCollection>;
  readonly experience: Maybe<Experience>;
  readonly experienceCollection: Maybe<ExperienceCollection>;
  readonly navigation: Maybe<Navigation>;
  readonly navigationCollection: Maybe<NavigationCollection>;
  readonly project: Maybe<Project>;
  readonly projectCollection: Maybe<ProjectCollection>;
  readonly skills: Maybe<Skills>;
  readonly skillsCollection: Maybe<SkillsCollection>;
  readonly social: Maybe<Social>;
  readonly socialCollection: Maybe<SocialCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<AssetOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<AssetFilter>;
};


export type QueryContributionArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryContributionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<ContributionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ContributionFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<EntryOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<EntryFilter>;
};


export type QueryExperienceArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<ExperienceOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ExperienceFilter>;
};


export type QueryNavigationArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNavigationCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<NavigationOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<NavigationFilter>;
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<ProjectOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectFilter>;
};


export type QuerySkillsArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySkillsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<SkillsOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillsFilter>;
};


export type QuerySocialArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySocialCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<ReadonlyArray<InputMaybe<SocialOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SocialFilter>;
};

export type ResourceLink = {
  readonly sys: ResourceSys;
};

export type ResourceSys = {
  readonly linkType: Scalars['String']['output'];
  readonly urn: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/skills) */
export type Skills = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom: Maybe<SkillsLinkingCollections>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly percentage: Maybe<Scalars['Int']['output']>;
  readonly sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/skills) */
export type SkillsLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/skills) */
export type SkillsNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/skills) */
export type SkillsPercentageArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsCollection = {
  readonly items: ReadonlyArray<Maybe<Skills>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type SkillsFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<SkillsFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<SkillsFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly name_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly name_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly name_not: InputMaybe<Scalars['String']['input']>;
  readonly name_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly name_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly percentage: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly percentage_gt: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_gte: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly percentage_lt: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_lte: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_not: InputMaybe<Scalars['Int']['input']>;
  readonly percentage_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
};

export type SkillsLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type SkillsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsOrder =
  | 'name_ASC'
  | 'name_DESC'
  | 'percentage_ASC'
  | 'percentage_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

/** Social links content [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/social) */
export type Social = Entry & _Node & {
  readonly _id: Scalars['ID']['output'];
  readonly contentfulMetadata: ContentfulMetadata;
  readonly icon: Maybe<Scalars['String']['output']>;
  readonly linkedFrom: Maybe<SocialLinkingCollections>;
  readonly sys: Sys;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly uri: Maybe<Scalars['String']['output']>;
};


/** Social links content [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/social) */
export type SocialIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Social links content [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/social) */
export type SocialLinkedFromArgs = {
  allowedLocales: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


/** Social links content [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/social) */
export type SocialTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Social links content [See type definition](https://app.contentful.com/spaces/cxvazbmippvi/content_types/social) */
export type SocialUriArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SocialCollection = {
  readonly items: ReadonlyArray<Maybe<Social>>;
  readonly limit: Scalars['Int']['output'];
  readonly skip: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type SocialFilter = {
  readonly AND: InputMaybe<ReadonlyArray<InputMaybe<SocialFilter>>>;
  readonly OR: InputMaybe<ReadonlyArray<InputMaybe<SocialFilter>>>;
  readonly contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  readonly icon: InputMaybe<Scalars['String']['input']>;
  readonly icon_contains: InputMaybe<Scalars['String']['input']>;
  readonly icon_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly icon_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly icon_not: InputMaybe<Scalars['String']['input']>;
  readonly icon_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly icon_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly sys: InputMaybe<SysFilter>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly title_contains: InputMaybe<Scalars['String']['input']>;
  readonly title_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly title_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly title_not: InputMaybe<Scalars['String']['input']>;
  readonly title_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly title_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly uri: InputMaybe<Scalars['String']['input']>;
  readonly uri_contains: InputMaybe<Scalars['String']['input']>;
  readonly uri_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly uri_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly uri_not: InputMaybe<Scalars['String']['input']>;
  readonly uri_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly uri_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type SocialLinkingCollections = {
  readonly entryCollection: Maybe<EntryCollection>;
};


export type SocialLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SocialOrder =
  | 'icon_ASC'
  | 'icon_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'uri_ASC'
  | 'uri_DESC';

export type Sys = {
  readonly environmentId: Scalars['String']['output'];
  readonly firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly id: Scalars['String']['output'];
  /** The locale that was requested. */
  readonly locale: Maybe<Scalars['String']['output']>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly publishedVersion: Maybe<Scalars['Int']['output']>;
  readonly spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  readonly firstPublishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly firstPublishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly firstPublishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  readonly firstPublishedAt_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly id_contains: InputMaybe<Scalars['String']['input']>;
  readonly id_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly id_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly id_not: InputMaybe<Scalars['String']['input']>;
  readonly id_not_contains: InputMaybe<Scalars['String']['input']>;
  readonly id_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly publishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly publishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  readonly publishedAt_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly publishedVersion: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_exists: InputMaybe<Scalars['Boolean']['input']>;
  readonly publishedVersion_gt: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_gte: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly publishedVersion_lt: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_lte: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_not: InputMaybe<Scalars['Float']['input']>;
  readonly publishedVersion_not_in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  readonly id: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  readonly release_lte: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  readonly timestamp_lte: InputMaybe<Scalars['DateTime']['input']>;
};

export type _Node = {
  readonly _id: Scalars['ID']['output'];
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { readonly projectCollection: { readonly skip: number, readonly limit: number, readonly total: number, readonly items: ReadonlyArray<{ readonly slug: string | null, readonly name: string | null, readonly url: string | null, readonly summary: string | null, readonly tags: ReadonlyArray<string | null> | null, readonly funFact: string | null, readonly description: { readonly json: any } | null } | null> } | null };
