import { HttpStatusCode } from "axios";
import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";
const prefix = "/promotion";
class PromotionApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }
  public async getAll(
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`${prefix}`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`${prefix}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const promotionApiService = new PromotionApiService(token);
export default promotionApiService;
