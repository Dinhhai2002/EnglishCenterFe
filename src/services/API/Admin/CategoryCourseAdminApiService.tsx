import handleResponseApi from "src/services/handleResponseApi/handleResponseApi";
import BaseApiService from "../BaseApiService";

class CategoryCourseAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    key_search: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/category-course`, {
        params: {
          key_search: key_search,
          status: status,
          page: page,
          limit: limit,
        },
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getAllNoLimit(): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/category-course`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }
}
const token = localStorage.getItem("token");

const categoryCourseAdminApiService = new CategoryCourseAdminApiService(token);
export default categoryCourseAdminApiService;
