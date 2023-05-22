import {z} from 'zod';

export const PlaceableEntityZodSchema = z.object({
  dmg: z.number(),
  health: z.number(),
  speed: z.number(),
  vision: z.number(),
  attackSpeed: z.string(),
  id: z.string(),
  displayName: z.string(),
  sizeInTiles: z.number(),
  animationNames: z.string()
});

// extract the inferred type
export type IPlaceableEntityJSON = z.infer<typeof PlaceableEntityZodSchema>;
