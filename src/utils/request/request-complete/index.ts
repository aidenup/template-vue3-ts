import { Axios } from "./Axios";
import type { CreateAxiosOptions, AxiosTransform } from "../axiosTransform";
import { deepMerge } from "@/utils/index";
import { ContentTypeEnum } from "@/enum/httpEnum";
import { clone } from "lodash-es";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new Axios(
    // 深度合并对象
    deepMerge(
      {
        authenticationScheme: "", // e.g: Bearer
        timeout: 10 * 1000,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),

        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "message",
          // 接口地址
          apiUrl: "https://xxxx.xx.com",
          // 接口拼接地址
          urlPrefix: "/api",
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {}
    )
  );
}

export const defHttp = createAxios();
