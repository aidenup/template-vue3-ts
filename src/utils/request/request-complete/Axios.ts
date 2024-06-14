import type { CreateAxiosOptions } from "../axiosTransform";
export class Axios {
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
  }
}
