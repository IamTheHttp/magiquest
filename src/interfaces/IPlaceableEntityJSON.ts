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

// export type IPlaceableEntityJSON = {
//   dmg: number;
//   health: number;
//   speed: number;
//   vision: number;
//   attackSpeed: string;
//   id: string;
//   displayName: string;
//   radius: number; // for now everyone uses 16
//   animationNames: string;
// };
