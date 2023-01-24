 const getStrCountry =  (locations: any) => {
  let strCountry = ''
  if (locations && locations.length > 0) {
    locations.map((i: any) => {
      Object.keys(i).map((key: any, cIndex: number) => {
        if (i[key].length !== 0) {
          i[key].map((c: any) => {
            strCountry += c + ', '
          })
        }
        strCountry += key + ', '
      })
    })
    strCountry = strCountry.substring(0, strCountry.length - 2)
  }
  return strCountry
}


export default getStrCountry