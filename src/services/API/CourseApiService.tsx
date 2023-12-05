import handleResponseApi from "src/services/handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class CourseApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/course`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  public async getAllNoBanner(): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/course/no-banner`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getListClassById(id: number): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/course/${id}/list-class`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getListClassByIdAddHour(id: number): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/course/${id}/list-class-add-hour`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getListStudentById(id: number): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/course/${id}/list-student`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getDetailCourse(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/course/${id}/detail`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem("token");

const courseApiService = new CourseApiService(token);
export default courseApiService;
