const baseURLs = {
  dev1: 'http://dev1.api.com',
  dev2: 'http://dev2.api.com',
  live: 'http://live.api.com'
}

export const selectedBaseURL = <keyof typeof baseURLs>('dev1') // Change the selected base url string here

export default baseURLs[selectedBaseURL]
