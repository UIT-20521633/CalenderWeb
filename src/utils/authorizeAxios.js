import axios from "axios";
import { interceptorLoadingElements } from "./formattersAZ";

/**
 * Không thể import { store } from '~/redux/store' theo cách thông thường như các file jsx component
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi react component như file authorizeAxios hiện tại
 * Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */

//Khởi tạo 1 đối tượng axios (authorizedAxiosInstance) mục đích là để custom và cấu hình dự án
let authorizedAxiosInstance = axios.create();
//Thời gian chờ tối đa của 1 request: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

/**
 * Cấu hình Interceptor (Bộ đánh chặn giữa mọi request và response)
 */
//Interceptor Request: Can thiệt vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    //Kỹ thuật chặn spam click (xem kỹ mô tả ở flie formattersAZ.js)
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

//Interceptor Response: Can thiệt vào giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    //Kỹ thuật chặn spam click (xem kỹ mô tả ở flie formattersAZ.js)
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    //Kỹ thuật chặn spam click (xem kỹ mô tả ở flie formattersAZ.js)
    interceptorLoadingElements(false);
    //Trả về 1 Promise reject với lỗi là message lỗi
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
