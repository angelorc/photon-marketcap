import BigNumber from 'bignumber.js'
import { retry } from "../middlewares/retry"
import { pub } from "../orpc"
import { MetricsResponseSchema } from "../schemas/metrics"

interface SupplyResponse {
  amount: {
    denom: string
    amount: string
  }
}

interface MintPriceResponse {
  conversion_rate: string
}

export const getMetrics = pub
  .use(retry({ times: 3 }))
  .route({
    method: 'GET',
    path: '/metrics',
    summary: 'Photon Metrics',
    tags: ['Metrics'],
  })
  .output(MetricsResponseSchema)
  .handler(async () => {
    const apiEndpoint = 'https://atomone-api.allinbits.com'
      const sqsEndpoint = 'https://sqs.osmosis.zone'
      const osmosisApiEndpoint = 'https://lcd.osmosis.zone'
    
      const { amount: { amount } } = await $fetch<SupplyResponse>(`${apiEndpoint}/cosmos/bank/v1beta1/supply/by_denom?denom=uphoton`)
    
      const sqsResponse = await $fetch<{ [key: string]: { [key: string]: string } }>(`${sqsEndpoint}/tokens/prices?base=ibc%2FD6E02C5AE8A37FC2E3AB1FC8AC168878ADB870549383DFFEA9FD020C234520A7`)
      const osmosisPrice = Object.values(sqsResponse)[0] ? Object.values(sqsResponse)[0][Object.keys(Object.values(sqsResponse)[0])[0]] : '0'
      const usdPrice = new BigNumber(osmosisPrice).toFixed(4)
      const marketCap = new BigNumber(usdPrice).multipliedBy(new BigNumber(amount).dividedBy(1e6)).toFixed(0)
      const maxSupply = new BigNumber(1_000_000_000)
    
      const photonOnOsmosis = await $fetch<SupplyResponse>(`${osmosisApiEndpoint}/cosmos/bank/v1beta1/supply/by_denom?denom=ibc%2FD6E02C5AE8A37FC2E3AB1FC8AC168878ADB870549383DFFEA9FD020C234520A7`)
      const mintPrice = await $fetch<MintPriceResponse>(`${apiEndpoint}/atomone/photon/v1/conversion_rate`)
    
      const osmosisConversion = await $fetch<{ amount_out: string }>(`${sqsEndpoint}/router/quote?tokenIn=1000000ibc%2FBC26A7A805ECD6822719472BCB7842A48EF09DF206182F8F259B2593EB5D23FB&tokenOutDenom=ibc%2FD6E02C5AE8A37FC2E3AB1FC8AC168878ADB870549383DFFEA9FD020C234520A7&humanDenoms=false`)
    
      return {
        totalSupply: new BigNumber(amount).dividedBy(1e6).toString(),
        usdPrice: usdPrice.toString(),
        marketCap: marketCap.toString(),
        fdv: new BigNumber(usdPrice).multipliedBy(maxSupply).toFixed(0).toString(),
        maxSupply: maxSupply.toString(),
        photonOnOsmosis: new BigNumber(photonOnOsmosis.amount.amount).dividedBy(1e6).toString(),
        photonOnOsmosisUsd: new BigNumber(usdPrice).multipliedBy(new BigNumber(photonOnOsmosis.amount.amount).dividedBy(1e6)).toFixed(0).toString(),
        mintPrice: new BigNumber(mintPrice.conversion_rate).toString(),
        osmosisPrice: new BigNumber(osmosisConversion.amount_out).dividedBy(1e6).toString(),
      }
  })