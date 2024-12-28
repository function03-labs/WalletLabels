import { GoogleAuth } from 'google-auth-library'
import { Developer, DeveloperApp, DeveloperAppResponse, ApigeeError } from "@/lib/types/apigee"
import * as fs from 'fs'

export class ApigeeClient {
  private baseUrl = 'https://apigee.googleapis.com/v1'
  private auth: GoogleAuth
  private orgName: string

  constructor(orgName: string, credentials?: string | object) {
    this.orgName = orgName
    let parsedCredentials: object | undefined

    if (typeof credentials === 'string') {
      try {
        // First try to parse as JSON string
        parsedCredentials = JSON.parse(credentials)
      } catch {
        // If that fails, try to read it as a file path
        try {
          const fileContent = fs.readFileSync(credentials, 'utf8')
          parsedCredentials = JSON.parse(fileContent)
        } catch (error) {
          console.error('Failed to parse credentials as JSON or read from file:', error)
          throw new Error('Invalid credentials format')
        }
      }
    } else {
      parsedCredentials = credentials
    }

    this.auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      credentials: parsedCredentials
    })
  }

  private async getAccessToken(): Promise<string> {
    const client = await this.auth.getClient()
    const token = await client.getAccessToken()
    return token.token as string
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const accessToken = await this.getAccessToken()
    const url = this.baseUrl + path

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json() as ApigeeError
      console.error('Apigee API error:', {
        status: response.status,
        message: error.error?.message || 'Unknown error',
        path
      })
      throw new Error(error.error?.message || 'Unknown error')
    }

    return await response.json() as T
  }

  async createDeveloper(developer: Developer): Promise<Developer> {
    return this.request<Developer>(
      '/organizations/' + this.orgName + '/developers',
      {
        method: 'POST',
        body: JSON.stringify(developer)
      }
    )
  }

  async getDeveloper(email: string): Promise<Developer> {
    return this.request<Developer>(
      '/organizations/' + this.orgName + '/developers/' + email,
      { method: 'GET' }
    )
  }

  async createDeveloperApp(developerEmail: string, app: DeveloperApp): Promise<{
    apiKey: string
    apiSecret: string
  }> {
    const response = await this.request<DeveloperAppResponse>(
      '/organizations/' + this.orgName + '/developers/' + developerEmail + '/apps',
      {
        method: 'POST',
        body: JSON.stringify({
          name: app.name,
          apiProducts: app.apiProducts,
          status: app.status || 'approved',
          keyExpiresIn: app.keyExpiresIn || '-1',
          callbackUrl: app.callbackUrl
        })
      }
    )

    if (!response.credentials?.[0]) {
      throw new Error('No credentials returned from Apigee')
    }

    return {
      apiKey: response.credentials[0].consumerKey,
      apiSecret: response.credentials[0].consumerSecret
    }
  }

  async deleteDeveloperApp(developerEmail: string, appName: string): Promise<void> {
    await this.request<void>(
      '/organizations/' + this.orgName + '/developers/' + developerEmail + '/apps/' + appName,
      { method: 'DELETE' }
    )
  }
} 