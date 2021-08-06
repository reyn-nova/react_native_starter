/*
  API Login, Dashboard, Notifications dan UploadFile
  adalah contoh saja POST dan GET menggunakan tanpa / dengan parameter

  Ganti sesuai API project ini di lain waktu

  Contoh pemanggilan API dari skrip layar

  const resLogin = await API.Login({
    email: 'reynald@crocodic.com',
    password: '123456'
  })

  if (resLogin.json != undefined) {
    console.log(resLogin.json) // JSON berhasil didapatkan
  }

  Contoh lain

  const resDashboard = await API.Dashboard()

  if (resDashboard.json != undefined) {
    console.log(resDashboard.json) // JSON berhasil didapatkan
  }
*/

const APIConfigs: APIConfigsType = {
  Login: [
    'POST', '/login'
  ],
  Dashboard: [
    'POST', '/dashboard'
  ],
  Notfications: [
    'GET', '/notifications'
  ],
  UploadFile: [
    'POST', '/upload-file'
  ]
}

type APIParamsType = {
  Login: {
    email: string,
    password: string
  },
  Dashboard: void,
  Notfications: void,
  UploadFile: {
    sim: FileType,
    stnk: FileType
  }
}

/* --------------------------------------------------------------------

UNTUK KONFIGURASI API HANYA MENGGUNAKAN DAN MENGUBAH KODE DI ATAS SAJA,
KODE DI BAWAH MERUPAKAN HELPER, JANGAN DIUBAH JIKA TIDAK PERLU

-------------------------------------------------------------------- */

import BaseURL from '../references/base-url'

type FileType = {
  uri: string,
  name: string,
  type: string
}


type ConfigsType = [
  'GET' | 'POST',
  string
]

type APIConfigsType = { [K in keyof APIParamsType]: ConfigsType }

function GenerateAPIsFromAPIParamsType() {
  type APIsType = {
    [K in keyof APIParamsType]: (params: APIParamsType[K]) => Promise<{
      json?: any,
      text?: string,
      error?: any
    }>
  }

  let APIs = {} as APIsType

  for (const key in APIConfigs) {
    const selectedKey = key as keyof APIsType

    const [ method, endpointPath  ] = APIConfigs[selectedKey]
    
    APIs[selectedKey] = (params: APIParamsType[typeof selectedKey]) => Fetch(method, endpointPath, params)
  }

  return APIs
}

export const API = GenerateAPIsFromAPIParamsType()

const Fetch = async(method: string, endpoint: string, params?: any) => {
  const response = {} as {
    json?: any,
    text?: string,
    error?: any
  }

  let additionalURL = ''

  let body: FormData | undefined = undefined
  
  if (params) {
    switch (method) {
      case 'GET': { 
        for (const key in params) {
          additionalURL += additionalURL == '' ? '?' : '&'
    
          additionalURL += `${key}=${params[key]}`
        }

        break
      }
      case 'POST': {
        body = new FormData()

        for (const key in params) {
          body.append(key, params[key])
        }

        break
      }
    }
  }

  await fetch(
    `${BaseURL}${endpoint}${additionalURL}`,
    {
      method,
      headers: {
        Accept: 'application/json',
        'Content-type': method == 'GET' ? 'application/json' : 'multipart/form-data'
      } as any,
      body
    }
  )
  .then(res => res.text())
  .then(resText => {
    response.text = resText

    if (resText[0] == '{') {
      response.json = JSON.parse(resText)
    }
  })
  .catch(error => response.error = error)

  return response
}

export default API
