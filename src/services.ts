import { ref } from "vue";
import type { RegistrationBody } from "@/types/types";

export async function useFetch(body: RegistrationBody) {
  const status = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const token = ref<string | null>(null);

  try {
    const data = await fetch("https://api.dating.com/identity", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: "Basic " + btoa(`${body.email}:${body.password}`),
      },
    });
    console.log(data);
    token.value = data.headers.get("x-token");
    status.value = !!data.status;
    if (token.value) {
      return {
        token,
        status,
      };
    }
  } catch (err) {
    error.value = err as Error;
    return {
      error,
    };
  }

  try {
    const data = await fetch("https://api.dating.com/identity", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    token.value = data.headers.get("x-token");
    status.value = data.status === 201;
    return {
      status,
      token,
    };
  } catch (err) {
    error.value = err as Error;
    return {
      error,
    };
  }
}
