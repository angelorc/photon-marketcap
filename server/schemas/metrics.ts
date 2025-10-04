import { z } from 'zod';

export const MetricsResponseSchema = z.object({
  totalSupply: z.string(),
  usdPrice: z.string(),
  marketCap: z.string(),
  fdv: z.string(),
  maxSupply: z.string(),
  photonOnOsmosis: z.string(),
  photonOnOsmosisUsd: z.string(),
  mintPrice: z.string(),
  osmosisPrice: z.string(),
})