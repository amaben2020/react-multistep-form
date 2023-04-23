import { axiosClient } from "../settings/config";

export function getShipping(URL: string) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}
