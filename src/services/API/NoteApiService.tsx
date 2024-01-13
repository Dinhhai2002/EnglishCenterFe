import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class NoteApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async findOne(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/note/${id}/detail`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async create(
    courseId: number,
    chapterId: number,
    lessonsId: number,
    content: string
  ): Promise<any> {
    try {
      const response = await this.api.post(`/note/create`, {
        course_id: courseId,
        chapter_id: chapterId,
        lessons_id: lessonsId,
        content: content,
      });
      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    courseId: number,
    chapterId: number,
    lessonsId: number,
    content: string
  ): Promise<any> {
    try {
      const response = await this.api.post(`/note/${id}/update`, {
        course_id: courseId,
        chapter_id: chapterId,
        lessons_id: lessonsId,
        content: content,
      });
      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/note/${id}/change-status`);
      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAll(
    courseId: number,
    chapterId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number,
    isPagination?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/note`, {
        params: {
          course_id: courseId,
          chapter_id: chapterId,
          key_search: keySearch,
          status: status,
          is_pagination: isPagination,
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
}
const token = localStorage.getItem("token");

const noteApiService = new NoteApiService(token);
export default noteApiService;
