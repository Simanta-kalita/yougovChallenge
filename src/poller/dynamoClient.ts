import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import type { CognitoIdentityCredentialProvider } from '@aws-sdk/credential-providers'
import { DynamoDBDocumentClient, DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { derived, type Readable } from 'svelte/store'
import type { SiteConfig } from './SiteConfig'
import { config } from './config'
import { credentialsProvider } from './credentialsProvider'

export const dynamoClient = derived<[Readable<CognitoIdentityCredentialProvider>, Readable<SiteConfig>], DynamoDBDocumentClient>([credentialsProvider, config], values => DynamoDBDocument.from(new DynamoDBClient({
  credentials: values[0],
  region: values[1].region
})))
