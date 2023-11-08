import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class LessonApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getDetail(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/lessons/${id}/detail`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateTimeViewVideo(id: number, duration: number): Promise<any> {
    try {
      const response = await this.api.post(
        `/lessons/${id}/video-watch/update`,
        {
          duration: duration,
        }
      );
      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem("token");

const lessonApiService = new LessonApiService(token);
export default lessonApiService;
