export interface User {
  email:string,
  password:string,
  returnSecureToken: boolean
}
export interface FbResponse {
  email?: string,
  expiresIn?: string,
  idToken?: string,
  registered?: string
}
export interface Tour {
  id?: string,
  hotel: string,
  country: string,
  title: string,
  date: Date,
  price: number,
  status?: string
}
export interface FbCreateResponse {
  name: string
}
