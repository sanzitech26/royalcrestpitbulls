// PLACEHOLDER pedigrees — dog names are invented. Replace with the real breeding lines.

export type Ancestor = { name: string; children?: [Ancestor, Ancestor] };

export const titanLine: Ancestor = {
  name: "RoyalCrest Titan",
  children: [
    {
      name: "King Draco",
      children: [{ name: "Grand Champion Ace" }, { name: "Bella Storm" }],
    },
    {
      name: "Luna Belle",
      children: [{ name: "Titan's Legacy" }, { name: "Queen Nova" }],
    },
  ],
};

export const zoeLine: Ancestor = {
  name: "RoyalCrest Zoe",
  children: [
    {
      name: "Major Blaze",
      children: [{ name: "Iron King" }, { name: "Skylar" }],
    },
    {
      name: "Venus",
      children: [{ name: "Champ's Ruby" }, { name: "Miss Dior" }],
    },
  ],
};
