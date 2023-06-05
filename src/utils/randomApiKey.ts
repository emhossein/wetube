import Chance from "chance";

const randomApiKey = () => {
  const chance = new Chance();
  return chance.pickone([
    process.env.RAPIDKEY1,
    process.env.RAPIDKEY2,
    process.env.RAPIDKEY3,
    process.env.RAPIDKEY4,
  ]);
};

export default randomApiKey;
