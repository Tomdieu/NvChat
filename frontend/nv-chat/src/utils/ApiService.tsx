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
}
