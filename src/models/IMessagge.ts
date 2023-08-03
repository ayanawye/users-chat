export interface IMessagge {
  id: string;
  created_at: number;
  user: {
    id: string;
    name: string;
    surname: string;
    avatar: string;
    you: boolean;
  };
  message: string;
  is_new: boolean;
}
