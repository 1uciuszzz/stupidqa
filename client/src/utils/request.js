import axios from "axios";
// 环境
const isDev = process.env.NODE_ENV === "development"; // 当运行 npm run start 时 ，返回值为真， 开发环境
// 'production' npm run build 生产环境

// http://121.89.205.189:3001/apidoc/
const ins = axios.create({
    // 自定义axios
    // baseURL: isDev ? '/admin' : 'http://121.89.205.189:3001/admin/',
    baseURL: "http://localhost:5000/api",
    // baseURL: 'http://121.89.205.189:3001/admin/',
    timeout: 6000,
});

// 设置拦截器

ins.interceptors.response.use(
    response => {
        if (response.data.code !== "200") {
            history.push("/login");
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

// 自定义各种数据请求 axios({})
export default function request(config) {
    const { url = "", method = "GET", data = {}, headers = {} } = config;
    switch (method.toUpperCase()) {
        case "GET":
            return ins.get(url, { params: data, headers });
        case "POST":
            // 表单提交  application/x-www-form-url-encoded
            if (
                headers["content-type"] === "application/x-www-form-url-encoded"
            ) {
                // 转参数 URLSearchParams/第三方库qs
                const p = new URLSearchParams();
                for (let key in data) {
                    p.append(key, data[key]);
                }
                return ins.post(url, p, { headers });
            }
            // 文件提交  multipart/form-data
            if (headers["content-type"] === "multipart/form-data") {
                const p = new FormData();
                for (let key in data) {
                    p.append(key, data[key]);
                }
                return ins.post(url, p, { headers });
            }
            // 默认 application/json
            return ins.post(url, data);
        case "PUT": // 修改数据 --- 所有的数据的更新
            return ins.put(url, data);
        case "DELETE": // 删除数据
            return ins.delete(url, { data });
        case "PATCH": // 更新局部资源
            return ins.patch(url, data);
        default:
            return ins(config);
    }
}
