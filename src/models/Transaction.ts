import { Event } from "./Event";
import { User } from "./User";

export type ResultApiResource = {
  data: Transaction[];
};

export type Transaction = {
  id: number;
  invoice: string;
  orderer_name: string;
  purhaced_ticket: number;
  total_pay: number;
  user_id: number;
  event_id: number;
  event: Event;
  user: User;
  status: "pending" | "failed" | "success";
  created_at: string;
  updated_at: string;
};
