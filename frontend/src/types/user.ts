export interface User {
  id: number
  username: string
  email: string
  full_name?: string
  role: 'admin' | 'user'
  is_active: boolean
  created_at: string
}

export interface Token {
  access_token: string
  token_type: string
}








