import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = ()=> new Promise(resolve=> setTimeout(resolve,500));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        // get validation error also has a status 400
        // the response will have additional error attribute (check in swagger for response!!!) and we
        // are handling them by checking if they are present or not
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            //if (data.errors[key]) { // additional checking due to typescript
            // commenting is working fine till now, should check till the end!!
            modelStateErrors.push(data.errors[key]);
            // }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        // router.navigate("/not-found");
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        // navigating to a certain link --something new--
        // till now we used NavLink and Link components and to attribute
        // note the use of state - is oart of the arguments provided by react-router-dom
        router.navigate("/server-error", {state:{error:data}});
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId:number,quantity=1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
  removeItem:(productId:number,quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  get401Error: () => requests.get("buggy/unauthorized"),
  getValidationError: () => requests.get("buggy/validation-error"),
};
const agent = {
  Catalog,
  Basket,
  TestErrors,
};

export default agent;

