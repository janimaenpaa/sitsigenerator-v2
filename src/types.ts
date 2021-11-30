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
  minutes: number;
  seconds: number;
  punishments: Punishment[];
  tables: number;
};
