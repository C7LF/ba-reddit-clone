import DataLoader from "dataloader";
import { Upvote } from "../entities/Upvote";

export const createUpvoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);

      const upvoteIdToUpvote: Record<string, Upvote> = {};

      upvotes.forEach((up) => {
        upvoteIdToUpvote[`${up.userId}|${up.postId}`] = up;
      });

      return keys.map((key) => upvoteIdToUpvote[`${key.userId}|${key.postId}`]);
    }
  );
