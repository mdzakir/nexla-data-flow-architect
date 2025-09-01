export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Theme = "light" | "dark" | "system";

export type Status = "pending" | "partial" | "complete" | "error";
