import handleResponseApi from "src/services/handleResponseApi/handleResponseApi";
import BaseApiService from "../BaseApiService";

class CourseAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    categoryCourseId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/admin/course`, {
        params: {
          category_course_id: categoryCourseId,
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
    // var messageError = "";
    try {
      const response = await this.api.post(`/admin/course/${id}/change-status`);

      if (response.data.status === 400) {
        // messageError = response.data;
        // const errorData = response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-throw-literal, no-throw-literal
        throw {
          response,
        };
      }

      return response.data;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal, no-throw-literal
      throw { error };
    }
  }

  public async uploadBanner(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await this.api.post(
        `/admin/course/${id}/upload-banner`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async create(
    name: any,
    lessons: number,
    description: any,
    term: string,
    languageId: number,
    levelId: number,
    categoryId: number,
    price: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/admin/course/create`, {
        name: name,
        lessons: lessons,
        description: description,
        term: term,
        language_id: languageId,
        level_id: levelId,
        category_id: categoryId,
        price: price,
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem("token");

const courseAdminApiService = new CourseAdminApiService(token);
export default courseAdminApiService;
