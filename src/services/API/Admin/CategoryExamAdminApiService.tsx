import handleResponseApi from "src/services/handleResponseApi/handleResponseApi";
import BaseApiService from "../BaseApiService";

class CategoryExamAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/admin/category-exam`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit,
        },
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.post(
        `/admin/category-exam/${id}/change-status`
      );

      // messageError = handleResponseApi.handleResponse(response);
      if (response.data.status === 400) {
        messageError = response.data;
        const errorData = response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw {
          response,
        };
      }

      return response.data;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw { error };
    }
  }
}
const token = localStorage.getItem("token");

const categoryExamAdminApiService = new CategoryExamAdminApiService(token);
export default categoryExamAdminApiService;
