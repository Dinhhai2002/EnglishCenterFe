import { HttpStatusCode } from "axios";
import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class PromotionApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }
  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(`/promotion`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/promotion/${id}`);
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
