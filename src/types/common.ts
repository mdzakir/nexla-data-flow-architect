export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Theme = "light" | "dark";

export type Status = "pending" | "partial" | "complete" | "error";
