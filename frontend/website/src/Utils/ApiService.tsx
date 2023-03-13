import { UserProfile } from "types/UserProfile";

export default class ApiService {
  static endPoint = "http://localhost:8000/api/";
  static wsEndPoint = "ws://localhost:8000/";
  static async login(username: string, password: string) {
    const url = this.endPoint + "account/login/";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  static async register(data: UserProfile) {
    const url = this.endPoint + "account/register/";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async getGroups(token: string) {
    const url = this.endPoint + "chat/groups/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async getDiscussion(token: string, id?: number) {
    const part = id ? `chat/conversation/${id}` : `chat/conversation/`;
    const url = this.endPoint + part;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async saveChatMessage(data: FormData, token: string) {
    const url = this.endPoint + "chat/messages/";
    const res = await fetch(url, {
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async getNotifications(token: string) {
    const url = this.endPoint + "notifications/notifications/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async getFriendsRequest(token: string) {
    const url = this.endPoint + "friends/friends-request/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async getFriendList(token: string) {
    const url = this.endPoint + "friends/friends-list/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async sendFriendRequest(recieverId: number, token: string) {
    const url = this.endPoint + "friends/send-friend-request/";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ reciever: recieverId }),
      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async acceptFriendRequest(senderId: number, token: string) {
    const url = this.endPoint + "friends/send-friend-request/" + senderId + "/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async declineFriendRequest(senderId: number, token: string) {
    const url =
      this.endPoint + "friends/decline-friend-request/" + senderId + "/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async cancelFriendRequest(senderId: number, token: string) {
    const url =
      this.endPoint + "friends/cancel-friend-request/" + senderId + "/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async searchUser(query: string, token: string) {
    const url = this.endPoint + `friends/search?q=${query}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  static async createGroup(groupData: any, token: string) {
    const url = this.endPoint + "chat/groups/";
    const res = await fetch(url, {
      body: JSON.stringify(groupData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });

    return res;
  }

  static async addGroupMember(groupMemberData: any, token: string) {
    const url = this.endPoint + "chat/add-group-member/";
    const res = await fetch(url, {
      body: JSON.stringify(groupMemberData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });

    return res;
  }

  static async joinGroup(groupMemberData: any, token: string) {
    const url = this.endPoint + "chat/join-group/";
    const res = await fetch(url, {
      body: JSON.stringify(groupMemberData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });

    return res;
  }
}
