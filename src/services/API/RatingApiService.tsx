import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class RatingApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }
  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/rating/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async create(postId: number, point: number): Promise<any> {
    try {
      const response = await this.api.post(`/rating/create`, {
        post_id: postId,
        point: point,
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, postId: number, point: number): Promise<any> {
    try {
      const response = await this.api.post(`/rating/${id}/update`, {
        post_id: postId,
        point: point,
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem("token");

const ratingApiService = new RatingApiService(token);
export default ratingApiService;
