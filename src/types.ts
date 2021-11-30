export type Punishment = {
  id: number;
  description: string;
  timesUsed: number;
};

export type Timer = {
  minutes: number;
  seconds: number;
};

export type Settings = {
  id: number;
  minutes: number;
  seconds: number;
  tables: number;
};
