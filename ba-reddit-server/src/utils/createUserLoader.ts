import DataLoader from "dataloader";
import { User } from "../entities/User";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    
    // get Array of users
    const users = await User.findByIds(userIds as number[]);

    const userIdToUser: Record<number, User> = {}

    // Store users in record K = id: V = user object e.g. {id:1, username: bob}
    users.forEach(u => {
        userIdToUser[u.id] = u
    })

    // return array of users
    return userIds.map(userId => userIdToUser[userId])
  });
