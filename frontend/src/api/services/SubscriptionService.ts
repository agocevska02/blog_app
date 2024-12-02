import { Subscription, SubscriptionDto } from "../../types/Subscriptions";
import { BlogAppClientInstance } from "../rest-client";

export class SubscriptionService {
  getAllSubscriptions = async () => {
    await BlogAppClientInstance.get<Subscription[]>(`subscriptions`);
  };

  addSubscription = async (subscription: SubscriptionDto) => {
    await BlogAppClientInstance.post<Subscription>(
      `subscriptions/add`,
      subscription
    );
  };

  deleteSubscription = async (subscription: SubscriptionDto) => {
    await BlogAppClientInstance.delete<Subscription>(
      `subscriptions/delete/`,
      subscription
    );
  };
}
