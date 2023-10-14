
const useCurrency = () => {
  const formatToIdrCurrency = (priceNum: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2, // Optional: set the number of decimal places
    })

    return formatter.format(priceNum)
  }

  const formatToNumber = (priceRpStr: string) => {
    return parseFloat(
      String(priceRpStr)
        .replace(/[^\d,]/g, '')
        .replace(',', '.')
    )
  }

  return { formatToIdrCurrency, formatToNumber }
}

export default useCurrency