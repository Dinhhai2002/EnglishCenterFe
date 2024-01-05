import BaseApiService from "./BaseApiService";

class ResultDetailApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async findOne(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/result-detail/${id}/detail`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const resultDetailApiService = new ResultDetailApiService(token);
export default resultDetailApiService;
